import { createContext, useEffect, useReducer, useState } from 'react';
import reducer from './reducer';
import { useContext } from 'react';
import { IProduct } from '../../models';

import { ICart, ICartContext, ICartProduct } from './cart.interfaces';
import cartHttp from '../../services/cartHttp';
import useUser from '../User';

const CartContext = createContext<ICartContext | undefined>(undefined);

const emptyState: ICart = {
  total: 0,
  items: [] as ICartProduct[],
};

const initialState = async (user_id: string, token: string) => {
  const cart = await cartHttp.getCart(user_id, token);
  if (cart && cart.status === 'success') {
    return cart.data;
  }

  return false;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, emptyState);

  useEffect(() => {
    if (isLoading && user.isLoggedIn && !user.isLoading) {
      initialState(user.id, user.token)
        .then((cart) => {
          setIsLoading(false);
          if (cart !== false) {
            dispatch({ type: 'SET_CART', value: cart });
          } else {
            dispatch({ type: 'SET_CART', value: emptyState });
          }
        })
        .catch(() => {
          dispatch({ type: 'SET_CART', value: emptyState });
          setIsLoading(false);
        });
    }
  }, [user, isLoading]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const cart = useContext(CartContext);
  const user = useUser();
  if (!cart) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const addProduct = async (product: IProduct, size_id?: string) => {
    if (!user.isLoggedIn) return;
    const resp = await cartHttp.addItem(
      user.id,
      user.token,
      product.id,
      size_id
    );
    if (resp && resp.status === 'success') {
      cart.dispatch({
        type: 'ADD_PRODUCT',
        value: { product, size: resp.data.size, item_id: resp.data.item_id },
      });
    }
  };

  const removeProduct = async (item_id: string) => {
    if (!user.isLoggedIn) return;
    const resp = await cartHttp.removeItem(user.id, user.token, item_id);
    if (resp && resp.status === 'success') {
      cart.dispatch({ type: 'REMOVE_PRODUCT', value: item_id });
    }
  };

  const setItemSize = async (item: ICartProduct, size_id: string) => {
    if (!user.isLoggedIn) return;
    const resp = await cartHttp.updateItem(user.id, user.token, item.item_id, {
      size_id,
    });
    if (resp && resp.status === 'success') {
      cart.dispatch({
        type: 'SET_SIZE_TO_PRODUCT',
        value: { id: item.item_id, size: resp.data.size },
      });
    }
  };

  const setItemQuantity = async (item: ICartProduct, quantity: number) => {
    if (!user.isLoggedIn) return;
    const resp = await cartHttp.updateItem(user.id, user.token, item.item_id, {
      quantity,
    });
    if (resp && resp.status === 'success') {
      cart.dispatch({
        type: 'SET_QUANTITY_TO_PRODUCT',
        value: { id: item.item_id, quantity },
      });
    }
  };

  const increaseItemQuantity = async (item: ICartProduct) => {
    if (!user.isLoggedIn) return;
    const resp = await cartHttp.updateItem(user.id, user.token, item.item_id, {
      quantity: item.quantity + 1,
    });
    if (resp && resp.status === 'success') {
      cart.dispatch({ type: 'ADD_ITEM_TO_PRODUCT', value: item.item_id });
    }
  };

  const decreaseItemQuantity = async (item: ICartProduct) => {
    if (!user.isLoggedIn) return;
    const resp = await cartHttp.updateItem(user.id, user.token, item.item_id, {
      quantity: item.quantity - 1,
    });
    if (resp && resp.status === 'success') {
      cart.dispatch({
        type: 'REMOVE_ITEM_FROM_PRODUCT',
        value: item.item_id,
      });
    }
  };

  const clear = async () => {
    if (!user.isLoggedIn) return;
    const resp = await cartHttp.clearCart(user.id, user.token);
    if (resp && resp.status === 'success') {
      cart.dispatch({ type: 'SET_CART', value: emptyState });
    }
  };

  return {
    addProduct,
    removeProduct,
    increaseItemQuantity,
    decreaseItemQuantity,
    setItemSize,
    setItemQuantity,
    clear,
    items: cart.items,
    total: cart.total,
  };
};

export default useCart;
