"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: Number,
        unique: true,
        required: true
    },
    googleID: String,
    facebookID: String
});
mongoose_1.model('User', userSchema);
