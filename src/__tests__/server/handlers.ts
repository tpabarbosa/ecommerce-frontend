// import { rest } from 'msw';
// import { productsList, productDetails } from '../fakeData/products.fake';
// import { categoriesFromAPI } from '../fakeData/categories.fake';
// import { cart } from '../fakeData/cart.fake';
// import config from '../../config';
// const baseUrl = config.api.url;
// const userId = config.user;

export const handlers = [
  // Mock  get categories
  // rest.get(`${baseUrl}/products/categories`, (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(categoriesFromAPI));
  // }),
  // Mock  get fetuared products
  // rest.get(`${baseUrl}/products/featured`, (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(productsList));
  // }),
  // Mock  get product details
  // rest.get(
  //   `${baseUrl}/products/camisa-cruzeiro-centenario-I-21-22-torcedor-masculina-azul`,
  //   (req, res, ctx) => {
  //     return res(ctx.status(200), ctx.json(productDetails));
  //   }
  // ),
  // Mock  get user cart
  // rest.get(`${baseUrl}/users/${userId}/cart`, (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(cart));
  // }),
  // Mock put user cart
  // rest.put(`${baseUrl}/users/${userId}/cart`, (req, res, ctx) => {
  //   return res(ctx.status(204));
  // }),
  //   rest.get(
  //     'https://api.github.com/users/testusererror/repos',
  //     (req, res, ctx) => {
  //       return res(ctx.status(500), ctx.json([]));
  //     }
  //   ),
];
