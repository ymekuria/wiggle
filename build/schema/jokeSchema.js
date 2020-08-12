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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_link_http_1 = require("apollo-link-http");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const link = new apollo_link_http_1.HttpLink({ uri: 'https://icanhazdadjoke.com/graphql', fetch: cross_fetch_1.default });
const createJokeSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield apollo_server_express_1.introspectSchema(link);
    const jokeSchema = apollo_server_express_1.makeRemoteExecutableSchema({
        schema,
        link
    });
    return jokeSchema;
});
exports.default = createJokeSchema;
