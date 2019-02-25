import { Dispatch } from 'redux';
export declare type TMethod = 'GET' | 'POST' | 'UPDATE' | 'DELETE' | 'PUT' | 'PATCH';
export interface IActions {
    FETCHING_LIST: string;
    LIST_RECEIVED: string;
    FETCHING_SINGLE_ITEM: string;
    SINGLE_ITEM_RECEIVED: string;
    PUTTING_ITEM: string;
    PUT_ITEM_SUCCESS: string;
    PATCHING_ITEM: string;
    ITEM_PATCH_SUCCESS: string;
    DELETING_ITEM: string;
    ITEM_DELETED: string;
    FETCHING_ENTITY_OF_ITEM: string;
    ENTITY_OF_ITEM_RECEIVED: string;
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
    additionalDispatchData?: object;
}
export declare class LoopFront<TCustomActions> {
    constructor(modelName: string, customActions?: (TCustomActions | {}));
    readonly ModelName: string;
    readonly ModelCaps: string;
    Actions: IActions & (TCustomActions | {});
    init(baseUrl: string): void;
    requestGetItemsList: (params?: object) => Promise<import("axios").AxiosResponse<{}>>;
    getItemsList: (params?: object, additionalDispatchData?: object) => Promise<(dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>>;
    requestGetItem: (id: string | number, params?: object) => Promise<import("axios").AxiosResponse<{}>>;
    getItem: (id: string | number, params?: object, additionalDispatchData?: object) => Promise<(dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>>;
    requestPutItem: (data?: object) => Promise<import("axios").AxiosResponse<{}>>;
    putItem: (data?: object, additionalDispatchData?: object) => (dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>;
    requestPatchItem: (data: object & {
        id: string | number;
    }) => Promise<import("axios").AxiosResponse<{}>>;
    patchItem: (data: object & {
        id: string | number;
    }, additionalDispatchData?: object) => Promise<(dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>>;
    requestDeleteItem: (id: string | number) => Promise<import("axios").AxiosResponse<{}>>;
    deleteItem: (id: string | number, additionalDispatchData?: object) => Promise<(dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>>;
    requestGetEntityByItem: (id: string | number, entity: string, params?: object) => Promise<import("axios").AxiosResponse<{}>>;
    getEntityByItem: (id: string | number, entity: string, params?: object, additionalDispatchData?: object) => Promise<(dispatch: Dispatch<any>) => Promise<import("axios").AxiosResponse<{}>>>;
}
