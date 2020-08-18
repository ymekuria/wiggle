"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
    Query: {
        dogPic: (_parent, _args, { dataSources }) => {
            return dataSources.dogAPI.getRandomDogPic();
        },
        hello: () => 'Hello world!',
        test: () => 'Is this thing on?'
    }
};
exports.default = resolvers;
//
