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
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
class JokeAPI extends apollo_datasource_rest_1.RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://icanhazdadjoke.com/';
    }
    willSendRequest(request) {
        request.headers.set('Accept', 'application/json');
    }
    searchJokes(term) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { results } = yield this.get(`/search?limit=5&term=${term}`);
                return results;
            }
            catch (error) {
                return error.message;
            }
        });
    }
    getRandomJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.get('/');
                return result;
            }
            catch (error) {
                return error.message;
            }
        });
    }
    getMultipleRandomJokes() {
        return __awaiter(this, void 0, void 0, function* () {
            const randomPage = Math.floor(Math.random() * 130) + 1;
            try {
                // returns 5 random results
                const { results } = yield this.get(`/search?limit=5&page=${randomPage}`);
                return results;
            }
            catch (error) {
                return error.message;
            }
        });
    }
}
exports.default = JokeAPI;
