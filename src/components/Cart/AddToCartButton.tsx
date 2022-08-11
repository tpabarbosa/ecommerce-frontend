import useCart from '../../contexts/Cart';
import { ThemeStyled } from '../../contexts/Theme/themeCSS.styles';
import { IProduct } from '../../models';
import useRequireLoginAction from '../../hooks/useRequireLoginAction';

type AddToCartButtonProps = {
  product: IProduct;
};

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const cart = useCart();

  const handleAddToCart = async () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define

    await cart.addProduct(product);
  };

  const addToCartAction = useRequireLoginAction({
    actionCb: handleAddToCart,
    message: 'You must be logged in to add items to cart',
    actionName: 'addToCart',
    actionValue: `${product.id}`,
  });

  return (
    <ThemeStyled.TextButton onClick={addToCartAction.handle}>
      Add to Cart
    </ThemeStyled.TextButton>
  );
};

export default AddToCartButton;
