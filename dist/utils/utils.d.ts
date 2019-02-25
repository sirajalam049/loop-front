declare const utils: {
    request: (config: {
        url: string;
        params?: object | undefined;
        method?: "GET" | "POST" | "UPDATE" | "DELETE" | "PUT" | "PATCH" | undefined;
        data?: object | undefined;
    }) => import("axios").AxiosPromise<{}>;
    setBaseAPI_URL: (url: string) => string;
    setHeader: (type?: string, value?: string) => string;
    throwError: (error: any) => never;
};
export default utils;
