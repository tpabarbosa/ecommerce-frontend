import { useEffect, useState } from 'react';
import { IProductsList } from '../../../models';
import productsHttp from '../../../services/produtcsHttp';
import ProductCardList from '../../../components/ProductCardList';

const Featured = () => {
  const [productsList, setProductsList] = useState<IProductsList>();
  const [errorMessage, setErrorMessage] = useState('');

  const getProducts = async () => {
    const list = await productsHttp.getFeatured();
    if (list && list.status === 'success') {
      setProductsList(list.data);
    } else {
      setErrorMessage(list.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductCardList
      title="Featured Products"
      productsList={productsList}
      errorMessage={errorMessage}
    />
  );
};

export default Featured;
