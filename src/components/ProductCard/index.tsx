import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IProduct } from '../../models';
import { ThemeStyled } from '../../contexts/Theme/themeCSS.styles';

import { parsePrice } from '../../helpers/parsers';

import AddToCartButton from '../Cart/AddToCartButton';
import ToogleToWishListButton from '../WishList/ToggleToWishListButton';

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
};

const ProductCard = ({ product }: ProductCardProps) => {
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
      <ToogleToWishListButton product={product} />
      <AddToCartButton product={product} />
    </Styled.Wrapper>
  );
};

export default ProductCard;
