import { gql } from '@apollo/client';
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
  me?: Maybe<MeResponse>;
  dogPic?: Maybe<DogPic>;
  dogPics?: Maybe<DogPics>;
  joke?: Maybe<Joke>;
  searchJokes?: Maybe<Array<Maybe<Joke>>>;
  jokes?: Maybe<Array<Maybe<Joke>>>;
  wiggle?: Maybe<FindWiggleResponse>;
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
  createUser?: Maybe<CreateUserResponse>;
  createWiggle?: Maybe<CreateWiggleResponse>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateWiggleArgs = {
  input: CreateWiggleInput;
};

export type CreateUserInput = {
  userName?: Maybe<Scalars['String']>;
};

export type MeResponse = {
  __typename?: 'MeResponse';
  id?: Maybe<Scalars['ID']>;
  userName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  wiggles?: Maybe<Array<Maybe<Wiggle>>>;
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  id?: Maybe<Scalars['ID']>;
  userName?: Maybe<Scalars['String']>;
  wiggles?: Maybe<Array<Maybe<Wiggle>>>;
};

export type FindWiggleInput = {
  userName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type FindWiggleResponse = {
  __typename?: 'FindWiggleResponse';
  id?: Maybe<Scalars['ID']>;
  user?: Maybe<User>;
  schedule?: Maybe<Scalars['String']>;
  contact?: Maybe<Contact>;
};

export type CreateWiggleInput = {
  userName?: Maybe<Scalars['String']>;
  schedule?: Maybe<Scalars['String']>;
  contact?: Maybe<ContactInput>;
};

export type CreateWiggleResponse = {
  __typename?: 'CreateWiggleResponse';
  id?: Maybe<Scalars['ID']>;
  user?: Maybe<User>;
  schedule?: Maybe<Scalars['String']>;
  contact?: Maybe<Contact>;
};

export type ContactInput = {
  id?: Maybe<Scalars['ID']>;
  phoneNumber?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  userName?: Maybe<Scalars['String']>;
  wiggles?: Maybe<Array<Maybe<Wiggle>>>;
};

export type Wiggle = {
  __typename?: 'Wiggle';
  id?: Maybe<Scalars['ID']>;
  user?: Maybe<User>;
  schedule?: Maybe<Scalars['String']>;
  contact?: Maybe<Contact>;
};

export type Contact = {
  __typename?: 'Contact';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
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
