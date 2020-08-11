"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = apollo_server_express_1.gql `
  type Query {
    hello: String
    test: String
    one: String
  }
`;
exports.default = typeDefs;