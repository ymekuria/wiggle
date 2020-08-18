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
        randomJoke: (_parent, _args, { dataSources }) => {
            return dataSources.jokeAPI.getRandomJoke();
        },
        multipleRandomJokes: (_parent, _args, { dataSources }) => {
            return dataSources.jokeAPI.getMultipleRandomJokes();
        },
        hello: () => 'Hello world!',
        test: () => 'Is this thing on?'
    }
};
exports.default = resolvers;
//
