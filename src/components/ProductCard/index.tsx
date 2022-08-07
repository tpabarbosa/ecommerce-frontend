import { FaBookmark, FaCheckDouble } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { IProduct } from '../../models';
import { ThemeStyled } from '../../contexts/Theme/themeCSS.styles';
// import useCart from '../../contexts/Cart';
import { parsePrice } from '../../helpers/parsers';
import useUser from '../../contexts/User';
import { useEffect, useState } from 'react';
import TooltipBox from '../Layout/TooltipBox';
import AddToCartButton from '../Cart/AddToCartButton';

type ProductCardProps = {
  product: IProduct;
};

const Styled = {
  Wrapper: styled(ThemeStyled.Box).attrs({ as: 'article', type: 'primary' })`
    margin: var(--m) auto;
    width: 45vw;
    /* overflow: hidden; */
    box-shadow: 0 2px 5px 0px var(--p-color);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.3s;

    .photo {
      height: 45vw;
      overflow: hidden;
      img {
        transition: transform 0.3s, margin 0.3s;
      }
    }

    &:hover {
      box-shadow: 0 2px 10px 4px var(--p-color);
      .photo {
        img {
          transform: scale(2);
          margin-top: 50%;
        }
      }
    }
    @media (min-width: 720px) {
      max-width: 30vw;
      .photo {
        max-width: 30vw;
        max-height: 30vw;
      }
    }

    @media (min-width: 960px) {
      max-width: 21vw;
      .photo {
        max-width: 21vw;
        max-height: 21vw;
      }
    }
  `,
  Title: styled.h3`
    font-size: var(--m);
    font-weight: bold;
    text-align: center;
    margin: var(--m);
  `,
  FavoriteButton: styled(ThemeStyled.RoundButton).attrs({
    size: 'custom',
    custom: '2.5rem',
  })<{ inWishList: boolean }>(
    ({ inWishList }) => css`
      position: absolute;
      top: 0;
      right: 0;
      margin: var(--xs);
      padding: var(--xs);
      text-align: center;
      color: ${inWishList ? 'gold' : ''};
    `
  ),
  Image: styled.img`
    width: 100%;
    aspect-ratio: 1;
  `,
  Price: styled.div`
    padding: var(--s);
    display: flex;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;

    div {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding-top: var(--s);
    }
    del {
      font-size: var(--s);
      font-style: italic;
      padding: var(--xxs) var(--s);
    }

    span {
      font-size: var(--l);
      font-weight: bold;
    }

    img {
      width: calc(1.5 * var(--xxl));
      top: 25%;
      left: 0;
      transform: rotate(-15deg);
    }
  `,
  Tooltip: styled.div`
    font-size: var(--m);
  `,
};

const isInWishlist = (product: IProduct, wishList: IProduct[]) => {
  const isInList = wishList.find((item) => item.id === product.id);
  if (isInList) {
    return true;
  }
  return false;
};

const ProductCard = ({ product }: ProductCardProps) => {
  // const cart = useCart();
  const user = useUser();
  const [inWishList, setInWishList] = useState(false);

  const handleToggleWishlist = () => {
    if (inWishList) {
      user.removeWishListProduct(product);
      setInWishList(false);
    } else {
      user.addWishListProduct(product);
      setInWishList(true);
    }
  };

  useEffect(() => {
    setInWishList(isInWishlist(product, user.wishList));
  }, [user.wishList]);

  return (
    <Styled.Wrapper>
      <Link to={`/product/${product.slug}`}>
        <div className={'photo'}>
          <Styled.Image
            src={product.photos[0].url}
            alt={product.photos[0].description || 'No description'}
          />
        </div>
        <Styled.Title>{product.name}</Styled.Title>
        <div>
          <div></div>
          <div></div>
          <Styled.Price>
            {product.sale === undefined && (
              <span>{parsePrice(product.price)}</span>
            )}
            {product.sale !== undefined && (
              <>
                <div>
                  <span>
                    {parsePrice(product.price, product.sale?.discount)}
                  </span>
                  <del>{parsePrice(product.price)} </del>
                </div>

                <img
                  src={`/${product.sale?.badge}`}
                  alt={product.sale?.campaing}
                />
              </>
            )}
          </Styled.Price>
          <div></div>
        </div>
      </Link>
      {user.isLoggedIn && (
        <Styled.FavoriteButton
          inWishList={inWishList}
          onClick={handleToggleWishlist}
        >
          <TooltipBox
            element={inWishList ? <FaCheckDouble /> : <FaBookmark />}
            tooltip={
              <Styled.Tooltip>
                {inWishList ? 'Remove from Wish List' : 'Add to Wish List'}
              </Styled.Tooltip>
            }
          />
        </Styled.FavoriteButton>
      )}
      <AddToCartButton product={product} />
    </Styled.Wrapper>
  );
};

export default ProductCard;
