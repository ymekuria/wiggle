"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send('Hellow World');
    });
};
