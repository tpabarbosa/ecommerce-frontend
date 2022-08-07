import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './../components/Layout';
import Cart from '../pages/User/Cart';
import WishList from '../pages/User/WishList';
import Home from './../pages/Home';
import Login from './../pages/Login';
import NotFound from './../pages/NotFound';
import Product from './../pages/Product';
import ProductDetails from './../pages/Product/ProductDetails';
import Products from './../pages/Products';
import User from './../pages/User';
import UnderConstruction from './../pages/UnderConstruction';
import UserHome from '../pages/User/UserHome';
import CategoryProducts from '../pages/Products/CategoryProducts';
import AllProducts from '../pages/Products/AllProducts';
import Register from '../pages/Register';
import Logout from '../pages/Logout';
import useUser from '../contexts/User';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  const user = useUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="logout" element={<Logout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="contact" element={<UnderConstruction />} />

          <Route
            path="user"
            element={
              <ProtectedRoute condition={user.isLoggedIn} redirectTo="/login">
                <User />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserHome />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<WishList />} />
            <Route path="orders" element={<UnderConstruction />} />
            <Route path="checkout" element={<UnderConstruction />} />
          </Route>

          <Route path="product" element={<Product />}>
            <Route path=":productSlug" element={<ProductDetails />} />
            <Route index element={<Navigate to="/" />} />
          </Route>
          <Route path="products" element={<Products />}>
            <Route index element={<AllProducts />} />
            <Route path="search" element={<></>} />
            <Route path=":categorySlug" element={<CategoryProducts />} />
          </Route>
          <Route path="help" element={<UnderConstruction />}>
            <Route path="faqs" element={<></>} />
            <Route path="costumer-service" element={<></>} />
            <Route path="size-charts" element={<></>} />
            <Route path="order-status" element={<></>} />
          </Route>
          <Route path="policies" element={<UnderConstruction />}>
            <Route path="returns" element={<></>} />
            <Route path="privacy-policy" element={<></>} />
            <Route path="shipping" element={<></>} />
            <Route path="terms-of-use" element={<></>} />

            <Route
              path="give-away-faqs"
              element={
                <>
                  <ProtectedRoute condition={user.isLoggedIn}>
                    <div>Teste</div>
                  </ProtectedRoute>
                </>
              }
            />
          </Route>
          <Route path="about-us" element={<UnderConstruction />}>
            <Route path="carrers" element={<></>} />
            <Route path="our-history" element={<></>} />
          </Route>
        </Route>
        <Route path="*" element={<Layout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
