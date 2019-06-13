import { Dispatch } from 'redux';
import { AxiosRequestConfig } from 'axios';
export declare type TMethod = 'GET' | 'POST' | 'UPDATE' | 'DELETE' | 'PUT' | 'PATCH';
export declare type TStringObject = {
    [x: string]: string;
};
export interface IActions {
    FETCHING_LIST: string;
    LIST_RECEIVED: string;
    FETCHING_SINGLE_ITEM: string;
    SINGLE_ITEM_RECEIVED: string;
    POSTING_ITEM: string;
    POST_ITEM_SUCCESS: string;
    PUTTING_ITEM: string;
    PUT_ITEM_SUCCESS: string;
    PATCHING_ITEM: string;
    ITEM_PATCH_SUCCESS: string;
    DELETING_ITEM: string;
    ITEM_DELETED: string;
    FETCHING_ENTITY_OF_ITEM: string;
    ENTITY_OF_ITEM_RECEIVED: string;
    POSTING_ENTITY_OF_ITEM: string;
    POST_ENTITY_OF_ITEM_SUCCESS: string;
    DELETING_ENTITY_OF_ITEM: string;
    ITEM_ENTITY_DELETED: string;
    FETCHING_ACTIVITY: string;
    ACTIVITY_RECEIVED: string;
    POSTING_ACTIVITY: string;
    ACTIVITY_POST_SUCCESS: string;
    FETCHING_ITEM_ACTIVITY: string;
    ITEM_ACTIVITY_RECEIVED: string;
    POSTING_ITEM_ACTIVITY: string;
    ITEM_ACTIVITY_POST_SUCCESS: string;
}
export declare const DefaultActivites: {
    COUNT: string;
    EXISTS: string;
    REPLACE: string;
    FIND_ONE: string;
    REPLACE_OR_CREATE: string;
};
export interface TRequestConfig extends AxiosRequestConfig {
    url: string;
    params?: object;
    method?: TMethod;
    data?: object;
}
export interface TAction {
    type: string;
    data?: any;
    /**
     * It is the Entity by which the model has some realtion (oneToOne, manyToOne, oneToMany, hasMany, belongsTo etc.)
     * @example: `country/states`
     * where `country` is the model has `hasMany` relation with the model `state`
     */
    entity?: string;
    /**
     * It is the activity that is being performed on an model.
     * @example: `user/login`
     * where `user` is the model name and `login` is the activity
     */
    activity?: string;
    additionalDispatchData?: any;
}
declare class LoopFront<TCustomActions extends TStringObject = {}, TEntities extends TStringObject = {}, TActivities extends TStringObject = {}> {
    static Logger: boolean;
    constructor(modelName: string, customActions?: TCustomActions, entities?: TEntities, activities?: TActivities);
    readonly ModelName: string;
    readonly ModelCaps: string;
    Actions: IActions & (TCustomActions);
    Entities: TEntities;
    Activites: typeof DefaultActivites & TActivities;
    static init(baseUrl: string, config: {
        log: boolean;
    }): void;
    static setAuthHeader(access_token?: string): void;
    static request: (config: TRequestConfig) => import("axios").AxiosPromise<{}>;
    requestGetItemsList: (params?: object) => Promise<import("axios").AxiosResponse<{}>>;
    getItemsList: (params?: object, additionalDispatchData?: object) => (dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>;
    requestGetItem: (id: string | number, params?: object) => Promise<import("axios").AxiosResponse<{}>>;
    getItem: (id: string | number, params?: object, additionalDispatchData?: object) => (dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>;
    requestPostItem: (data?: object, params?: object) => Promise<import("axios").AxiosResponse<{}>>;
    postItem: (data?: object, params?: object, additionalDispatchData?: object) => (dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>;
    requestPutItem: (data?: object, params?: object) => Promise<import("axios").AxiosResponse<{}>>;
    putItem: (data?: object, params?: object, additionalDispatchData?: object) => (dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>;
    requestPatchItem: (data: object & {
        id: string | number;
    }, params?: object) => import("axios").AxiosPromise<{}>;
    patchItem: (data: object & {
        id: string | number;
    }, params?: object, additionalDispatchData?: object) => (dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>;
    requestDeleteItem: (id: string | number) => Promise<import("axios").AxiosResponse<{}>>;
    deleteItem: (id: string | number, additionalDispatchData?: object) => (dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>;
    requestGetEntityByItem: (id: string | number, entity: TEntities[keyof TEntities], params?: object) => Promise<import("axios").AxiosResponse<{}>>;
    getEntityByItem: (id: string | number, entity: TEntities[keyof TEntities], params?: object, additionalDispatchData?: object) => (dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>;
    requestPostEntityByItem: (id: string | number, entity: TEntities[keyof TEntities], data?: object, params?: object) => Promise<import("axios").AxiosResponse<{}>>;
    postEntityByItem: (id: string | number, entity: TEntities[keyof TEntities], data?: object, params?: object, additionalDispatchData?: object) => (dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>;
    requestDeleteEntityByItem: (id: string | number, entity: TEntities[keyof TEntities]) => Promise<import("axios").AxiosResponse<{}>>;
    deleteEntityByItem: (id: string | number, entity: TEntities[keyof TEntities], additionalDispatchData?: object) => (dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>;
    requestGetActivity: (activity: TActivities[keyof TActivities], params?: object) => Promise<import("axios").AxiosResponse<{}>>;
    getActivity: (activity: TActivities[keyof TActivities], params?: object, additionalDispatchData?: object) => (dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>;
    requestPostActivity: (activity: TActivities[keyof TActivities], data?: object, params?: object) => Promise<import("axios").AxiosResponse<{}>>;
    postActivity: (activity: TActivities[keyof TActivities], data?: object, params?: object, additionalDispatchData?: object) => (dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>;
    requestGetItemActivity: (id: string | number, activity: TActivities[keyof TActivities], params?: object) => Promise<import("axios").AxiosResponse<{}>>;
    getItemActivity: (id: string | number, activity: TActivities[keyof TActivities], params?: object, additionalDispatchData?: object) => (dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>;
    requestPostItemActivity: (id: string | number, activity: TActivities[keyof TActivities], data?: object, params?: object) => Promise<import("axios").AxiosResponse<{}>>;
    postItemActivity: (id: string | number, activity: TActivities[keyof TActivities], data?: object, params?: object, additionalDispatchData?: object) => (dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>;
}
export default LoopFront;
