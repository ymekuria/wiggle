import { ApolloServerContext } from '../';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User as UserModel, Wiggle as WiggleModel } from './prismaMappings';
import { Contact as ContactModel } from '@prisma/client/index.d';
export type Maybe<T> = T | undefined | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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


export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<any>;
  Mutation: ResolverTypeWrapper<{}>;
  CreateUserInput: ResolverTypeWrapper<any>;
  FindWiggleInput: ResolverTypeWrapper<any>;
  CreateWiggleInput: ResolverTypeWrapper<any>;
  ContactInput: ResolverTypeWrapper<any>;
  Int: ResolverTypeWrapper<any>;
  User: ResolverTypeWrapper<UserModel>;
  Wiggle: ResolverTypeWrapper<WiggleModel>;
  Contact: ResolverTypeWrapper<ContactModel>;
  ID: ResolverTypeWrapper<any>;
  Joke: ResolverTypeWrapper<any>;
  DogPic: ResolverTypeWrapper<any>;
  DogPics: ResolverTypeWrapper<any>;
  CacheControlScope: ResolverTypeWrapper<any>;
  Upload: ResolverTypeWrapper<any>;
  Boolean: ResolverTypeWrapper<any>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  String: any;
  Mutation: {};
  CreateUserInput: any;
  FindWiggleInput: any;
  CreateWiggleInput: any;
  ContactInput: any;
  Int: any;
  User: UserModel;
  Wiggle: WiggleModel;
  Contact: ContactModel;
  ID: any;
  Joke: any;
  DogPic: any;
  DogPics: any;
  Upload: any;
  Boolean: any;
}>;

export type QueryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  dogPic?: Resolver<Maybe<ResolversTypes['DogPic']>, ParentType, ContextType>;
  dogPics?: Resolver<Maybe<ResolversTypes['DogPics']>, ParentType, ContextType>;
  joke?: Resolver<Maybe<ResolversTypes['Joke']>, ParentType, ContextType>;
  searchJokes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Joke']>>>, ParentType, ContextType, RequireFields<QuerySearchJokesArgs, never>>;
  jokes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Joke']>>>, ParentType, ContextType>;
  wiggle?: Resolver<Maybe<ResolversTypes['Wiggle']>, ParentType, ContextType, RequireFields<QueryWiggleArgs, 'input'>>;
  wiggles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Wiggle']>>>, ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  createWiggle?: Resolver<Maybe<ResolversTypes['Wiggle']>, ParentType, ContextType, RequireFields<MutationCreateWiggleArgs, 'input'>>;
}>;

export type UserResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wiggles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Wiggle']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WiggleResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Wiggle'] = ResolversParentTypes['Wiggle']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  schedule?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type JokeResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Joke'] = ResolversParentTypes['Joke']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  joke?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DogPicResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['DogPic'] = ResolversParentTypes['DogPic']> = ResolversObject<{
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DogPicsResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['DogPics'] = ResolversParentTypes['DogPics']> = ResolversObject<{
  pictures?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = ApolloServerContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Wiggle?: WiggleResolvers<ContextType>;
  Contact?: ContactResolvers<ContextType>;
  Joke?: JokeResolvers<ContextType>;
  DogPic?: DogPicResolvers<ContextType>;
  DogPics?: DogPicsResolvers<ContextType>;
  Upload?: GraphQLScalarType;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ApolloServerContext> = Resolvers<ContextType>;
