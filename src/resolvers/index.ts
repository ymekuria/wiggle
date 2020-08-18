const resolvers = {
  Query: {
    dogPic: (_parent: any, _args: any, { dataSources }: any) => {
      return dataSources.dogAPI.getRandomDogPic();
    },
    hello: () => 'Hello world!',
    test: () => 'Is this thing on?'
  }
};

export default resolvers;
//
