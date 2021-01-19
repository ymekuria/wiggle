import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  dogPic?: Maybe<DogPic>;
  dogPics?: Maybe<DogPics>;
  joke?: Maybe<Joke>;
  searchJokes?: Maybe<Array<Maybe<Joke>>>;
  jokes?: Maybe<Array<Maybe<Joke>>>;
  wiggle?: Maybe<Wiggle>;
  wiggles?: Maybe<Array<Maybe<Wiggle>>>;
};


export type QuerySearchJokesArgs = {
  term?: Maybe<Scalars['String']>;
};


export type QueryWiggleArgs = {
  input: FindWiggleInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  createWiggle?: Maybe<Wiggle>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateWiggleArgs = {
  input: CreateWiggleInput;
};

export type CreateUserInput = {
  userName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type FindWiggleInput = {
  userName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type CreateWiggleInput = {
  userName?: Maybe<Scalars['String']>;
  schedule: Scalars['String'];
  contact: ContactInput;
};

export type ContactInput = {
  id?: Maybe<Scalars['Int']>;
  phoneNumber: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  userName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  wiggles?: Maybe<Array<Maybe<Wiggle>>>;
};

export type Wiggle = {
  __typename?: 'Wiggle';
  id?: Maybe<Scalars['Int']>;
  user: User;
  schedule?: Maybe<Scalars['String']>;
  contact: Contact;
};

export type Contact = {
  __typename?: 'Contact';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
};

export type Joke = {
  __typename?: 'Joke';
  id?: Maybe<Scalars['ID']>;
  joke?: Maybe<Scalars['String']>;
};

export type DogPic = {
  __typename?: 'DogPic';
  picture?: Maybe<Scalars['String']>;
};

export type DogPics = {
  __typename?: 'DogPics';
  pictures?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type ContactFragmentFragment = { __typename?: 'Contact', name?: Maybe<string>, phoneNumber: string };

export type JokeFragmentFragment = { __typename?: 'Joke', joke?: Maybe<string> };

export type UserFragmentFragment = { __typename?: 'User', userName?: Maybe<string>, email?: Maybe<string> };

export type WiggleFragmentFragment = { __typename?: 'Wiggle', schedule?: Maybe<string>, contact: (
    { __typename?: 'Contact' }
    & ContactFragmentFragment
  ) };

export type JokeQueryVariables = Exact<{ [key: string]: never; }>;


export type JokeQuery = { __typename?: 'Query', joke?: Maybe<{ __typename?: 'Joke', joke?: Maybe<string> }> };

export const JokeFragmentFragmentDoc = gql`
    fragment JokeFragment on Joke {
  joke
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  userName
  email
}
    `;
export const ContactFragmentFragmentDoc = gql`
    fragment ContactFragment on Contact {
  name
  phoneNumber
}
    `;
export const WiggleFragmentFragmentDoc = gql`
    fragment WiggleFragment on Wiggle {
  schedule
  contact {
    ...ContactFragment
  }
}
    ${ContactFragmentFragmentDoc}`;
export const JokeDocument = gql`
    query joke {
  joke {
    joke
  }
}
    `;

/**
 * __useJokeQuery__
 *
 * To run a query within a React component, call `useJokeQuery` and pass it any options that fit your needs.
 * When your component renders, `useJokeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJokeQuery({
 *   variables: {
 *   },
 * });
 */
export function useJokeQuery(baseOptions?: Apollo.QueryHookOptions<JokeQuery, JokeQueryVariables>) {
        return Apollo.useQuery<JokeQuery, JokeQueryVariables>(JokeDocument, baseOptions);
      }
export function useJokeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JokeQuery, JokeQueryVariables>) {
          return Apollo.useLazyQuery<JokeQuery, JokeQueryVariables>(JokeDocument, baseOptions);
        }
export type JokeQueryHookResult = ReturnType<typeof useJokeQuery>;
export type JokeLazyQueryHookResult = ReturnType<typeof useJokeLazyQuery>;
export type JokeQueryResult = Apollo.QueryResult<JokeQuery, JokeQueryVariables>;