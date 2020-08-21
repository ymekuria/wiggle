"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
    Query: {
        randomDogPic: (_parent, _args, { dataSources }) => {
            return dataSources.dogAPI.getRandomDogPic();
        },
        threeRandomDogPics: (_parent, _args, { dataSources }) => {
            return dataSources.dogAPI.getThreeRandomDogPics();
        },
        searchJokes: (_parent, { term }, { dataSources }) => {
            return dataSources.jokeAPI.searchJokes(term);
        },
        randomJoke: (_parent, _args, { dataSources }) => {
            return dataSources.jokeAPI.getRandomJoke();
        },
        multipleRandomJokes: (_parent, _args, { dataSources }) => {
            return dataSources.jokeAPI.getMultipleRandomJokes();
        }
        // Mutation: {
        //   createUser: async (_parent: any, { userName }: {userName: string}, { prisma }: PrismaContext) => {
        //     const newUser = prisma.user.create({
        //       userName
        //     })
        //     }
        // //   }
        // }
    }
};
exports.default = resolvers;
//
