import { IProductsList, IProductDetails, IReviewsList } from '../models';
import request, {
  IErrorResponse,
  IQuery,
  ISuccessResponse,
} from './HttpService';
import config from '../config';
const baseUrl = config.api.url;

const getFeatured = async () => {
  const url = `${baseUrl}/products?limit=12&orderBy=price:desc`;
  try {
    const resp = await request({ url });
    if (resp.status === 'success') {
      return resp as ISuccessResponse<IProductsList>;
    }

    return resp as IErrorResponse;
  } catch (error) {
    console.error(error);
    return {} as ISuccessResponse<IProductsList>;
  }
};

const getProducts = async (query?: IQuery) => {
  const url = `${baseUrl}/products`;
  try {
    const resp = await request({ url, query });
    if (resp.status === 'success') {
      return resp as ISuccessResponse<IProductsList>;
    }

    return resp as IErrorResponse;
  } catch (error) {
    console.error(error);
    return {} as ISuccessResponse<IProductsList>;
  }
};

const getDetails = async (slug: string) => {
  const url = `${baseUrl}/products/slugs/${slug}`;
  try {
    const resp = await request({ url });
    if (resp.status === 'success') {
      return resp as ISuccessResponse<IProductDetails>;
    }

    return resp as IErrorResponse;
  } catch (error) {
    console.error(error);
    return {} as ISuccessResponse<IProductDetails>;
  }
};

const getReviews = async (product_id: string, query?: IQuery) => {
  const url = `${baseUrl}/products/${product_id}/reviews`;
  try {
    const resp = await request({ url, query });
    if (resp.status === 'success') {
      return resp as ISuccessResponse<IReviewsList>;
    }

    return resp as IErrorResponse;
  } catch (error) {
    console.error(error);
    return {} as ISuccessResponse<IReviewsList>;
  }
};

const getCategoryProducts = async (category_slug: string, query?: IQuery) => {
  const url = `${baseUrl}/products/categories/slugs/${category_slug}`;
  try {
    const resp = await request({ url, query });
    if (resp.status === 'success') {
      return resp as ISuccessResponse<IProductsList>;
    }

    return resp as IErrorResponse;
  } catch (error) {
    console.error(error);
    return {} as ISuccessResponse<IProductsList>;
  }
};

const products = {
  getFeatured,
  getDetails,
  getReviews,
  getCategoryProducts,
  getProducts,
};

export default products;
