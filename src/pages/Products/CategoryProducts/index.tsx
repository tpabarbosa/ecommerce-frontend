import { useEffect, useState } from 'react';
import { IProductsList } from '../../../models';
import productsHttp from '../../../services/produtcsHttp';
import ProductCardList from '../../../components/ProductCardList';

import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Layout/Pagination';
import { IQuery } from '../../../services/HttpService';
import { parsePageQuery } from '../../../helpers/parsers';

const CategoryProducts = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [categorySlug, setCategorySlug] = useState('');
  const [query, setQuery] = useState<IQuery>();
  const [productsList, setProductsList] = useState<IProductsList>();
  const [errorMessage, setErrorMessage] = useState('');
  const [baseUrl, setBaseUrl] = useState('');

  const getCategoryProducts = async (slug: string, queryObj?: IQuery) => {
    const list = await productsHttp.getCategoryProducts(slug, queryObj);
    if (list && list.status === 'success') {
      setProductsList(list.data);
    } else {
      setErrorMessage(list.message);
    }
  };

  useEffect(() => {
    if (categorySlug) getCategoryProducts(categorySlug, query);
  }, [categorySlug, query]);

  useEffect(() => {
    if (params.categorySlug) {
      setCategorySlug(params.categorySlug);
      const parsedQuery = parsePageQuery(
        `/products${params.categorySlug}`,
        searchParams
      );

      if (parsedQuery.str !== baseUrl) {
        setBaseUrl(parsedQuery.str);
        setQuery(parsedQuery.obj);
        return;
      }
    } else {
      setCategorySlug('');
    }
    setQuery({} as IQuery);
    setBaseUrl('');
  }, [searchParams, params, baseUrl]);

  const handleChangePage = (newPage: number) => {
    navigate(`${baseUrl}&page=${newPage}`);
  };

  return (
    <>
      {productsList && (
        <>
          <ProductCardList
            title={
              productsList.category
                ? `Category: ${productsList.category}`
                : 'Products List'
            }
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

export default CategoryProducts;
