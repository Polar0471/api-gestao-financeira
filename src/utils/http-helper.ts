import HttpResponse from "../models/http-model";

export const ok = async (data: any): Promise<HttpResponse> => {
    return {
        statusCode: 200,
        body: data
    }
}

export const created = async (): Promise<HttpResponse> => {
    return {
        statusCode: 201,
        body: "created"
    }
}

export const noContent = async (): Promise<HttpResponse> => {
    return {
        statusCode: 204,
        body: "no content"
    }
}

export const badRequest = async (message: string): Promise<HttpResponse> => {
    return {
        statusCode: 400,
        body: { error: message }
    };
}

export const unauThorized = async (data: any): Promise<HttpResponse> => {
    return {
        statusCode: 401,
        body: data
    }
}