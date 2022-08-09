import { ICategory } from '../models/categories';
import request, { IErrorResponse, ISuccessResponse } from './HttpService';
import config from '../config';
const baseUrl = config.api.url;

const getAll = async () => {
  const url = `${baseUrl}/products/categories`;

  const resp = await request({ url });
  if (resp.status === 'success') {
    return resp as ISuccessResponse<ICategory[]>;
  }

  return resp as IErrorResponse;
};

const categories = { getAll };

export default categories;
