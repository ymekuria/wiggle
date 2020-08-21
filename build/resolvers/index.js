"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    },
    Mutation: {
        createUser: (_parent, args, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = yield prisma.user.create({
                data: {
                    userName: args.userName
                }
            });
            return newUser;
        })
    }
};
exports.default = resolvers;
//
