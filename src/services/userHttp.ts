import { IUser, IUserAuth } from '../contexts/User/user.interfaces';
import request, {
  AuthorizationHeaderKey,
  bearerHeader,
  IErrorResponse,
  ISuccessResponse,
  Method,
} from './HttpService';
import config from '../config';
import { Buffer } from 'buffer';
import { IProduct, IReview } from '../models';
const baseUrl = config.api.url;

const getUser = async (user: IUserAuth) => {
  const url = `${baseUrl}/users/${user.user.id}`;
  const authorization = bearerHeader(user.token);

  const resp = await request({
    url,
    authorization,
  });
  if (resp.status === 'success') {
    return resp as ISuccessResponse<ILoginResponse>;
  }

  return resp as IErrorResponse;
};

interface LoginRequest {
  email: string;
  password: string;
}
export interface ILoginResponse {
  token: string;
  user: IUser;
}

interface CreateUserRequest {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

const login = async (credentials: LoginRequest) => {
  const url = `${baseUrl}/auth/login`;
  const authorization = {
    key: 'Basic' as AuthorizationHeaderKey,
    value: Buffer.from(`${credentials.email}:${credentials.password}`).toString(
      'base64'
    ),
  };
  const method = Method.POST;
  const resp = await request({
    url,
    method,
    authorization,
  });

  if (resp.status === 'success') {
    return resp as ISuccessResponse<ILoginResponse>;
  }

  return resp as IErrorResponse;
};

const createUser = async (user: CreateUserRequest) => {
  const url = `${baseUrl}/users`;
  const body = user;
  const method = Method.POST;

  const resp = await request({
    url,
    method,
    body,
  });
  if (resp.status === 'success') {
    return resp as ISuccessResponse<ILoginResponse>;
  }

  return resp as IErrorResponse;
};

const verifyToken = async (token: string) => {
  const url = `${baseUrl}/auth/verify-token/${token}`;

  const resp = await request({
    url,
  });
  if (resp.status === 'success') {
    return resp as ISuccessResponse<IUser | false>;
  }

  return resp as IErrorResponse;
};

const getWishList = async (user_id: string, token: string) => {
  const url = `${baseUrl}/users/${user_id}/wishlist`;
  const authorization = bearerHeader(token);

  const resp = await request({
    url,
    authorization,
  });
  if (resp.status === 'success') {
    return resp as ISuccessResponse<IProduct[]>;
  }

  return resp as IErrorResponse;
};

const removeWishListProduct = async (
  user_id: string,
  token: string,
  product_id: string
) => {
  const url = `${baseUrl}/users/${user_id}/wishlist/${product_id}`;
  const authorization = bearerHeader(token);
  const method = Method.DELETE;

  const resp = await request({
    url,
    method,
    authorization,
  });
  if (resp.status === 'success') {
    return resp as ISuccessResponse<IProduct[]>;
  }

  return resp as IErrorResponse;
};

const addWishListProduct = async (
  user_id: string,
  token: string,
  product_id: string
) => {
  const url = `${baseUrl}/users/${user_id}/wishlist`;
  const authorization = bearerHeader(token);
  const method = Method.POST;
  const body = { product_id };

  const resp = await request({
    url,
    method,
    authorization,
    body,
  });
  if (resp.status === 'success') {
    return resp as ISuccessResponse<IProduct[]>;
  }

  return resp as IErrorResponse;
};

const getReview = async (
  user_id: string,
  token: string,
  product_id: string
) => {
  const url = `${baseUrl}/users/${user_id}/reviews/${product_id}`;
  const authorization = bearerHeader(token);
  const method = Method.GET;

  const resp = await request({
    url,
    method,
    authorization,
  });
  if (resp.status === 'success') {
    return resp as ISuccessResponse<IReview | null>;
  }

  return resp as IErrorResponse;
};

const user = {
  getUser,
  login,
  createUser,
  verifyToken,
  getWishList,
  removeWishListProduct,
  addWishListProduct,
  getReview,
};

export default user;
