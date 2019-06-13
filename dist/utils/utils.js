"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoopFront_1 = __importDefault(require("../LoopFront"));
const axios_1 = __importDefault(require("axios"));
// Just a wrapper on axios, in case some other library is used in place of axios
const utils = {
    request: (config) => {
        if (!axios_1.default.defaults.baseURL)
            throw new Error('Error: Loopfront Base Url is not provided');
        if (LoopFront_1.default.Logger) {
            console.log("%cRequest => ", "font-size: 12px; color: rgb(51, 102, 255); font-weight: bold", config);
        }
        return axios_1.default.request(config);
    },
    setBaseAPI_URL: (url) => axios_1.default.defaults.baseURL = url,
    setHeader: (type = 'Content-Type', value = 'application/json') => axios_1.default.defaults.headers.post[type] = value,
    setAuthHeader: (access_token) => axios_1.default.defaults.headers.common['Authorization'] = access_token,
    throwError: (error) => { console.log('Error', error); throw error; }
};
exports.default = utils;
