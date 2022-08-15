import { useEffect, useState } from 'react';
import { IProductsList } from '../../../models';
import productsHttp from '../../../services/produtcsHttp';
import ProductCardList from '../../../components/ProductCardList';
import { parsePageQuery } from '../../../helpers/parsers';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Layout/Pagination';
import { IQuery } from '../../../services/HttpService';

const SearchProducts = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [productsList, setProductsList] = useState<IProductsList>();
  const [errorMessage, setErrorMessage] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [search, setSearch] = useState('');

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
    if (searchParams && searchParams.has('search')) {
      setSearch(searchParams.get('search') as string);
    }
    getProducts(parsedQuery.obj);
  }, [searchParams, baseUrl]);

  const handleChangePage = (newPage: number) => {
    navigate(`${baseUrl}&page=${newPage}`);
  };

  return (
    <>
      {productsList && (
        <>
          <ProductCardList
            title={productsList.category ?? `Search for: ${search}`}
            productsList={productsList}
            errorMessage={errorMessage}
          />
          <Pagination
            page={productsList.page}
            pages={productsList.pages}
            onChangePage={handleChangePage}
          />
        </>
      )}
    </>
  );
};

export default SearchProducts;
