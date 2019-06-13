import { TRequestConfig } from "../LoopFront";
declare const utils: {
    request: <T = {}>(config: TRequestConfig) => import("axios").AxiosPromise<{}>;
    setBaseAPI_URL: (url: string) => string;
    setHeader: (type?: string, value?: string) => string;
    setAuthHeader: (access_token?: string | undefined) => string | undefined;
    throwError: (error: any) => never;
};
export default utils;
