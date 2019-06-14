import { Dispatch } from 'redux';
import utils from './utils';
import { Method } from 'axios';

export type TStringObject = { [x: string]: string }


// These are the default actions that can be dispatched
export interface IActions {

    // For main list get request
    FETCHING_LIST: string
    LIST_RECEIVED: string

    // To get the single instance of the model
    FETCHING_SINGLE_ITEM: string
    SINGLE_ITEM_RECEIVED: string

    // Creating a new instance
    POSTING_ITEM: string
    POST_ITEM_SUCCESS: string

    // Request to create new instance or just replace the existing item
    PUTTING_ITEM: string
    PUT_ITEM_SUCCESS: string

    PATCHING_ITEM: string
    ITEM_PATCH_SUCCESS: string

    DELETING_ITEM: string
    ITEM_DELETED: string

    FETCHING_ENTITY_OF_ITEM: string
    ENTITY_OF_ITEM_RECEIVED: string

    POSTING_ENTITY_OF_ITEM: string
    POST_ENTITY_OF_ITEM_SUCCESS: string

    DELETING_ENTITY_OF_ITEM: string
    ITEM_ENTITY_DELETED: string

    FETCHING_ACTIVITY: string
    ACTIVITY_RECEIVED: string

    POSTING_ACTIVITY: string
    ACTIVITY_POST_SUCCESS: string

    FETCHING_ITEM_ACTIVITY: string
    ITEM_ACTIVITY_RECEIVED: string

    POSTING_ITEM_ACTIVITY: string
    ITEM_ACTIVITY_POST_SUCCESS: string

}

export const DefaultActivites = {
    COUNT: 'count',
    EXISTS: 'exists',
    REPLACE: 'replace',
    FIND_ONE: 'findOne',
    REPLACE_OR_CREATE: 'replaceOrCreate',
}

export interface TRequestConfig {
    url: string,
    params?: object,
    method?: Method,
    data?: object
}

// This is the type of an acton, that what different entities it wil have.
export interface TAction {

    // It is the type of the action which is mandatory
    type: string

    // It contains the payload data to be dispatched with the type
    data?: any

    /**
     * It is the Entity by which the model has some realtion (oneToOne, manyToOne, oneToMany, hasMany, belongsTo etc.)
     * @example: `country/states`
     * where `country` is the model has `hasMany` relation with the model `state`
     */
    entity?: string

    /**
     * It is the activity that is being performed on an model. 
     * @example: `user/login`
     * where `user` is the model name and `login` is the activity
     */
    activity?: string

    // It is the additional dispatch data which can be needed in the reducer from the custom dispatcher.
    additionalDispatchData?: any
}

class LoopFront<TCustomActions extends TStringObject = {}, TEntities extends TStringObject = {}, TActivities extends TStringObject = {}> {

    static Logger: boolean;

    constructor(modelName: string, customActions: TCustomActions = {} as TCustomActions, entities: TEntities = {} as TEntities, activities: TActivities = {} as TActivities) {

        // name of the model in the LoopBack, e.g. book
        this.ModelName = modelName;

        // name in the CAPS
        this.ModelCaps = (modelName || '').toUpperCase();

        // All the actions including custom actions.
        this.Actions = {

            // modelname e.g. destinations/
            FETCHING_LIST: `FETCHING_${this.ModelCaps}_LIST`,
            LIST_RECEIVED: `${this.ModelCaps}_LIST_RECEIVED`,

            // modelname/id e.g. destinations/1209fja0jdvHjdns12
            FETCHING_SINGLE_ITEM: `FETCHING_SINGLE_${this.ModelCaps}_ITEM`,
            SINGLE_ITEM_RECEIVED: `SINGLE_${this.ModelCaps}_ITEM_RECEIVED`,

            PUTTING_ITEM: `PUTTING_SINGLE_${this.ModelCaps}`,
            PUT_ITEM_SUCCESS: `${this.ModelCaps}_PUTTING_SUCCESSFUL`,

            POSTING_ITEM: `POSTING_SINGLE_${this.ModelCaps}`,
            POST_ITEM_SUCCESS: `${this.ModelCaps}_POSTING_SUCCESSFUL`,

            PATCHING_ITEM: `PATCHING_${this.ModelCaps}_ITEM`,
            ITEM_PATCH_SUCCESS: `${this.ModelCaps}_ITEM_PATCH_SUCCESS`,

            DELETING_ITEM: `DELETING_${this.ModelCaps}_ITEM`,
            ITEM_DELETED: `${this.ModelCaps}_ITEM_DELETED`,

            FETCHING_ENTITY_OF_ITEM: `FETCHING_ENTITY_OF_${this.ModelCaps}`,
            ENTITY_OF_ITEM_RECEIVED: `ENTITY_OF_${this.ModelCaps}_RECEIVED`,

            POSTING_ENTITY_OF_ITEM: `POSTING_ENTITY_OF_${this.ModelCaps}`,
            POST_ENTITY_OF_ITEM_SUCCESS: `POST_ENTITY_OF_${this.ModelCaps}_SUCCESS`,

            DELETING_ENTITY_OF_ITEM: `DELETING_ENTITY_OF_${this.ModelCaps}`,
            ITEM_ENTITY_DELETED: `${this.ModelCaps}_ENTITY_DELETED`,

            FETCHING_ACTIVITY: `FETCHING_${this.ModelCaps}_ACTIVITY`,
            ACTIVITY_RECEIVED: `${this.ModelCaps}_ACTIVITY_RECEIVED`,

            POSTING_ACTIVITY: `POSTING_${this.ModelCaps}_ACTIVITY`,
            ACTIVITY_POST_SUCCESS: `${this.ModelCaps}_ACTIVITY_POST_SUCCESS`,

            FETCHING_ITEM_ACTIVITY: `FETCHING_${this.ModelCaps}_ITEM_ACTIVITY`,
            ITEM_ACTIVITY_RECEIVED: `${this.ModelCaps}_ITEM_ACTIVITY_RECEIVED`,

            POSTING_ITEM_ACTIVITY: `POSTING_${this.ModelCaps}_ITEM_ACTIVITY`,
            ITEM_ACTIVITY_POST_SUCCESS: `${this.ModelCaps}_ITEM_ACTIVITY_POST_SUCCESS`,


            // Override the values of pre-defined actions for a particular object or adding new actions
            ...(customActions || {} as TCustomActions)
        }

        this.Entities = { ...(entities) };

        this.Activites = { ...DefaultActivites, ...(activities || {} as TActivities) }

    }

    readonly ModelName: string;
    readonly ModelCaps: string;
    public Actions: IActions & (TCustomActions)
    public Entities: TEntities
    public Activites: typeof DefaultActivites & TActivities

    // It will set the baseApiUrl for every API request.
    public static init(baseUrl: string, config: { log: boolean } = { log: false }) {
        utils.setBaseAPI_URL(baseUrl);
        this.Logger = config.log || false;
    }

    public static setAuthHeader(access_token?: string) {
        utils.setAuthHeader(access_token);
    }

    public static request = (config: TRequestConfig) => utils.request(config);


    // GET All items of the model
    requestGetItemsList = async (params: object = {}) => utils.request({ url: this.ModelName, params });
    getItemsList = (params: object = {}, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: this.Actions.FETCHING_LIST });
        const response = await this.requestGetItemsList(params).catch(utils.throwError);
        dispatch({ type: this.Actions.LIST_RECEIVED, data: response.data, additionalDispatchData });
        return response;
    }

    // GET single instance of the model
    requestGetItem = async (id: string | number, params: object = {}) => utils.request({ url: `/${this.ModelName}/${id}`, params });
    getItem = (id: string | number, params: object = {}, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: this.Actions.FETCHING_SINGLE_ITEM });
        const response = await this.requestGetItem(id, params).catch(utils.throwError);
        dispatch({ type: this.Actions.SINGLE_ITEM_RECEIVED, data: response.data, additionalDispatchData });
        return response;
    }

    // create a new instance
    requestPostItem = async (data: object = {}, params: object = {}, ) => utils.request({ url: this.ModelName, method: 'POST', data, params });
    postItem = (data: object = {}, params: object = {}, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: this.Actions.POSTING_ITEM });
        const response = await this.requestPostItem(data, params).catch(utils.throwError);
        dispatch({ type: this.Actions.POST_ITEM_SUCCESS, data: response.data, additionalDispatchData });
        return response;
    }

    // replace existing instance of the model or inserting a new one
    requestPutItem = async (data: object = {}, params: object = {}) => utils.request({ url: this.ModelName, method: 'PUT', data, params });
    putItem = (data: object = {}, params: object = {}, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: this.Actions.PUTTING_ITEM });
        const response = await this.requestPutItem(data, params).catch(utils.throwError);
        dispatch({ type: this.Actions.PUT_ITEM_SUCCESS, data: response.data, additionalDispatchData });
        return response;
    }

    // Update the existing instance of the model
    requestPatchItem = (id: string | number, data: object, params: object = {}) => utils.request({ url: `${this.ModelName}/${id}`, method: 'PATCH', data, params });
    patchItem = (id: string | number, data: object, params: object = {}, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: this.Actions.PATCHING_ITEM });
        const response = await this.requestPatchItem(id, data, params).catch(utils.throwError);
        dispatch({ type: this.Actions.ITEM_PATCH_SUCCESS, data: response.data, additionalDispatchData });
        return response;
    }

    // Delete an instance of the model
    requestDeleteItem = async (id: string | number) => utils.request({ url: `${this.ModelName}/${id}`, method: 'DELETE' });
    deleteItem = (id: string | number, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: this.Actions.DELETING_ITEM });
        const response = await this.requestDeleteItem(id).catch(utils.throwError);
        dispatch({ type: this.Actions.ITEM_DELETED, data: response.data, additionalDispatchData });
        return response;
    }


    requestGetEntityByItem = async (id: number | string, entity: TEntities[keyof TEntities], params: object = {}) => utils.request({ url: `${this.ModelName}/${id}/${entity}`, params });
    getEntityByItem = (id: string | number, entity: TEntities[keyof TEntities], params: object = {}, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        this.Actions.FETCHING_ENTITY_OF_ITEM = `FETCHING_${(entity || '' as string).toUpperCase()}_OF_SINGLE_${this.ModelCaps}`;
        dispatch({ type: this.Actions.FETCHING_ENTITY_OF_ITEM, entity });
        const response = await this.requestGetEntityByItem(id, entity, params).catch(utils.throwError);
        this.Actions.ENTITY_OF_ITEM_RECEIVED = `${(entity || '').toUpperCase()}_OF_SINGLE_${this.ModelCaps}_RECEIVED`;
        dispatch({ type: this.Actions.ENTITY_OF_ITEM_RECEIVED, data: response.data, entity, additionalDispatchData });
        return response;
    }

    requestPostEntityByItem = async (id: string | number, entity: TEntities[keyof TEntities], data: object = {}, params: object = {}, ) => utils.request({ url: `${this.ModelName}/${id}/${entity}`, data, method: 'POST', params });
    postEntityByItem = (id: string | number, entity: TEntities[keyof TEntities], data: object = {}, params: object = {}, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        this.Actions.POSTING_ENTITY_OF_ITEM = `POSTING_${(entity || '').toUpperCase()}_OF_${this.ModelCaps}`;
        dispatch({ type: this.Actions.POSTING_ENTITY_OF_ITEM, entity });
        const response = await this.requestPostEntityByItem(id, entity, data, params).catch(utils.throwError);
        this.Actions.POST_ENTITY_OF_ITEM_SUCCESS = `POST_${(entity || '').toUpperCase()}_OF_${this.ModelCaps}_SUCCESS`
        dispatch({ type: this.Actions.POST_ENTITY_OF_ITEM_SUCCESS, data: response.data, entity, additionalDispatchData });
        return response;
    }

    requestDeleteEntityByItem = async (id: string | number, entity: TEntities[keyof TEntities]) => utils.request({ url: `${this.ModelName}/${id}/${entity}`, method: 'DELETE' });
    deleteEntityByItem = (id: string | number, entity: TEntities[keyof TEntities], additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        this.Actions.DELETING_ENTITY_OF_ITEM = `DELETING_${(entity || '').toUpperCase()}_OF_${this.ModelCaps}`;
        dispatch({ type: this.Actions.DELETING_ENTITY_OF_ITEM, entity });
        const response = await this.requestDeleteEntityByItem(id, entity).catch(utils.throwError);
        this.Actions.ITEM_ENTITY_DELETED = `${this.ModelCaps}_${(entity || '').toUpperCase()}_DELETED`
        dispatch({ type: this.Actions.ITEM_ENTITY_DELETED, data: response.data, entity, additionalDispatchData });
        return response;
    }

    requestGetActivity = async (activity: TActivities[keyof TActivities], params: object = {}) => utils.request({ url: `${this.ModelName}/${activity}`, params });
    getActivity = (activity: TActivities[keyof TActivities], params: object = {}, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        this.Actions.FETCHING_ACTIVITY = `FETCHING_${this.ModelCaps}_${(activity || '').toUpperCase()}`;
        dispatch({ type: this.Actions.FETCHING_ACTIVITY, activity });
        const response = await this.requestGetActivity(activity, params).catch(utils.throwError);
        this.Actions.ACTIVITY_RECEIVED = `${this.ModelCaps}_${(activity || '').toUpperCase()}_RECEIVED`;
        dispatch({ type: this.Actions.ACTIVITY_RECEIVED, data: response.data, activity, additionalDispatchData });
        return response;
    }

    requestPostActivity = async (activity: TActivities[keyof TActivities], data: object = {}, params: object = {}) => utils.request({ url: `${this.ModelName}/${activity}`, data, method: 'POST', params });
    postActivity = (activity: TActivities[keyof TActivities], data: object = {}, params: object = {}, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        this.Actions.POSTING_ACTIVITY = `POSTING_${this.ModelCaps}_${(activity || '').toUpperCase()}`;
        dispatch({ type: this.Actions.POSTING_ACTIVITY, activity });
        const response = await this.requestPostActivity(activity, data, params).catch(utils.throwError);
        this.Actions.ACTIVITY_POST_SUCCESS = `${this.ModelCaps}_${(activity || '').toUpperCase()}_POST_SUCCESS`;
        dispatch({ type: this.Actions.ACTIVITY_POST_SUCCESS, data: response.data, activity, additionalDispatchData });
        return response;
    }

    requestGetItemActivity = async (id: string | number, activity: TActivities[keyof TActivities], params: object = {}) => utils.request({ url: `${this.ModelName}/${id}/${activity}`, params });
    getItemActivity = (id: string | number, activity: TActivities[keyof TActivities], params: object = {}, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        this.Actions.FETCHING_ITEM_ACTIVITY = `FETCHING_${this.ModelCaps}_ITEM_${(activity || '').toUpperCase()}`;
        dispatch({ type: this.Actions.FETCHING_ITEM_ACTIVITY, activity });
        const response = await this.requestGetItemActivity(id, activity, params).catch(utils.throwError);
        this.Actions.ITEM_ACTIVITY_RECEIVED = `${this.ModelCaps}_ITEM_${(activity || '').toUpperCase()}_RECEIVED`;
        dispatch({ type: this.Actions.ITEM_ACTIVITY_RECEIVED, data: response.data, activity, additionalDispatchData });
        return response;
    }

    requestPostItemActivity = async (id: string | number, activity: TActivities[keyof TActivities], data: object = {}, params: object = {}) => utils.request({ url: `${this.ModelName}/${id}/${activity}`, method: 'POST', data, params });
    postItemActivity = (id: string | number, activity: TActivities[keyof TActivities], data: object = {}, params: object = {}, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        this.Actions.POSTING_ITEM_ACTIVITY = `$POSTING_${this.ModelCaps}_ITEM_${(activity || '').toUpperCase()}`;
        dispatch({ type: this.Actions.POSTING_ITEM_ACTIVITY, activity });
        const response = await this.requestPostItemActivity(id, activity, data, params).catch(utils.throwError);
        this.Actions.ITEM_ACTIVITY_POST_SUCCESS = `${this.ModelCaps}_ITEM_ACTIVITY_POST_SUCCESS`;
        dispatch({ type: this.Actions.ITEM_ACTIVITY_POST_SUCCESS, data: response.data, activity, additionalDispatchData });
        return response;
    }

}

export default LoopFront;