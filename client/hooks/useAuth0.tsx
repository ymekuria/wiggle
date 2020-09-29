import * as AuthSession from 'expo-auth-session';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';

// Official Expo Auth0 example doesn't handle refresh tokens
// https://github.com/expo/examples/tree/master/with-auth0
// This is adapted to handle no refresh tokens, refresh tokens and refresh
// tokens with rotation enabled

// Request a new access token this many seconds prior to expiration
const requestNewAccessTokenBuffer = 5 * 1000;

export type User = {
  // Common auth0 user fields
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;

  // Google/FB user fields
  email?: string;
  email_verified?: boolean;
  given_name?: string;
  family_name?: string;
  locale?: string;

  // FB user fields
};

// user type to fix AuthSession.AuthSessionResult
// https://github.com/expo/expo/issues/10104
type Result = {
  type: 'cancel' | 'dismiss' | 'locked' | 'error' | 'success';
  errorCode?: string | null;
  error?: AuthSession.AuthError | null;
  params?: {
    [key: string]: string;
  };
  url?: string;
};

type Auth0Context = {
  request?: AuthSession.AuthRequest | null;
  result?: Result;
  /**
   * ```ts
   * await login();
   * ```
   *
   * Prompt the user to authenticate in a user interaction or web browsers will
   * block it.
   */
  login?(): void;
  user?: User;
  /**
   * The Auth0 access token.
   */
  accessToken?: string;
};

type Auth0ProviderOptions = {
  /**
   * The child nodes the provider has wrapped.
   */
  children: React.ReactElement;
  /**
   * The client ID found on the application settings page.
   */
  clientId: string;
  /**
   * The default audience to be used for requesting API access.
   */
  audience: string;
  /**
   * The Auth0 account domain such as `'example.auth0.com'`,
   * `'example.eu.auth0.com'` or , `'example.mycompany.com'`
   * (when using [custom domains](https://auth0.com/docs/custom-domains))
   */
  domain: string;
  /**
   * Callback for auth0 login.
   */
  onLogin: () => void | undefined;
  /**
   * Callback for if the access token request fails.
   */
  onTokenRequestFailure: () => void | undefined;
};

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export const Auth0Context = React.createContext<Auth0Context>({
  request: undefined,
  result: undefined,
  login: undefined,
  user: undefined,
  accessToken: undefined
});

/**
 * use the `useAuth0` hook in the components to access the auth state and methods.
 * ie
 *
 * const {
 *   // Auth state:
 *   request,
 *   result,
 *   user,
 *   accessToken,
 *   // Auth methods:
 *   login,
 * } = useAuth0();
 * ```
 *
 *
 */
export const useAuth0 = () => useContext(Auth0Context);

type Token = {
  access_token: string;
  expires_in: number;
  // Only sends back a refresh token if rotation is enabled
  // https://auth0.com/docs/tokens/refresh-tokens/refresh-token-rotation
  refresh_token?: string;
  token_type: string;
};

type TokenData = {
  grant_type: 'authorization_code';
  client_id: string;
  code: string;
  redirect_uri: string;
  code_verifier: string;
};

type RefreshTokenData = {
  grant_type: 'refresh_token';
  client_id: string;
  refresh_token: string;
  redirect_uri: string;
  code_verifier: string;
};

const fetchAccessToken = async (
  data: TokenData | RefreshTokenData,
  domain: string,
  setAccessToken: (accessToken: string) => void,
  setUser: (user: User) => void,
  onTokenRequestFailure?: () => void
) => {
  // URLSearchParams doesn't work in RN.
  // `new URLSearchParams(Object.entries({ a: "b", c: "d" })).toString()` gives "0=a,b&1=c,d"
  // So manually do the encoding
  const formBody = Object.entries(data)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');
  // Fetch the access token and possibly the refresh token (if rotation is
  // enabled) following
  // https://auth0.com/docs/tokens/refresh-tokens/get-refresh-tokens
  const tokenResponse = await fetch(`https://${domain}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  });

  if (tokenResponse.ok) {
    const token = (await tokenResponse.json()) as Token;

    // Refetch the access token before it expires
    setTimeout(() => {
      let refreshTokenData: TokenData | RefreshTokenData = data;
      if (token.refresh_token) {
        refreshTokenData = {
          ...data,
          refresh_token: token.refresh_token,
          grant_type: 'refresh_token'
        };
      }
      fetchAccessToken(
        refreshTokenData,
        domain,
        setAccessToken,
        setUser,
        onTokenRequestFailure
      );
    }, token.expires_in * 1000 - requestNewAccessTokenBuffer);

    const userInfoResponse = await fetch(`https://${domain}/userinfo`, {
      headers: { Authorization: `Bearer ${token.access_token}` }
    });
    const userInfo = await userInfoResponse.json();

    // Set state at the same time to trigger a single update on the context
    // otherwise components are sent two separate updates
    setAccessToken(token.access_token);
    setUser(userInfo);
  } else {
    onTokenRequestFailure?.();
  }
};
