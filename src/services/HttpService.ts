export interface IErrorResponse {
  message: string;
  status: 'error';
  errors: any;
}

export interface ISuccessResponse<T> {
  message: string;
  status: 'success';
  data: T;
}

export interface IHttpResponse {
  message: string;
  data?: any;
  status: 'success' | 'error';
  errors?: any;
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

// const get = async <ReqBody>({
//   url,
//   query = undefined,
//   authorization = undefined,
// }: IOptions<ReqBody>): Promise<IHttpResponse> => {
//   const method = 'GET';
//   let urlStr = url;
//   let headers: HeadersInit = {
//     'Content-Type': 'application/json;charset=UTF-8',
//   };

//   if (authorization) {
//     headers = {
//       ...headers,
//       Authorization: `${authorization.key} ${authorization.value}`,
//     };
//   }

//   if (query) {
//     urlStr += `?${getQueryString(query)}`;
//   }

//   //   if (body) {
//   //     headers = { 'Content-Type': 'application/json;charset=UTF-8' };
//   //     bodyStr = JSON.stringify(body);
//   //   }

//   const result = await fetch(urlStr, { method, headers });
//   if (result.headers.get('content-type')?.includes('application/json')) {
//     return (await result.json()) as IHttpResponse;
//   }
//   return {} as IHttpResponse;
// };

// const put = async <ReqBody, RespSuccess>({
//   url,
//   query = undefined,
//   body = undefined,
//   authorization = undefined,
// }: IOptions<ReqBody>): Promise<RespSuccess | undefined> => {
//   const method = 'PUT';
//   let urlStr = url;
//   let headers: HeadersInit = {
//     'Content-Type': 'application/json;charset=UTF-8',
//   };
//   if (authorization) {
//     headers = {
//       ...headers,
//       Authorization: `${authorization.key} ${authorization.value}`,
//     };
//   }
//   let bodyStr = '';
//   if (query) {
//     urlStr += `?${getQueryString(query)}`;
//   }

//   if (body) {
//     bodyStr = JSON.stringify(body);
//   }

//   const result = await fetch(urlStr, { method, headers, body: bodyStr });
//   if (result.ok) {
//     if (result.headers.get('content-type')?.includes('application/json')) {
//       return (await result.json()) as RespSuccess;
//     }
//     return;
//   }
//   throw new Error(`Erro na solicitação: ${result.status} ${result.statusText}`);
// };

// const post = async <ReqBody>({
//   url,
//   query = undefined,
//   body = undefined,
//   authorization = undefined,
// }: IOptions<ReqBody>): Promise<IHttpResponse> => {
//   const method = 'POST';
//   let urlStr = url;
//   let headers: HeadersInit = {
//     'Content-Type': 'application/json;charset=UTF-8',
//   };
//   let bodyStr = '';

//   if (authorization) {
//     headers = {
//       ...headers,
//       Authorization: `${authorization.key} ${authorization.value}`,
//     };
//   }
//   if (query) {
//     urlStr += `?${getQueryString(query)}`;
//   }

//   if (body) {
//     bodyStr = JSON.stringify(body);
//   }

//   const result = await fetch(urlStr, { method, headers, body: bodyStr });

//   if (result.headers.get('content-type')?.includes('application/json')) {
//     return (await result.json()) as IHttpResponse;
//   }
//   return {} as IHttpResponse;
// };

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

  const result = await fetch(urlStr, {
    method,
    headers,
    ...(method !== Method.GET && { body: bodyStr }),
  });

  if (result.headers.get('content-type')?.includes('application/json')) {
    return (await result.json()) as IHttpResponse;
  }
  return {} as IHttpResponse;
};
// const request = { get, put, post };
export default request;
