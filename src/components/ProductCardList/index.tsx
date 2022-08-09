import styled from 'styled-components';
import Loading from '../../components/Layout/Loading';
import ProductCard from '../../components/ProductCard';
import { IProductsList } from '../../models';
import { ThemeStyled } from '../../contexts/Theme/themeCSS.styles';
import ErrorMessage from '../Layout/ErrorMessage';

const Styled = {
  ProductsWrapper: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--s);
  `,
  Text: styled.p`
    text-align: center;
    font-size: var(--l);
    color: var(--s-color);
    margin: var(--xxl);
  `,
};

type ProductCardListProps = {
  title?: string;
  productsList: IProductsList | undefined;
  errorMessage: string;
};

const ProductCardList = ({
  title,
  productsList,
  errorMessage,
}: ProductCardListProps) => {
  return (
    <ThemeStyled.PageContentWrapper>
      <ThemeStyled.Title>{title}</ThemeStyled.Title>

      {!productsList && !errorMessage && <Loading size={'large'} />}
      {!productsList && errorMessage && (
        <ErrorMessage size={'large'} message={errorMessage} />
      )}
      {productsList && productsList.products.length === 0 && (
        <Styled.Text>No products were found</Styled.Text>
      )}
      {productsList && productsList.products.length > 0 && (
        <Styled.Text>{`${productsList.count} product${
          productsList.count > 1 ? 's' : ''
        } ${productsList.count > 1 ? 'were' : 'was'} found`}</Styled.Text>
      )}
      <Styled.ProductsWrapper>
        {productsList &&
          productsList.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Styled.ProductsWrapper>
    </ThemeStyled.PageContentWrapper>
  );
};

export default ProductCardList;
