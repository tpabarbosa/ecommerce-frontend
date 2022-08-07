import {
  FaUserCircle,
  FaSignInAlt,
  FaHome,
  FaSignOutAlt,
  FaBookmark,
} from 'react-icons/fa';
import styled from 'styled-components';
import { ICategory } from '../../../../models/categories';
import { ThemeStyled } from '../../../../contexts/Theme/themeCSS.styles';

import LinkItem from './LinkItem';
import CartButton from '../../../Cart/CartButton';
import Modal from '../../Modal';
import { IUseModal } from '../../Modal/useModal';
import { useEffect, useState } from 'react';
import categoriesHttp from '../../../../services/categoriesHttp';
import useUser from '../../../../contexts/User';

const Styled = {
  MenuBox: styled(ThemeStyled.Box).attrs({ as: 'nav', type: 'tertiary' })`
    width: 80vw;
    overflow-y: auto;
    max-width: 600px;
    padding: var(--xs) var(--m);
    z-index: 2;
    transform: translateX(-100%);
    transition: transform 0.4s;

    strong {
      font-size: var(--xm);
      margin: var(--m) var(--xs);
      line-height: var(--xl);
    }

    &.active {
      transform: none;
    }
  `,
};

type MenuModalProps = {
  modal: IUseModal;
};

const MenuModal = ({ modal }: MenuModalProps) => {
  const user = useUser();
  const { isOpen } = modal;
  const [categories, setCategories] = useState<ICategory[]>();
  const getCategories = async () => {
    const resp = await categoriesHttp.getAll();
    if (resp && resp.status === 'success') {
      setCategories(resp.data);
    } else {
      setCategories([] as ICategory[]);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Modal modal={modal}>
      <Styled.MenuBox className={isOpen ? 'active' : ''}>
        <LinkItem to={`/`} text="Home" icon={<FaHome />} />
        <ThemeStyled.Separator />
        <strong>Categories</strong>
        {categories &&
          categories.length > 0 &&
          categories.map((category) => (
            <LinkItem
              key={category.slug}
              to={`/products/${category.slug}`}
              text={category.name}
            />
          ))}
        <ThemeStyled.Separator />
        <div>
          {user.isLoggedIn ? (
            <>
              <LinkItem to="/user" text="My Account" icon={<FaUserCircle />} />
              <LinkItem
                to="/user/wishlist"
                text="Favorites List"
                icon={<FaBookmark />}
              />
              <LinkItem
                to="/user/cart"
                text="Shopping Cart"
                icon={<CartButton />}
              />
              <LinkItem to="/logout" text="Logout" icon={<FaSignOutAlt />} />
            </>
          ) : (
            <LinkItem to="/login" text="Login" icon={<FaSignInAlt />} />
          )}
        </div>
      </Styled.MenuBox>
    </Modal>
  );
};

export default MenuModal;
