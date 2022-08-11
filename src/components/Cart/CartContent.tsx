import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useCart from '../../contexts/Cart';
import { ThemeStyled } from '../../contexts/Theme/themeCSS.styles';
import { parsePrice } from '../../helpers/parsers';

import CartItem from './CartItem';

const Styled = {
  Wrapper: styled.div``,
  ProductsWrapper: styled.div`
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  `,
  Count: styled.h3`
    margin: var(--m) auto;
    font-weight: bold;
    text-align: center;
    margin-bottom: var(--s);
    max-width: 250px;

    p {
      font-size: var(--l);
    }
  `,
  OrderWrapper: styled(ThemeStyled.Box).attrs({ type: 'secondary' })`
    padding: var(--l);
    margin: 0 auto;
    margin-top: var(--xl);
    width: 100%;
    max-width: 800px;
    border: 1px solid var(--p-color);
    box-shadow: 0 2px 5px 0px var(--p-color);
  `,
  SubValue: styled.div`
    font-size: var(--l);
    padding: var(--xs);
    width: 100%;
    display: flex;
    justify-content: space-between;
    strong {
    }
    span {
      text-align: right;
    }
  `,
  Total: styled.div`
    font-size: var(--xl);
    padding: var(--m) var(--xs);
    text-align: right;
  `,
};
const CartContent = () => {
  const cart = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    navigate('/user/checkout');
  };

  return (
    <Styled.Wrapper>
      <ThemeStyled.Title>Shopping Cart</ThemeStyled.Title>
      {cart.items.length > 0 && (
        <>
          <Styled.ProductsWrapper>
            {cart.items.length > 0 &&
              cart.items.map((item) => (
                <CartItem key={item.item_id} item={item} />
              ))}
          </Styled.ProductsWrapper>
          <Styled.OrderWrapper>
            <Styled.SubValue>
              <strong>Subtotal: </strong>
              <span>{parsePrice(cart.total)}</span>
            </Styled.SubValue>
            <Styled.SubValue>
              <strong>Shipping: </strong>
              <span>$ 0.00</span>
            </Styled.SubValue>
            <Styled.SubValue>
              <strong>Tax: </strong>
              <span>$ 0.00</span>
            </Styled.SubValue>
            <ThemeStyled.Separator />
            <Styled.Total>
              <strong>Total: </strong>
              <strong>{parsePrice(cart.total)}</strong>
            </Styled.Total>
            <ThemeStyled.TextButton onClick={handleCheckout}>
              Checkout
            </ThemeStyled.TextButton>
          </Styled.OrderWrapper>
        </>
      )}
      <Styled.Count>
        <p>
          {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}
        </p>
        {cart.items.length > 0 && (
          <span>
            <ThemeStyled.TextButton onClick={() => cart.clear()}>
              Clear Cart
            </ThemeStyled.TextButton>
          </span>
        )}
      </Styled.Count>
    </Styled.Wrapper>
  );
};

export default CartContent;
