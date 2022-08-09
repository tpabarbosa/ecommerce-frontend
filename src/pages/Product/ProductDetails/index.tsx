import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AddToCartButton from '../../../components/Cart/AddToCartButton';
import IncreaseDecreaseQuantity from '../../../components/Cart/IncreaseDecreaseQuantity';
import Sizes from '../../../components/Cart/Sizes';
import ToogleToWishListButton from '../../../components/WishList/ToggleToWishListButton';
import useCart from '../../../contexts/Cart';
import { ICartProduct } from '../../../contexts/Cart/cart.interfaces';
import { ThemeStyled } from '../../../contexts/Theme/themeCSS.styles';
import useUser from '../../../contexts/User';
import { parsePrice } from '../../../helpers/parsers';
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
    position: relative;
  `,
  ProductWrapper: styled.div`
    flex: 1.5;
  `,
  Title: styled.h3`
    font-size: var(--xl);
    font-weight: bold;
  `,
  Block: styled.div`
    margin: calc(2 * var(--xxl)) var(--s);
    font-size: var(--xm);

    p {
      margin: var(--l);
    }

    h3 {
      padding-left: var(--xxl);
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
      width: 100%;
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

const REVIEWS_QUERY: IQuery = { limit: 1, page: 1 };

const ProductDetails = () => {
  const user = useUser();
  const [product, setProduct] = useState<IProductDetails>();
  const [reviews, setReviews] = useState<IReviewsList>();
  const params = useParams();
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
    getReviews(REVIEWS_QUERY);
  }, [product]);

  useEffect(() => {
    getDetails();
  }, [params]);

  const handleChangeReviewPage = (newPage: number) => {
    getReviews({ ...REVIEWS_QUERY, page: newPage });
  };

  return (
    <Styled.Wrapper>
      {product && (
        <>
          <Styled.Header>
            <Styled.ImagesWrapper>
              <ImagesDisplayer images={product.photos} />
              {user.isLoggedIn && <ToogleToWishListButton product={product} />}
            </Styled.ImagesWrapper>

            <Styled.ProductWrapper>
              <Styled.Title>{product.name}</Styled.Title>
              <div>
                {reviews && (
                  <FixedRatingStars
                    value={reviews.average_rate ?? 0}
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

          {reviews && reviews.reviews.length > 0 && (
            <>
              <Styled.Block>
                <Styled.Title>Reviews</Styled.Title>
                <Reviews
                  reviews={reviews}
                  onChangeReviewsPage={handleChangeReviewPage}
                />
              </Styled.Block>
            </>
          )}
        </>
      )}
    </Styled.Wrapper>
  );
};

export default ProductDetails;
