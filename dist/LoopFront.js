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
const utils_1 = __importDefault(require("./utils"));
exports.DefaultActivites = {
    COUNT: 'count',
    EXISTS: 'exists',
    REPLACE: 'replace',
    FIND_ONE: 'findOne',
    REPLACE_OR_CREATE: 'replaceOrCreate',
};
class LoopFront {
    constructor(modelName, customActions = {}, entities = {}, activities = {}) {
        // GET All items of the model
        this.requestGetItemsList = (params = {}) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: this.ModelName, params }); });
        this.getItemsList = (params = {}, additionalDispatchData = {}) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
            dispatch({ type: this.Actions.FETCHING_LIST });
            const response = yield this.requestGetItemsList(params).catch(utils_1.default.throwError);
            dispatch({ type: this.Actions.LIST_RECEIVED, data: response.data, additionalDispatchData });
            return response;
        });
        // GET single instance of the model
        this.requestGetItem = (id, params = {}) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: `/${this.ModelName}/${id}`, params }); });
        this.getItem = (id, params = {}, additionalDispatchData = {}) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
            dispatch({ type: this.Actions.FETCHING_SINGLE_ITEM });
            const response = yield this.requestGetItem(id, params).catch(utils_1.default.throwError);
            dispatch({ type: this.Actions.SINGLE_ITEM_RECEIVED, data: response.data, additionalDispatchData });
            return response;
        });
        // create a new instance
        this.requestPostItem = (data = {}, params = {}) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: this.ModelName, method: 'POST', data, params }); });
        this.postItem = (data = {}, params = {}, additionalDispatchData = {}) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
            dispatch({ type: this.Actions.POSTING_ITEM });
            const response = yield this.requestPostItem(data, params).catch(utils_1.default.throwError);
            dispatch({ type: this.Actions.POST_ITEM_SUCCESS, data: response.data, additionalDispatchData });
            return response;
        });
        // replace existing instance of the model or inserting a new one
        this.requestPutItem = (data = {}, params = {}) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: this.ModelName, method: 'PUT', data, params }); });
        this.putItem = (data = {}, params = {}, additionalDispatchData = {}) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
            dispatch({ type: this.Actions.PUTTING_ITEM });
            const response = yield this.requestPutItem(data, params).catch(utils_1.default.throwError);
            dispatch({ type: this.Actions.PUT_ITEM_SUCCESS, data: response.data, additionalDispatchData });
            return response;
        });
        // Update the existing instance of the model
        this.requestPatchItem = (data, params = {}) => utils_1.default.request({ url: this.ModelName, method: 'PATCH', data, params });
        this.patchItem = (data, params = {}, additionalDispatchData = {}) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
            dispatch({ type: this.Actions.PATCHING_ITEM });
            const response = yield this.requestPatchItem(data, params).catch(utils_1.default.throwError);
            dispatch({ type: this.Actions.ITEM_PATCH_SUCCESS, data: response.data, additionalDispatchData });
            return response;
        });
        // Delete an instance of the model
        this.requestDeleteItem = (id) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: `${this.ModelName}/${id}`, method: 'DELETE' }); });
        this.deleteItem = (id, additionalDispatchData = {}) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
            dispatch({ type: this.Actions.DELETING_ITEM });
            const response = yield this.requestDeleteItem(id).catch(utils_1.default.throwError);
            dispatch({ type: this.Actions.ITEM_DELETED, data: response.data, additionalDispatchData });
            return response;
        });
        this.requestGetEntityByItem = (id, entity, params = {}) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: `${this.ModelName}/${id}/${entity}`, params }); });
        this.getEntityByItem = (id, entity, params = {}, additionalDispatchData = {}) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
            this.Actions.FETCHING_ENTITY_OF_ITEM = `FETCHING_${(entity || '').toUpperCase()}_OF_SINGLE_${this.ModelCaps}`;
            dispatch({ type: this.Actions.FETCHING_ENTITY_OF_ITEM, entity });
            const response = yield this.requestGetEntityByItem(id, entity, params).catch(utils_1.default.throwError);
            this.Actions.ENTITY_OF_ITEM_RECEIVED = `${(entity || '').toUpperCase()}_OF_SINGLE_${this.ModelCaps}_RECEIVED`;
            dispatch({ type: this.Actions.ENTITY_OF_ITEM_RECEIVED, data: response.data, entity, additionalDispatchData });
            return response;
        });
        this.requestPostEntityByItem = (id, entity, data = {}, params = {}) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: `${this.ModelName}/${id}/${entity}`, data, method: 'POST', params }); });
        this.postEntityByItem = (id, entity, data = {}, params = {}, additionalDispatchData = {}) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
            this.Actions.POSTING_ENTITY_OF_ITEM = `POSTING_${(entity || '').toUpperCase()}_OF_${this.ModelCaps}`;
            dispatch({ type: this.Actions.POSTING_ENTITY_OF_ITEM, entity });
            const response = yield this.requestPostEntityByItem(id, entity, data, params).catch(utils_1.default.throwError);
            this.Actions.POST_ENTITY_OF_ITEM_SUCCESS = `POST_${(entity || '').toUpperCase()}_OF_${this.ModelCaps}_SUCCESS`;
            dispatch({ type: this.Actions.POST_ENTITY_OF_ITEM_SUCCESS, data: response.data, entity, additionalDispatchData });
            return response;
        });
        this.requestDeleteEntityByItem = (id, entity) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: `${this.ModelName}/${id}/${entity}`, method: 'DELETE' }); });
        this.deleteEntityByItem = (id, entity, additionalDispatchData = {}) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
            this.Actions.DELETING_ENTITY_OF_ITEM = `DELETING_${(entity || '').toUpperCase()}_OF_${this.ModelCaps}`;
            dispatch({ type: this.Actions.DELETING_ENTITY_OF_ITEM, entity });
            const response = yield this.requestDeleteEntityByItem(id, entity).catch(utils_1.default.throwError);
            this.Actions.ITEM_ENTITY_DELETED = `${this.ModelCaps}_${(entity || '').toUpperCase()}_DELETED`;
            dispatch({ type: this.Actions.ITEM_ENTITY_DELETED, data: response.data, entity, additionalDispatchData });
            return response;
        });
        this.requestGetActivity = (activity, params = {}) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: `${this.ModelName}/${activity}`, params }); });
        this.getActivity = (activity, params = {}, additionalDispatchData = {}) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
            this.Actions.FETCHING_ACTIVITY = `FETCHING_${this.ModelCaps}_${(activity || '').toUpperCase()}`;
            dispatch({ type: this.Actions.FETCHING_ACTIVITY, activity });
            const response = yield this.requestGetActivity(activity, params).catch(utils_1.default.throwError);
            this.Actions.ACTIVITY_RECEIVED = `${this.ModelCaps}_${(activity || '').toUpperCase()}_RECEIVED`;
            dispatch({ type: this.Actions.ACTIVITY_RECEIVED, data: response.data, activity, additionalDispatchData });
            return response;
        });
        this.requestPostActivity = (activity, data = {}, params = {}) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: `${this.ModelName}/${activity}`, data, method: 'POST', params }); });
        this.postActivity = (activity, data = {}, params = {}, additionalDispatchData = {}) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
            this.Actions.POSTING_ACTIVITY = `POSTING_${this.ModelCaps}_${(activity || '').toUpperCase()}`;
            dispatch({ type: this.Actions.POSTING_ACTIVITY, activity });
            const response = yield this.requestPostActivity(activity, data, params).catch(utils_1.default.throwError);
            this.Actions.ACTIVITY_POST_SUCCESS = `${this.ModelCaps}_${(activity || '').toUpperCase()}_POST_SUCCESS`;
            dispatch({ type: this.Actions.ACTIVITY_POST_SUCCESS, data: response.data, activity, additionalDispatchData });
            return response;
        });
        this.requestGetItemActivity = (id, activity, params = {}) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: `${this.ModelName}/${id}/${activity}`, params }); });
        this.getItemActivity = (id, activity, params = {}, additionalDispatchData = {}) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
            this.Actions.FETCHING_ITEM_ACTIVITY = `FETCHING_${this.ModelCaps}_ITEM_${(activity || '').toUpperCase()}`;
            dispatch({ type: this.Actions.FETCHING_ITEM_ACTIVITY, activity });
            const response = yield this.requestGetItemActivity(id, activity, params).catch(utils_1.default.throwError);
            this.Actions.ITEM_ACTIVITY_RECEIVED = `${this.ModelCaps}_ITEM_${(activity || '').toUpperCase()}_RECEIVED`;
            dispatch({ type: this.Actions.ITEM_ACTIVITY_RECEIVED, data: response.data, activity, additionalDispatchData });
            return response;
        });
        this.requestPostItemActivity = (id, activity, data = {}, params = {}) => __awaiter(this, void 0, void 0, function* () { return utils_1.default.request({ url: `${this.ModelName}/${id}/${activity}`, method: 'POST', data, params }); });
        this.postItemActivity = (id, activity, data = {}, params = {}, additionalDispatchData = {}) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
            this.Actions.POSTING_ITEM_ACTIVITY = `$POSTING_${this.ModelCaps}_ITEM_${(activity || '').toUpperCase()}`;
            dispatch({ type: this.Actions.POSTING_ITEM_ACTIVITY, activity });
            const response = yield this.requestPostItemActivity(id, activity, data, params).catch(utils_1.default.throwError);
            this.Actions.ITEM_ACTIVITY_POST_SUCCESS = `${this.ModelCaps}_ITEM_ACTIVITY_POST_SUCCESS`;
            dispatch({ type: this.Actions.ITEM_ACTIVITY_POST_SUCCESS, data: response.data, activity, additionalDispatchData });
            return response;
        });
        // name of the model in the LoopBack, e.g. book
        this.ModelName = modelName;
        // name in the CAPS
        this.ModelCaps = (modelName || '').toUpperCase();
        // All the actions including custom actions.
        this.Actions = Object.assign({ 
            // modelname e.g. destinations/
            FETCHING_LIST: `FETCHING_${this.ModelCaps}_LIST`, LIST_RECEIVED: `${this.ModelCaps}_LIST_RECEIVED`, 
            // modelname/id e.g. destinations/1209fja0jdvHjdns12
            FETCHING_SINGLE_ITEM: `FETCHING_SINGLE_${this.ModelCaps}_ITEM`, SINGLE_ITEM_RECEIVED: `SINGLE_${this.ModelCaps}_ITEM_RECEIVED`, PUTTING_ITEM: `PUTTING_SINGLE_${this.ModelCaps}`, PUT_ITEM_SUCCESS: `${this.ModelCaps}_PUTTING_SUCCESSFUL`, POSTING_ITEM: `POSTING_SINGLE_${this.ModelCaps}`, POST_ITEM_SUCCESS: `${this.ModelCaps}_POSTING_SUCCESSFUL`, PATCHING_ITEM: `PATCHING_${this.ModelCaps}_ITEM`, ITEM_PATCH_SUCCESS: `${this.ModelCaps}_ITEM_PATCH_SUCCESS`, DELETING_ITEM: `DELETING_${this.ModelCaps}_ITEM`, ITEM_DELETED: `${this.ModelCaps}_ITEM_DELETED`, FETCHING_ENTITY_OF_ITEM: `FETCHING_ENTITY_OF_${this.ModelCaps}`, ENTITY_OF_ITEM_RECEIVED: `ENTITY_OF_${this.ModelCaps}_RECEIVED`, POSTING_ENTITY_OF_ITEM: `POSTING_ENTITY_OF_${this.ModelCaps}`, POST_ENTITY_OF_ITEM_SUCCESS: `POST_ENTITY_OF_${this.ModelCaps}_SUCCESS`, DELETING_ENTITY_OF_ITEM: `DELETING_ENTITY_OF_${this.ModelCaps}`, ITEM_ENTITY_DELETED: `${this.ModelCaps}_ENTITY_DELETED`, FETCHING_ACTIVITY: `FETCHING_${this.ModelCaps}_ACTIVITY`, ACTIVITY_RECEIVED: `${this.ModelCaps}_ACTIVITY_RECEIVED`, POSTING_ACTIVITY: `POSTING_${this.ModelCaps}_ACTIVITY`, ACTIVITY_POST_SUCCESS: `${this.ModelCaps}_ACTIVITY_POST_SUCCESS`, FETCHING_ITEM_ACTIVITY: `FETCHING_${this.ModelCaps}_ITEM_ACTIVITY`, ITEM_ACTIVITY_RECEIVED: `${this.ModelCaps}_ITEM_ACTIVITY_RECEIVED`, POSTING_ITEM_ACTIVITY: `POSTING_${this.ModelCaps}_ITEM_ACTIVITY`, ITEM_ACTIVITY_POST_SUCCESS: `${this.ModelCaps}_ITEM_ACTIVITY_POST_SUCCESS` }, (customActions || {}));
        this.Entities = Object.assign({}, (entities));
        this.Activites = Object.assign({}, exports.DefaultActivites, (activities || {}));
    }
    // It will set the baseApiUrl for every API request.
    static init(baseUrl, config) {
        utils_1.default.setBaseAPI_URL(baseUrl);
        this.Logger = config.log;
    }
    static setAuthHeader(access_token) {
        utils_1.default.setAuthHeader(access_token);
    }
}
LoopFront.request = (config) => utils_1.default.request(config);
exports.default = LoopFront;
