import { useEffect } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';

const Products = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  // const [categorySlug, setCategorySlug] = useState('');
  useEffect(() => {
    if (params.categorySlug) {
      // setCategorySlug(params.categorySlug);
    } else {
      // setCategorySlug('');
    }

    searchParams.forEach((value, key) => console.log(key, value));
  }, [searchParams, params]);

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default Products;
