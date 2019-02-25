"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = __importDefault(require("./utils"));
class LoopFront {
    constructor(modelName, customActions = {}) {
        // GET All items of the model
        this.requestGetItemsList = (params = {}) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: this.ModelName, params }); });
        this.getItemsList = (params = {}, additionalDispatchData = {}) => __awaiter(this, void 0, void 0, function* () {
            return (dispatch) => __awaiter(this, void 0, void 0, function* () {
                dispatch({ type: this.Actions.FETCHING_LIST });
                const response = yield this.requestGetItemsList(params).catch(utils_1.default.throwError);
                dispatch({ type: this.Actions.LIST_RECEIVED, data: response.data, additionalDispatchData });
                return response;
            });
        });
        // GET single instance of the model
        this.requestGetItem = (id, params = {}) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: `/${this.ModelName}/${id}`, params }); });
        this.getItem = (id, params = {}, additionalDispatchData = {}) => __awaiter(this, void 0, void 0, function* () {
            return (dispatch) => __awaiter(this, void 0, void 0, function* () {
                dispatch({ type: this.Actions.FETCHING_SINGLE_ITEM });
                const response = yield this.requestGetItem(id, params).catch(utils_1.default.throwError);
                dispatch({ type: this.Actions.SINGLE_ITEM_RECEIVED, data: response.data, additionalDispatchData });
                return response;
            });
        });
        // Submit new or replace existing instance of the model
        this.requestPutItem = (data = {}) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: this.ModelName, method: 'PUT', data }); });
        this.putItem = (data = {}, additionalDispatchData = {}) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
            dispatch({ type: this.Actions.PUTTING_ITEM });
            const response = yield this.requestPutItem(data).catch(utils_1.default.throwError);
            dispatch({ type: this.Actions.PUT_ITEM_SUCCESS, data: response.data, additionalDispatchData });
            return response;
        });
        // Update the existing instance of the model
        this.requestPatchItem = (data) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: this.ModelName, method: 'PATCH', data }); });
        this.patchItem = (data, additionalDispatchData = {}) => __awaiter(this, void 0, void 0, function* () {
            return (dispatch) => __awaiter(this, void 0, void 0, function* () {
                dispatch({ type: this.Actions.PATCHING_ITEM });
                const response = yield this.requestPatchItem(data).catch(utils_1.default.throwError);
                dispatch({ type: this.Actions.ITEM_PATCH_SUCCESS, data: response.data, additionalDispatchData });
                return response;
            });
        });
        // Delete an instance of the model
        this.requestDeleteItem = (id) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: `${this.ModelName}/${id}`, method: 'DELETE' }); });
        this.deleteItem = (id, additionalDispatchData = {}) => __awaiter(this, void 0, void 0, function* () {
            return (dispatch) => __awaiter(this, void 0, void 0, function* () {
                dispatch({ type: this.Actions.DELETING_ITEM });
                const response = yield this.requestDeleteItem(id).catch(utils_1.default.throwError);
                dispatch({ type: this.Actions.ITEM_DELETED, data: response.data, additionalDispatchData });
                return response;
            });
        });
        this.requestGetEntityByItem = (id, entity, params = {}) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: `${this.ModelName}/${id}/${entity}`, params }); });
        this.getEntityByItem = (id, entity, params = {}, additionalDispatchData = {}) => __awaiter(this, void 0, void 0, function* () {
            return (dispatch) => __awaiter(this, void 0, void 0, function* () {
                this.Actions.FETCHING_ENTITY_OF_ITEM = `FETCHING_${lodash_1.default.toUpper(entity)}_OF_SINGLE_${this.ModelCaps}`;
                dispatch({ type: this.Actions.FETCHING_ENTITY_OF_ITEM });
                const response = yield this.requestGetEntityByItem(id, entity, params).catch(utils_1.default.throwError);
                this.Actions.ENTITY_OF_ITEM_RECEIVED = `${lodash_1.default.toUpper(entity)}_OF_SINGLE_${this.ModelCaps}_RECEIVED`;
                dispatch({ type: this.Actions.ENTITY_OF_ITEM_RECEIVED, data: response.data, entity, additionalDispatchData });
                return response;
            });
        });
        // name of the model in the LoopBack, e.g. book
        this.ModelName = modelName;
        // name in the CAPS
        this.ModelCaps = lodash_1.default.toUpper(modelName);
        // All the actions including custom actions.
        this.Actions = Object.assign({ 
            // modelname e.g. destinations/
            FETCHING_LIST: `FETCHING_${this.ModelCaps}_LIST`, LIST_RECEIVED: `${this.ModelCaps}_LIST_RECEIVED`, 
            // modelname/id e.g. destinations/1209fja0jdvHjdns12
            FETCHING_SINGLE_ITEM: `FETCHING_SINGLE_${this.ModelCaps}_ITEM`, SINGLE_ITEM_RECEIVED: `SINGLE_${this.ModelCaps}_ITEM_RECEIVED`, PUTTING_ITEM: `PUTTING_SINGLE_${this.ModelCaps}`, PUT_ITEM_SUCCESS: `${this.ModelCaps}_PUTTING_SUCCESSFUL`, PATCHING_ITEM: `PATCHING_${this.ModelCaps}_ITEM`, ITEM_PATCH_SUCCESS: `${this.ModelCaps}_ITEM_PATCH_SUCCESS`, DELETING_ITEM: `DELETING_${this.ModelCaps}_ITEM`, ITEM_DELETED: `${this.ModelCaps}_ITEM_DELETED`, FETCHING_ENTITY_OF_ITEM: `FETCHING_ENTITY_OF_ITEM`, ENTITY_OF_ITEM_RECEIVED: `ENTITY_OF_ITEM_RECEIVED` }, customActions);
    }
    // It will set the baseApiUrl for every API request.
    init(baseUrl) {
        utils_1.default.setBaseAPI_URL(baseUrl);
    }
}
exports.LoopFront = LoopFront;
