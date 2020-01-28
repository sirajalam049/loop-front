import axios, { AxiosPromise, AxiosRequestConfig, AxiosError } from 'axios'

// Just a wrapper on axios, in case some other library is used in place of axios
const utils = {

    request: <T = {}>(config: AxiosRequestConfig, log = true): AxiosPromise => {
        if (!axios.defaults.baseURL) {
            throw new Error('Error: Loopfront Base Url is not provided');
        }
        if (log) {
            console.log("%c Request => ", "font-size: 12px; color: rgb(0, 204, 102); font-weight: bold", `${axios.defaults.baseURL}/${config.url}`);
            console.log("%c Config  => ", "font-size: 12px; color: rgb(51, 102, 255); font-weight: bold", config);
            axios.interceptors.response.use(res => {
                console.log("%c Request => ", "font-size: 12px; color: rgb(0, 204, 102); font-weight: bold", `${res.data}`);
                return res;
            })
        }
        return axios.request<T>(config)
    },

    setBaseAPI_URL: (url: string) => axios.defaults.baseURL = url,

    setHeader: (type = 'Content-Type', value = 'application/json') => axios.defaults.headers.post[type] = value,

    setAuthHeader: (access_token?: string) => axios.defaults.headers.common['Authorization'] = access_token,

    throwError: (error: AxiosError) => { console.log('Error', error.response); throw error }

}

export default utils