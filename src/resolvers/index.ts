const resolvers = {
  Query: {
    dogPic: (_parent, _args, { dataSources }) => {
      return dataSources.dogAPI.getDogPic();
    },
    hello: () => 'Hello world!',
    test: () => 'Is this thing on?'
  }
};

export default resolvers;
//
