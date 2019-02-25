"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// Just a wrapper on axios, in case some other library is used in place of axios
const utils = {
    request: (config) => axios_1.default.request(config),
    setBaseAPI_URL: (url) => axios_1.default.defaults.baseURL = url,
    setHeader: (type = 'Content-Type', value = 'application/json') => axios_1.default.defaults.headers.post[type] = value,
    throwError: (error) => { console.log('Error', error); throw error; }
};
exports.default = utils;
