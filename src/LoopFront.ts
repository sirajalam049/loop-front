import _ from 'lodash'
import { Dispatch } from 'redux';
import utils from './utils';

// These are the methods by which a request is hitted.
export type TMethod = 'GET' | 'POST' | 'UPDATE' | 'DELETE' | 'PUT' | 'PATCH'


// These are the default actions that can be dispatched
export interface IActions {

    // For main list get request
    FETCHING_LIST: string
    LIST_RECEIVED: string

    // To get the single instance of the model
    FETCHING_SINGLE_ITEM: string
    SINGLE_ITEM_RECEIVED: string

    // Request to create new instance or just replace the existing item
    PUTTING_ITEM: string
    PUT_ITEM_SUCCESS: string

    PATCHING_ITEM: string
    ITEM_PATCH_SUCCESS: string

    DELETING_ITEM: string
    ITEM_DELETED: string

    FETCHING_ENTITY_OF_ITEM: string
    ENTITY_OF_ITEM_RECEIVED: string

    // // 
    // FETCHING_ENTITY_OF_SINGLE_ITEM: string
    // SINGLE_ITEM_ENTITY_RECEIVED: string

    // POSTING_MODEL_ENTITY: string
    // MODEL_ENTITY_POST_SUCCESS: string

    // FETCHING_MODEL_ENTITY: string
    // MODEL_ENTITY_RECEIVED: string
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
    additionalDispatchData?: object
}


export class LoopFront<TCustomActions> {

    constructor(modelName: string, customActions: (TCustomActions | {}) = {}) {

        // name of the model in the LoopBack, e.g. book
        this.ModelName = modelName;

        // name in the CAPS
        this.ModelCaps = _.toUpper(modelName)

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

            PATCHING_ITEM: `PATCHING_${this.ModelCaps}_ITEM`,
            ITEM_PATCH_SUCCESS: `${this.ModelCaps}_ITEM_PATCH_SUCCESS`,

            DELETING_ITEM: `DELETING_${this.ModelCaps}_ITEM`,
            ITEM_DELETED: `${this.ModelCaps}_ITEM_DELETED`,

            FETCHING_ENTITY_OF_ITEM: `FETCHING_ENTITY_OF_ITEM`,
            ENTITY_OF_ITEM_RECEIVED: `ENTITY_OF_ITEM_RECEIVED`,

            // SINGLE_ITEM_POST_SUCCESS: `${this.modelCaps}_SUCCESSFULLY_POSTED`,

            // modelname/id/entityname e.g. destinations/asdkadsadasdasdkwpwr/reviews
            // FETCHING_ENTITY_OF_SINGLE_ITEM: `FETCHING_${this.modelCaps}_SINGLE_ENTITY`,
            // SINGLE_ITEM_ENTITY_RECEIVED: `${this.modelCaps}_SINGLE_ENTITY_RECEIVED`,

            // POST:modelname/entityname e.g. users/login
            // POSTING_MODEL_ENTITY: `POSTING_${this.modelCaps}_ENTITY`,
            // MODEL_ENTITY_POST_SUCCESS: `${this.modelCaps}_ENTITY_POST_SUCCESS`,

            // UPDATING_MODEL_ENTITY_BY_ITEM: `UPDATING_${this.modelCaps}_ENTITY_BY_ITEM`,
            // MODEL_ENTITY_UPDATE_BY_ITEM_SUCCESS: `${this.modelCaps}_ENTITY_BY_UPDATE_SUCCESS`,

            // modelname/entity e.g. users/me
            // FETCHING_MODEL_ENTITY: `FETCHING_${this.modelCaps}_ENTITY`,
            // MODEL_ENTITY_RECEIVED: `${this.modelCaps}_ENTITY_RECIEVED`,


            // Override the values of pre-defined actions for a particular object
            ...customActions
        }
    }

    readonly ModelName: string;
    readonly ModelCaps: string;
    public Actions: IActions & (TCustomActions | {})

    // It will set the baseApiUrl for every API request.
    public init(baseUrl: string) {
        utils.setBaseAPI_URL(baseUrl);
    }


    // GET All items of the model
    requestGetItemsList = async (params: object = {}) => utils.request({ url: this.ModelName, params });
    getItemsList = async (params: object = {}, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: this.Actions.FETCHING_LIST });
        const response = await this.requestGetItemsList(params).catch(utils.throwError);
        dispatch({ type: this.Actions.LIST_RECEIVED, data: response.data, additionalDispatchData });
        return response;
    }

    // GET single instance of the model
    requestGetItem = async (id: string | number, params: object = {}) => utils.request({ url: `/${this.ModelName}/${id}`, params });
    getItem = async (id: string | number, params: object = {}, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: this.Actions.FETCHING_SINGLE_ITEM });
        const response = await this.requestGetItem(id, params).catch(utils.throwError);
        dispatch({ type: this.Actions.SINGLE_ITEM_RECEIVED, data: response.data, additionalDispatchData });
        return response;
    }

    // Submit new or replace existing instance of the model
    requestPutItem = async (data: object = {}) => utils.request({ url: this.ModelName, method: 'PUT', data });
    putItem = (data: object = {}, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: this.Actions.PUTTING_ITEM });
        const response = await this.requestPutItem(data).catch(utils.throwError);
        dispatch({ type: this.Actions.PUT_ITEM_SUCCESS, data: response.data, additionalDispatchData });
        return response;
    }

    // Update the existing instance of the model
    requestPatchItem = async (data: object & { id: string | number }) => utils.request({ url: this.ModelName, method: 'PATCH', data });
    patchItem = async (data: object & { id: number | string }, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: this.Actions.PATCHING_ITEM });
        const response = await this.requestPatchItem(data).catch(utils.throwError);
        dispatch({ type: this.Actions.ITEM_PATCH_SUCCESS, data: response.data, additionalDispatchData });
        return response;
    }

    // Delete an instance of the model
    requestDeleteItem = async (id: string | number) => utils.request({ url: `${this.ModelName}/${id}`, method: 'DELETE' });
    deleteItem = async (id: string | number, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: this.Actions.DELETING_ITEM });
        const response = await this.requestDeleteItem(id).catch(utils.throwError);
        dispatch({ type: this.Actions.ITEM_DELETED, data: response.data, additionalDispatchData });
        return response;
    }


    requestGetEntityByItem = async (id: number | string, entity: string, params: object = {}) => utils.request({ url: `${this.ModelName}/${id}/${entity}`, params });
    getEntityByItem = async (id: string | number, entity: string, params: object = {}, additionalDispatchData: object = {}) => async (dispatch: Dispatch<any>) => {
        this.Actions.FETCHING_ENTITY_OF_ITEM = `FETCHING_${_.toUpper(entity)}_OF_SINGLE_${this.ModelCaps}`;
        dispatch({ type: this.Actions.FETCHING_ENTITY_OF_ITEM });
        const response = await this.requestGetEntityByItem(id, entity, params).catch(utils.throwError);
        this.Actions.ENTITY_OF_ITEM_RECEIVED = `${_.toUpper(entity)}_OF_SINGLE_${this.ModelCaps}_RECEIVED`;
        dispatch({ type: this.Actions.ENTITY_OF_ITEM_RECEIVED, data: response.data, entity, additionalDispatchData });
        return response;
    }

    // requestPutEntityByItem = async (id: string | number, entity: string, data: object = {}) => utils.request({ url: `${this.ModelName}/${id}/${entity}`, data });
    // putEntityByItem = async(id: string, entity: string, data?: object, additionalDispatchData?: object) => async (dispatch:Dispatch<any>) => {
    //     this
    // }

    //                     this.actions.MODEL_ENTITY_UPDATE_BY_ITEM_SUCCESS = `${this.modelCaps}_${_.toUpper(entity)}_UPDATE_BY_ITEM_SUCCESS`
    // dispatch({ type: this.actions.MODEL_ENTITY_UPDATE_BY_ITEM_SUCCESS, data: res.data, entity, additionalDispatchData });
    // resolve(res);
    //                         },
    // err => {
    //     console.log('Error', err);
    //     reject(err)
    // }
    //                     )
    //                 })
    //             )
    //         }

    // getModelEntity(entity: string, params?: object, additionalDispatchData?: object) {
    //     return (dispatch: Function) => {
    //         this.actions.FETCHING_MODEL_ENTITY = `FETCHING_${this.modelCaps}_${_.toUpper(entity)}`;
    //         this.actions.MODEL_ENTITY_RECEIVED = `${this.modelCaps}_${_.toUpper(entity)}_RECEIVED`;
    //         dispatch({ type: this.actions.FETCHING_MODEL_ENTITY });
    //         return (
    //             new Promise((resolve, reject) => {
    //                 utilities.request({
    //                     url: `${this.modelName}/${entity}`,
    //                     params
    //                 }).then(
    //                     res => {
    //                         dispatch({ type: this.actions.MODEL_ENTITY_RECEIVED, data: res.data, entity, additionalDispatchData })
    //                         resolve(res)
    //                     },
    //                     err => {
    //                         console.log('Error', err)
    //                         reject(err)
    //                     })
    //             })
    //         )
    //     }
    // }

    // postModelEntity(entity: string, data?: object, params?: object, additionalDispatchData?: object) {
    //     return (dispatch: Function) => {
    //         this.actions.POSTING_MODEL_ENTITY = `REQUESTING_${this.modelCaps}_${_.toUpper(entity)}`;
    //         this.actions.MODEL_ENTITY_POST_SUCCESS = `${this.modelCaps}_${_.toUpper(entity)}_SUCCESS`;
    //         dispatch({ type: this.actions.POSTING_MODEL_ENTITY });
    //         return (
    //             new Promise((resolve, reject) => {
    //                 utilities.request({
    //                     method: 'POST',
    //                     url: `${this.modelName}/${entity}`,
    //                     data,
    //                     params
    //                 }).then(
    //                     res => {
    //                         dispatch({ type: this.actions.MODEL_ENTITY_POST_SUCCESS, data: res.data, entity, additionalDispatchData })
    //                         resolve(res)
    //                     },
    //                     err => {
    //                         console.log('Error', err)
    //                         reject(err)
    //                     }
    //                 )
    //             })
    //         )
    //     }
    // }

}
