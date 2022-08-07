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
  message?: string
) => {
  let redirect = `${redirectTo}?redirect="${location.pathname}`;
  if (location.search) {
    redirect += `?${location.search}`;
  }

  //to decode: Buffer.from(base64Token, 'base64').toString('utf-8')
  if (message) {
    redirect += `&msg=${Buffer.from(message).toString('base64')}`;
  }
  redirect += `"`;
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
