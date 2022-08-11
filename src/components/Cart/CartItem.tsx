// import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCart from '../../contexts/Cart';
import { ICartProduct } from '../../contexts/Cart/cart.interfaces';
import { ThemeStyled } from '../../contexts/Theme/themeCSS.styles';
import { parsePrice, calcPrice } from '../../helpers/parsers';
import IncreaseDecreaseQuantity from './IncreaseDecreaseQuantity';
import Sizes from './Sizes';

type CartItemProps = {
  item: ICartProduct;
};

const Styled = {
  Wrapper: styled(ThemeStyled.Box).attrs({ type: 'primary' })`
    padding-top: var(--l);
    margin-top: var(--xl);
    width: 100%;
    border: 1px solid var(--p-color);
    box-shadow: 0 2px 5px 0px var(--p-color);
  `,
  ProductHeader: styled.div`
    display: flex;
    width: 95%;
    margin: 0 auto;
    gap: var(--s);
  `,
  ProductContent: styled.div`
    display: flex;
    flex-direction: column;
  `,
  SizeAndDeleteWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;
    gap: var(--xxl);
  `,
  Table: styled.table`
    width: 100%;
    margin: var(--xl) auto;
    th {
      text-align: center;
      vertical-align: middle;
      padding-bottom: var(--xs);
    }
    td {
      text-align: center;
    }
  `,
  ImageContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  `,
  NameContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  `,
  Image: styled.img`
    width: calc(2 * var(--xxl));
    height: calc(2 * var(--xxl));
  `,
  Name: styled.h3`
    font-size: var(--xm);
    font-weight: bold;
  `,
  DeleteButton: styled(ThemeStyled.RoundButton).attrs({
    size: 'custom',
    custom: `var(--xl)`,
  })`
    margin: var(--s);
  `,
};

const CartItem = ({ item }: CartItemProps) => {
  const cart = useCart();

  const price = calcPrice(item.product.price, item.product.sale?.discount);

  const handleRemove = (e: React.MouseEvent) => {
    // e.preventDefault();
    e.stopPropagation();
    cart.removeProduct(item.item_id);
  };

  return (
    <Styled.Wrapper>
      <Link to={`/product/${item.product.slug}`}>
        <Styled.ProductHeader>
          <Styled.ImageContainer>
            <Styled.Image
              src={item.product.photos[0].url}
              alt={item.product.photos[0].description || 'No description'}
            />
          </Styled.ImageContainer>
          <Styled.NameContainer>
            <Styled.Name>{item.product.name}</Styled.Name>
          </Styled.NameContainer>
        </Styled.ProductHeader>
      </Link>
      <Styled.ProductContent>
        <Styled.SizeAndDeleteWrapper>
          <Styled.DeleteButton onClick={handleRemove}>
            <FaTrash />
          </Styled.DeleteButton>
          <Sizes item={item} />
        </Styled.SizeAndDeleteWrapper>

        <Styled.Table>
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <IncreaseDecreaseQuantity
                  onIncrease={() => cart.increaseItemQuantity(item)}
                  onDecrease={() => cart.decreaseItemQuantity(item)}
                  onChange={(val: number) => cart.setItemQuantity(item, val)}
                  value={item.quantity}
                />
              </td>
              <td>{parsePrice(price)}</td>
              <td>
                <strong>{parsePrice(item.quantity * price)}</strong>
              </td>
            </tr>
          </tbody>
        </Styled.Table>
      </Styled.ProductContent>
    </Styled.Wrapper>
  );
};

export default CartItem;
