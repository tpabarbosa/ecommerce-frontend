import { createContext, useEffect, useReducer, useState } from 'react';
import reducer from './reducer';
import { useContext } from 'react';
import storage from '../../services/LocalStorageService';
import { IUserContext, UserRole, IUserAuth } from './user.interfaces';
import userHttp from '../../services/userHttp';
import { IProduct } from '../../models';

const UserContext = createContext<IUserContext | undefined>(undefined);

const emptyState: IUserAuth = {
  wishList: [] as IProduct[],
  isLoggedIn: false,
  token: '',
  user: {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    role: UserRole.GUEST,
  },
};

const verifyToken = async () => {
  const token = storage.get('token') as string;
  if (!token) {
    return false;
  }
  const user = await userHttp.verifyToken(token);
  if (user && user.status === 'success' && user.data !== false) {
    return { user: user.data, token };
  }
  return false;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, emptyState);

  const getWishList = async () => {
    const wishList = await userHttp.getWishList(state.user.id, state.token);

    if (wishList && wishList.status === 'success') {
      dispatch({ type: 'SET_WISHLIST', value: wishList.data });
    } else {
      dispatch({ type: 'SET_WISHLIST', value: [] });
    }
  };

  useEffect(() => {
    if (state.isLoggedIn && !isLoading) {
      getWishList();
    }
  }, [state.isLoggedIn, isLoading]);

  useEffect(() => {
    verifyToken()
      .then((user) => {
        setIsLoading(false);
        if (user) {
          dispatch({ type: 'SET_USER', value: user });
        } else {
          dispatch({ type: 'CLEAR_USER', value: emptyState });
        }
      })
      .catch(() => {
        dispatch({ type: 'CLEAR_USER', value: emptyState });
        setIsLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
        isLoading,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const hasRole = (roles: UserRole | UserRole[]) => {
    if (typeof roles === 'string') {
      return user.user.role === roles;
    }
    return roles.includes(user.user.role);
  };

  const login = async (email: string, password: string) => {
    if (user.isLoggedIn) return;
    const loggedUser = await userHttp.login({
      email,
      password,
    });
    if (loggedUser && loggedUser.status === 'success') {
      storage.set('token', loggedUser.data.token);
      user.dispatch({
        type: 'SET_USER',
        value: { user: loggedUser.data.user, token: loggedUser.data.token },
      });
      return;
    }
    return loggedUser && loggedUser.message;
  };

  const logout = () => {
    user.dispatch({ type: 'CLEAR_USER', value: emptyState });
    storage.set('token', '');
  };

  const assureIsLoggedIn = async () => {
    const hasToken = storage.get('token') !== '';
    if (!user.isLoggedIn && !user.isLoading && hasToken) {
      verifyToken().then((data) => {
        if (data) {
          user.dispatch({ type: 'SET_USER', value: data });
        } else {
          user.dispatch({ type: 'CLEAR_USER', value: emptyState });
        }
      });
    } else if (user.isLoggedIn && !hasToken) {
      user.dispatch({ type: 'CLEAR_USER', value: emptyState });
    }
  };

  const removeWishListProduct = async (product: IProduct) => {
    if (!user.isLoggedIn) return;
    const resp = await userHttp.removeWishListProduct(
      user.user.id,
      user.token,
      product.id
    );
    if (resp && resp.status === 'success') {
      user.dispatch({ type: 'REMOVE_WISHLIST_PRODUCT', value: product });
    }
  };

  const addWishListProduct = async (product: IProduct) => {
    if (!user.isLoggedIn) return;
    const resp = await userHttp.addWishListProduct(
      user.user.id,
      user.token,
      product.id
    );
    if (resp && resp.status === 'success') {
      user.dispatch({ type: 'ADD_WISHLIST_PRODUCT', value: product });
    }
  };

  const register = async (
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) => {
    const loggedUser = await userHttp.createUser({
      email,
      password,
      firstname,
      lastname,
    });
    if (loggedUser && loggedUser.status === 'success') {
      storage.set('token', loggedUser.data.token);
      user.dispatch({
        type: 'SET_USER',
        value: { user: loggedUser.data.user, token: loggedUser.data.token },
      });
      return;
    }
    return loggedUser && loggedUser.message;
  };

  const getReview = async (product_id: string) => {
    if (!user.isLoggedIn) return;
    const resp = await userHttp.getReview(user.user.id, user.token, product_id);
    if (resp && resp.status === 'success') {
      return resp.data;
    }
  };

  return {
    register,
    login,
    logout,
    ...user.user,
    isLoggedIn: user.isLoggedIn,
    hasRole,
    assureIsLoggedIn,
    token: user.token,
    isLoading: user.isLoading,
    wishList: user.wishList,
    removeWishListProduct,
    addWishListProduct,
    getReview,
  };
};

export default useUser;
