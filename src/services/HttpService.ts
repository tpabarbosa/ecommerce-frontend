export interface IErrorResponse {
  message: string;
  status: 'error';
  errors: any;
  statusCode: number;
}

export interface ISuccessResponse<T> {
  message: string;
  status: 'success';
  data: T;
  statusCode: number;
}

export interface IHttpResponse {
  message: string;
  data?: any;
  status: 'success' | 'error';
  errors?: any;
  statusCode?: number;
}

export interface IQuery {
  [key: string]: string | number;
}

export type AuthorizationHeaderKey = 'Basic' | 'Bearer';

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface IOptions<T> {
  url: string;
  query?: IQuery;
  body?: T;
  authorization?: { key: AuthorizationHeaderKey; value: string };
  method?: Method;
}

const getQueryString = (query: { [key: string]: string | number }) => {
  let queryString = '';
  for (let key in query) {
    queryString += `&${key}=${query[key]}`;
  }
  return queryString;
};

export const bearerHeader = (token: string) => {
  return {
    key: 'Bearer' as AuthorizationHeaderKey,
    value: token,
  };
};

export const errorResponse = (error: unknown): IErrorResponse => {
  const err = error as Error;
  return {
    status: 'error',
    statusCode: 500,
    message: `Unexpected error${
      process.env.NODE_ENV === 'development' ? ': ' + err.message : ''
    }`,
  } as IErrorResponse;
};

const request = async <ReqBody>({
  url,
  method = Method.GET,
  query = undefined,
  body = undefined,
  authorization = undefined,
}: IOptions<ReqBody>): Promise<IHttpResponse> => {
  let urlStr = url;
  let headers: HeadersInit = {
    'Content-Type': 'application/json;charset=UTF-8',
  };
  let bodyStr = '';

  if (authorization) {
    headers = {
      ...headers,
      Authorization: `${authorization.key} ${authorization.value}`,
    };
  }
  if (query) {
    urlStr += `?${getQueryString(query)}`;
  }

  if (body) {
    bodyStr = JSON.stringify(body);
  }

  try {
    const result = await fetch(urlStr, {
      method,
      headers,
      ...(method !== Method.GET && { body: bodyStr }),
    });

    if (result.headers.get('content-type')?.includes('application/json')) {
      const json = await result.json();
      return { ...json, statusCode: result.status } as IHttpResponse;
    }
    return { statusCode: result.status } as IHttpResponse;
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }
    return errorResponse(err);
  }
};

export default request;
