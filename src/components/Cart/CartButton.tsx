import { FaShoppingCart } from 'react-icons/fa';
import styled from 'styled-components';

import useCart from '../../contexts/Cart';

const Styled = {
  Wrapper: styled.div`
    position: relative;
  `,
  Button: styled.button`
    font-size: var(--xm);
    display: flex;
  `,
  ItemsCount: styled.span`
    font-size: var(--s);
    width: var(--xm);
    height: var(--xm);
    font-weight: bold;
    text-align: center;
    position: absolute;
    top: -10px;
    left: 50%;
    color: var(--btn-color);
    background-color: var(--btn-bg);
    padding: var(--xxs);
    border-radius: 50%;
    cursor: pointer;
  `,
};

type CartButtonProps = {
  onClick?: () => void;
};
const CartButton = ({ onClick }: CartButtonProps) => {
  const cart = useCart();

  return (
    <Styled.Wrapper onClick={onClick}>
      <Styled.Button>
        <FaShoppingCart />
      </Styled.Button>
      <Styled.ItemsCount>{cart.items.length}</Styled.ItemsCount>
    </Styled.Wrapper>
  );
};

export default CartButton;
