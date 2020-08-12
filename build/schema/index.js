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
const resolvers_1 = __importDefault(require("../resolvers"));
const mainSchema_1 = __importDefault(require("./mainSchema"));
const jokeSchema_1 = __importDefault(require("./jokeSchema"));
const createMergedSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    const jokeSchema = yield jokeSchema_1.default();
    const mergedSchema = apollo_server_express_1.mergeSchemas({
        schemas: [mainSchema_1.default, jokeSchema],
        resolvers: resolvers_1.default
    });
    return mergedSchema;
});
exports.default = createMergedSchema;
