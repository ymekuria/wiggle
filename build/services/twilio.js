"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = require("twilio");
const keys_1 = require("../config/keys");
exports.client = new twilio_1.Twilio(keys_1.twillioAccountSid, keys_1.twillioAuthToken);
