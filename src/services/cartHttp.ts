import {
  ICart,
  ICartProduct,
  IUpdateCartItem,
} from '../contexts/Cart/cart.interfaces';
import request, {
  bearerHeader,
  IErrorResponse,
  ISuccessResponse,
  Method,
} from './HttpService';
import config from '../config';
import { ISize } from '../models';
const baseUrl = config.api.url;

const getCart = async (user_id: string, token: string) => {
  const url = `${baseUrl}/users/${user_id}/cart`;
  const authorization = bearerHeader(token);
  try {
    const resp = await request({
      url,
      authorization,
    });
    if (resp.status === 'success') {
      return resp as ISuccessResponse<ICart>;
    }

    return resp as IErrorResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addItem = async (
  user_id: string,
  token: string,
  product_id: string,
  size_id?: string
) => {
  const url = `${baseUrl}/users/${user_id}/cart`;
  const authorization = bearerHeader(token);
  const method = Method.POST;
  const body = { product_id, size_id };

  const resp = await request({
    url,
    method,
    authorization,
    body,
  });
  if (resp.status === 'success') {
    return resp as ISuccessResponse<{
      item_id: string;
      size: ISize | null;
    }>;
  }

  return resp as IErrorResponse;
};

const removeItem = async (user_id: string, token: string, item_id: string) => {
  const url = `${baseUrl}/users/${user_id}/cart/${item_id}`;
  const authorization = bearerHeader(token);
  const method = Method.DELETE;

  const resp = await request({
    url,
    method,
    authorization,
  });
  if (resp.status === 'success') {
    return resp as ISuccessResponse<undefined>;
  }

  return resp as IErrorResponse;
};

const updateItem = async (
  user_id: string,
  token: string,
  item_id: string,
  body: IUpdateCartItem
) => {
  const url = `${baseUrl}/users/${user_id}/cart/${item_id}`;
  const authorization = bearerHeader(token);
  const method = Method.PUT;

  const resp = await request({
    url,
    method,
    authorization,
    body,
  });
  if (resp.status === 'success') {
    return resp as ISuccessResponse<ICartProduct>;
  }

  return resp as IErrorResponse;
};

const clearCart = async (user_id: string, token: string) => {
  const url = `${baseUrl}/users/${user_id}/cart`;
  const authorization = bearerHeader(token);
  const method = Method.DELETE;

  const resp = await request({
    url,
    method,
    authorization,
  });
  if (resp.status === 'success') {
    return resp as ISuccessResponse<undefined>;
  }

  return resp as IErrorResponse;
};

const cart = { getCart, addItem, removeItem, updateItem, clearCart };

export default cart;
