import { TMethod } from "../LoopFront";
import axios from 'axios'

// Just a wrapper on axios, in case some other library is used in place of axios
const utils = {

    request: (config: { url: string, params?: object, method?: TMethod, data?: object }): ReturnType<typeof axios.request> => axios.request(config),

    setBaseAPI_URL: (url: string) => axios.defaults.baseURL = url,

    setHeader: (type = 'Content-Type', value = 'application/json') => axios.defaults.headers.post[type] = value,

    setAuthHeader: (access_token?: string) => axios.defaults.headers.common['Authorization'] = access_token,

    throwError: (error: any) => { console.log('Error', error); throw error }

}

export default utils