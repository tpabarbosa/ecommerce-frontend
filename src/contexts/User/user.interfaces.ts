import { IProduct } from '../../models';

export interface IUserContext extends IUserAuth {
  isLoading: boolean;
  dispatch: React.Dispatch<UserAction>;
}

export interface IUserProduct {
  id: string;
  quantity: number;
  size: null | string;
  item: IProduct;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
}

export interface IUserAuth extends IUserWithToken {
  isLoggedIn: boolean;
  wishList: IProduct[];
}

export interface IUserWithToken {
  user: IUser;
  token: string;
}

export type UserAction =
  | { type: 'SET_USER'; value: IUserWithToken }
  | {
      type: 'CLEAR_USER';
      value: IUserWithToken;
    }
  | { type: 'SET_WISHLIST'; value: IProduct[] }
  | { type: 'REMOVE_WISHLIST_PRODUCT'; value: IProduct }
  | { type: 'ADD_WISHLIST_PRODUCT'; value: IProduct };
