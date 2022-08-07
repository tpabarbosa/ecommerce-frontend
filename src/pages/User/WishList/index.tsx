import styled from 'styled-components';
import Loading from '../../../components/Layout/Loading';
import ProductCard from '../../../components/ProductCard';

import { ThemeStyled } from '../../../contexts/Theme/themeCSS.styles';

import useUser from '../../../contexts/User';

const Styled = {
  ProductsWrapper: styled(ThemeStyled.Box).attrs({
    as: 'section',
    type: 'tertiary',
  })`
    display: flex;
    flex-wrap: wrap;
    gap: var(--s);
  `,
  Title: styled(ThemeStyled.Title)``,
};

const WishList = () => {
  const user = useUser();

  return (
    <ThemeStyled.PageContentWrapper>
      <ThemeStyled.Title>My Wish List</ThemeStyled.Title>

      {!user.wishList && <Loading size="extra-large" />}
      {user.wishList && user.wishList.length === 0 && <p>No products found</p>}
      <Styled.ProductsWrapper>
        {user.wishList &&
          user.wishList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Styled.ProductsWrapper>
    </ThemeStyled.PageContentWrapper>
  );
};

export default WishList;
