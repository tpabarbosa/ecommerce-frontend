import { UserAction, IUserAuth, IUser } from './user.interfaces';

const userReducer = (state: IUserAuth, action: UserAction) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, wishList: [], isLoggedIn: true, ...action.value };

    case 'CLEAR_USER': {
      return {
        ...state,
        wishList: [],
        isLoggedIn: false,
        user: {} as IUser,
        token: '',
      };
    }
    case 'SET_WISHLIST': {
      return { ...state, wishList: action.value };
    }
    case 'REMOVE_WISHLIST_PRODUCT': {
      return {
        ...state,
        wishList: state.wishList.filter(
          (product) => product.id !== action.value.id
        ),
      };
    }
    case 'ADD_WISHLIST_PRODUCT': {
      return {
        ...state,
        wishList: [...state.wishList, action.value],
      };
    }
    default:
      return state;
  }
};

export default userReducer;
