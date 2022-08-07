import { useEffect, useState } from 'react';

import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import AddToCartButton from '../../../components/Cart/AddToCartButton';
import IncreaseDecreaseQuantity from '../../../components/Cart/IncreaseDecreaseQuantity';
import Sizes from '../../../components/Cart/Sizes';
import useCart from '../../../contexts/Cart';
import { ICartProduct } from '../../../contexts/Cart/cart.interfaces';
import { ThemeStyled } from '../../../contexts/Theme/themeCSS.styles';
import { parsePageQuery, parsePrice } from '../../../helpers/parsers';
import { IProductDetails, IReviewsList } from '../../../models';
import { IQuery } from '../../../services/HttpService';
import productsHttp from '../../../services/produtcsHttp';
import Banner from '../../Home/Banner';
import FixedRatingStars from './FixedRatingStars';
import ImagesDisplayer from './ImagesDisplayer';
import Reviews from './Reviews';

const Styled = {
  Wrapper: styled.div`
    margin: var(--xl) auto;
  `,
  Header: styled.header`
    display: flex;
    flex-direction: column;
    padding: 0 var(--m);
    gap: var(--xm);

    @media (min-width: 720px) {
      flex-direction: row;
    }
  `,
  ImagesWrapper: styled.div`
    flex: 1;
  `,
  ProductWrapper: styled.div`
    flex: 1.5;
  `,
  Title: styled.h3`
    font-size: var(--xl);
    font-weight: bold;
  `,
  Block: styled.div`
    margin: calc(2 * var(--xxl));
    font-size: var(--xm);

    p {
      margin: var(--l);
    }
  `,
  Price: styled.div`
    padding: var(--m);
    display: flex;
    justify-content: space-between;
    text-align: center;
    flex-wrap: wrap;

    div {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding-top: var(--m);
    }
    del {
      font-size: var(--l);
      font-style: italic;
      padding: var(--xs) var(--m);
    }

    span {
      font-size: var(--xl);
      font-weight: bold;
    }

    img {
      width: calc(2.5 * var(--xxl));
      /* position: absolute; */
      top: 25%;
      left: 0;
      transform: rotate(-15deg);
    }

    @media (min-width: 520px) {
      margin: 0 calc(2 * var(--l));
    }

    @media (min-width: 960px) {
      margin: 0 calc(2 * var(--xxl));
    }
  `,
};

const ProductDetails = () => {
  const [product, setProduct] = useState<IProductDetails>();
  const [reviews, setReviews] = useState<IReviewsList>();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [baseUrl, setBaseUrl] = useState('');
  const location = useLocation();
  // const [currentQuantity, setCurrentQuantity] = useState(1);
  const cart = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const [cartItem, setCartItem] = useState<ICartProduct>();

  const getDetails = async () => {
    if (params && params.productSlug) {
      const resp = await productsHttp.getDetails(params.productSlug);
      if (resp && resp.status === 'success') {
        setProduct(resp.data);

        const cartProduct = cart.items.find(
          (p) => p.product.id === resp.data.id
        );
        if (cartProduct) {
          setIsInCart(true);
          setCartItem(cartProduct);
          // setCurrentQuantity(cartProduct.quantity);
        }
      }
    }
  };

  const getReviews = async (queryObj?: IQuery) => {
    if (product && product.id) {
      const resp = await productsHttp.getReviews(product.id, queryObj);
      if (resp && resp.status === 'success') {
        setReviews(resp.data);
      } else {
        setReviews(undefined);
      }
    }
  };

  useEffect(() => {
    if (product) {
      const cartProduct = cart.items.find((p) => p.product.id === product.id);
      if (cartProduct) {
        setIsInCart(true);
        setCartItem(cartProduct);
      } else {
        setIsInCart(false);
        setCartItem(undefined);
      }
    }
  }, [cart, product]);

  useEffect(() => {
    const parsedQuery = parsePageQuery(`${location.pathname}`, searchParams);

    if (parsedQuery.str !== baseUrl) {
      setBaseUrl(parsedQuery.str);
    }
    getReviews(parsedQuery.obj);
  }, [product]);

  useEffect(() => {
    getDetails();
  }, [params]);

  return (
    <Styled.Wrapper>
      {product && (
        <>
          <Styled.Header>
            <Styled.ImagesWrapper>
              <ImagesDisplayer images={product.photos} />
            </Styled.ImagesWrapper>

            <Styled.ProductWrapper>
              <Styled.Title>{product.name}</Styled.Title>
              <div>
                {reviews && (
                  <FixedRatingStars
                    value={reviews.average_rate}
                    count={reviews.count}
                  />
                )}
                <Styled.Price>
                  {product.sale === undefined && (
                    <span>{parsePrice(product.price)}</span>
                  )}
                  {product.sale !== undefined && (
                    <>
                      <img
                        src={`/${product.sale?.badge}`}
                        alt={product.sale?.campaing}
                      />
                      <div>
                        <span>
                          {parsePrice(product.price, product.sale?.discount)}
                        </span>
                        <del>{parsePrice(product.price)} </del>
                      </div>
                    </>
                  )}
                </Styled.Price>
                <ThemeStyled.Separator />
              </div>
              {!isInCart && <AddToCartButton product={product} />}
              {isInCart && cartItem && (
                <>
                  <div>
                    <Sizes item={cartItem} />
                    <IncreaseDecreaseQuantity
                      onIncrease={() => cart.increaseItemQuantity(cartItem)}
                      onDecrease={() => cart.decreaseItemQuantity(cartItem)}
                      onChange={(val: number) =>
                        cart.setItemQuantity(cartItem, val)
                      }
                      value={cartItem.quantity}
                    />
                  </div>

                  <ThemeStyled.TextButton
                    onClick={() => cart.removeProduct(cartItem.item_id)}
                  >
                    Remove from Cart
                  </ThemeStyled.TextButton>
                </>
              )}
            </Styled.ProductWrapper>
          </Styled.Header>

          <Styled.Block>
            <Styled.Title>Description</Styled.Title>
            <p>{product.description}</p>
          </Styled.Block>

          <ThemeStyled.Separator />
          <Banner />
          <ThemeStyled.Separator />

          {reviews && (
            <>
              <Styled.Block>
                <Styled.Title>Reviews</Styled.Title>
                <Reviews reviews={reviews} baseUrl={baseUrl} />
              </Styled.Block>
            </>
          )}
        </>
      )}
    </Styled.Wrapper>
  );
};

export default ProductDetails;
