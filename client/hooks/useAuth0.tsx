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
   * The child nodes your provider has wrapped.
   */
  children: React.ReactElement;
  /**
   * The client ID found on your application settings page.
   */
  clientId: string;
  /**
   * The default audience to be used for requesting API access.
   */
  audience: string;
  /**
   * Your Auth0 account domain such as `'example.auth0.com'`,
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
