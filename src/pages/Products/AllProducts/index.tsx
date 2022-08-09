import { useEffect, useState } from 'react';
import { IProductsList } from '../../../models';
import productsHttp from '../../../services/produtcsHttp';
import ProductCardList from '../../../components/ProductCardList';
import { parsePageQuery } from '../../../helpers/parsers';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../../components/Layout/Pagination';
import { IQuery } from '../../../services/HttpService';

const AllProducts = () => {
  const [searchParams] = useSearchParams();
  const [productsList, setProductsList] = useState<IProductsList>();
  const [errorMessage, setErrorMessage] = useState('');
  const [baseUrl, setBaseUrl] = useState('');

  const getProducts = async (queryObj?: IQuery) => {
    const list = await productsHttp.getProducts(queryObj);
    if (list && list.status === 'success') {
      setProductsList(list.data);
    } else {
      setErrorMessage(list.message);
    }
  };

  useEffect(() => {
    const parsedQuery = parsePageQuery('/products', searchParams);

    if (parsedQuery.str !== baseUrl) {
      setBaseUrl(parsedQuery.str);
    }
    getProducts(parsedQuery.obj);
  }, [searchParams, baseUrl]);

  return (
    <>
      {productsList && (
        <>
          <ProductCardList
            title={productsList.category ?? 'Products List'}
            productsList={productsList}
            errorMessage={errorMessage}
          />
          <Pagination
            page={productsList.page}
            pages={productsList.pages}
            baseUrl={baseUrl}
          />
        </>
      )}
    </>
  );
};

export default AllProducts;
