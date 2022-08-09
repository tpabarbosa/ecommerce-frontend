import { IProduct } from '../../models';
import { CartAction, ICart } from './cart.interfaces';

const calcPrice = (product: IProduct) => {
  const discount = product.sale?.discount;
  let price = product.price;
  if (discount) {
    price = (price * (100 - discount)) / 100;
  }
  return Math.round(price * 100) / 100;
};

const cartReducer = (state: ICart, action: CartAction): ICart => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      //if product already exists in cart, add 1 to quantity
      const item = state.items.find(
        (p) =>
          p.product.id === action.value.product.id &&
          p.size === action.value.size
      );
      if (item) {
        return {
          ...state,
          total: state.total + calcPrice(item.product),
          items: state.items.map((p) =>
            p.product.id === action.value.product.id
              ? {
                  ...p,
                  quantity: p.quantity + 1,
                }
              : p
          ),
        };
      }
      //else add product to cart
      return {
        ...state,
        total: state.total + calcPrice(action.value.product),
        items: [
          ...state.items,
          {
            item_id: action.value.item_id,
            quantity: 1,
            size: action.value.size ?? null,
            product: { ...action.value.product },
          },
        ],
      };

    case 'REMOVE_PRODUCT':
      // if product does not exist in cart, do nothing
      const productToRemove = state.items.find(
        (p) => p.item_id === action.value
      );
      if (!productToRemove) {
        return state;
      }
      //else remove product from cart
      return {
        ...state,
        total:
          state.total -
          calcPrice(productToRemove.product) * productToRemove.quantity,
        items: state.items.filter((p) => !(p.item_id === action.value)),
      };

    case 'ADD_ITEM_TO_PRODUCT':
      // if product does not exist in cart, do nothing
      const productToAddItem = state.items.find(
        (p) => p.item_id === action.value
      );
      if (!productToAddItem) {
        return state;
      }
      //else add 1 to quantity
      return {
        ...state,
        total: state.total + calcPrice(productToAddItem.product),
        items: state.items.map((p) =>
          p.item_id === action.value ? { ...p, quantity: p.quantity + 1 } : p
        ),
      };
    case 'REMOVE_ITEM_FROM_PRODUCT':
      // if product does not exist in cart, do nothing
      const productToRemoveItem = state.items.find(
        (p) => p.item_id === action.value
      );
      if (!productToRemoveItem) {
        return state;
      }
      // if product quantity is equal 1, remove product from cart
      if (productToRemoveItem.quantity === 1) {
        return {
          ...state,
          total: state.total - calcPrice(productToRemoveItem.product),
          items: state.items.filter((p) => !(p.item_id === action.value)),
        };
      }
      //else decrease quantity from cart
      return {
        ...state,
        total: state.total - calcPrice(productToRemoveItem.product),
        items: state.items.map((p) =>
          p.item_id === action.value ? { ...p, quantity: p.quantity - 1 } : p
        ),
      };

    case 'SET_SIZE_TO_PRODUCT':
      // if product does not exist in cart, do nothing
      const productToSetSize = state.items.find(
        (p) => p.item_id === action.value.id
      );
      if (!productToSetSize) {
        return state;
      }
      //else set size to product
      return {
        ...state,
        items: state.items.map((p) => {
          return p.item_id === action.value.id
            ? { ...p, size: action.value.size }
            : p;
        }),
      };

    case 'SET_QUANTITY_TO_PRODUCT':
      // if product does not exist in cart, do nothing
      const productToSetQuantity = state.items.find(
        (p) => p.item_id === action.value.id
      );
      if (!productToSetQuantity) {
        return state;
      }
      const diff = productToSetQuantity.quantity - action.value.quantity;
      //else set quantity to product

      return {
        ...state,
        total: state.total - diff * calcPrice(productToSetQuantity.product),
        items: state.items.map((p) => {
          return p.item_id === action.value.id
            ? { ...p, quantity: action.value.quantity }
            : p;
        }),
      };
    case 'SET_CART':
      return { ...action.value };
    default:
      return state;
  }
};

export default cartReducer;
