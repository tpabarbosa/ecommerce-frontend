import { IProduct, ISize } from '../../models';

export interface ICartContext extends ICart {
  dispatch: React.Dispatch<CartAction>;
}

export interface ICartProduct {
  item_id: string;
  quantity: number;
  size: null | ISize;
  product: IProduct;
}

export interface ICart {
  total: number;
  items: ICartProduct[];
}

export interface IUpdateCartItem {
  quantity?: number;
  size_id?: string;
}

export type CartAction =
  | {
      type: 'ADD_PRODUCT';
      value: { product: IProduct; size: ISize | null; item_id: string };
    }
  | {
      type: 'REMOVE_PRODUCT';
      value: string;
    }
  | {
      type: 'ADD_ITEM_TO_PRODUCT';
      value: string;
    }
  | {
      type: 'REMOVE_ITEM_FROM_PRODUCT';
      value: string;
    }
  | { type: 'SET_SIZE_TO_PRODUCT'; value: { id: string; size: ISize | null } }
  | { type: 'SET_QUANTITY_TO_PRODUCT'; value: { id: string; quantity: number } }
  | { type: 'SET_CART'; value: ICart };
