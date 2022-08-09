import { Location } from 'react-router-dom';
import { Buffer } from 'buffer';
import { IQuery } from '../services/HttpService';

export const calcPrice = (price: number, discount?: number): number => {
  let priceWithDiscount = price;
  if (discount) priceWithDiscount = (price * (100 - discount)) / 100;
  return Number(priceWithDiscount);
};

export const parsePrice = (price: number, discount?: number) => {
  return `$ ${calcPrice(price, discount).toFixed(2)}`;
};

export const parseRedirectUrl = (
  redirectTo: string,
  location: Location,
  options?: { message?: string; action?: string }
) => {
  let url = `${location.pathname}`;
  if (location.search || options?.action) {
    url += '?';
  }
  if (location.search) {
    url += `${location.search}`;
  }
  if (options?.action) {
    url += `&action=${options.action}`;
  }
  let redirect = `${redirectTo}?redirect=${Buffer.from(url).toString(
    'base64'
  )}`;
  //to decode: Buffer.from(base64Token, 'base64').toString('utf-8')}
  if (options?.message) {
    redirect += `&msg=${Buffer.from(options.message).toString('base64')}`;
  }

  return redirect;
};

export const parsePageQuery = (path: string, searchParams: URLSearchParams) => {
  const queryObj = {} as IQuery;

  let queryStr = '';
  searchParams.forEach((value, key) => {
    queryObj[key] = value;
    if (key !== 'page' && key !== 'pages') {
      queryStr += `&${key}=${value}`;
    }
  });

  return { str: `${path}?${queryStr}`, obj: queryObj };
};
