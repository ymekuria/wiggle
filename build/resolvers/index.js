"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        test: () => 'Is this thing on?',
        one: () => 'hey'
    }
};
exports.default = resolvers;
