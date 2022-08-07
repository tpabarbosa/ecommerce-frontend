import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useWindowSize from '../../../hooks/useWindowSize';
import { ThemeStyled } from '../../../contexts/Theme/themeCSS.styles';

const Styled = {
  Wrapper: styled(ThemeStyled.Box).attrs({ as: 'footer', type: 'secondary' })`
    padding: var(--xm) 0;
    min-height: calc(2 * var(--xxl));
    width: 100%;
  `,
  BlocksWrapper: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 auto;
    min-height: 280px;
  `,

  Details: styled.details`
    width: 70vw;
    margin-left: 20vw;

    @media (min-width: 720px) {
      max-width: 28vw;
      margin: 0;
    }
    @media (min-width: 960px) {
      max-width: 19vw;
      margin: 0;
    }

    ul {
      margin: var(--l) var(--m);
    }
    li {
      margin-bottom: var(--s);
    }

    a {
      display: flex;
      align-items: center;
    }

    svg {
      margin-right: var(--xs);
    }
  `,
  DetailsTitle: styled.summary`
    cursor: pointer;
    font-size: var(--xm);
    font-weight: bold;
    margin: var(--l) 0;
  `,

  Credits: styled(ThemeStyled.Box).attrs({ type: 'primary' })`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--xl);
    a {
      margin: var(--m) auto;
    }
  `,
};

const Footer = () => {
  const [width] = useWindowSize();
  return (
    <Styled.Wrapper>
      <Styled.BlocksWrapper>
        <Styled.Details open={width > 720}>
          <Styled.DetailsTitle>Help</Styled.DetailsTitle>
          <ul>
            <li>
              <Link to="/help/faqs">FAQS</Link>
            </li>
            <li>
              <Link to="/help/costumer-service">Costumer Service</Link>
            </li>
            <li>
              <Link to="/help/size-charts">Size Charts</Link>
            </li>
            <li>
              <Link to="/help/order-status">Order Status</Link>
            </li>
          </ul>
        </Styled.Details>
        <Styled.Details open={width > 720}>
          <Styled.DetailsTitle>Your Account</Styled.DetailsTitle>
          <ul>
            <li>
              <Link to="/user">Account</Link>
            </li>
            <li>
              <Link to="/login">Sign In</Link>
            </li>
            <li>
              <Link to="/register">Create an Account</Link>
            </li>
            <li>
              <Link to="/user/wishlist">Wish List</Link>
            </li>
            <li>
              <Link to="/user/cart">Shopping Cart</Link>
            </li>
            <li>
              <Link to="/user/orders">Orders</Link>
            </li>
          </ul>
        </Styled.Details>
        <Styled.Details open={width > 720}>
          <Styled.DetailsTitle>Policies</Styled.DetailsTitle>
          <ul>
            <li>
              <Link to="/policies/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/policies/returns">Returns</Link>
            </li>
            <li>
              <Link to="/policies/shipping">Shipping</Link>
            </li>
            <li>
              <Link to="/policies/terms-of-use">Terms of Use</Link>
            </li>
            <li>
              <Link to="/policies/give-away-faqs">Give Away FAQS</Link>
            </li>
          </ul>
        </Styled.Details>
        <Styled.Details open={width > 720}>
          <Styled.DetailsTitle>About Us</Styled.DetailsTitle>
          <ul>
            <li>
              <Link to="/about-us/carrers">Carrers</Link>
            </li>
            <li>
              <Link to="/about-us/our-history">Our History</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </Styled.Details>
        <Styled.Details open={width > 720}>
          <Styled.DetailsTitle>Social</Styled.DetailsTitle>
          <ul>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram /> Instagram
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook /> Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter /> Twitter
              </a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <FaYoutube /> Youtube
              </a>
            </li>
          </ul>
        </Styled.Details>
      </Styled.BlocksWrapper>
      <Styled.Credits>
        <a href="https://tpabarbosa.github.io" target="_blank" rel="noreferrer">
          E-commerce desenvolvido por Tatiana Barbosa
        </a>
        <a
          href="https://www.vecteezy.com/free-photos"
          target="_blank"
          rel="noreferrer"
        >
          Free Stock photos by Vecteezy
        </a>
      </Styled.Credits>
    </Styled.Wrapper>
  );
};

export default Footer;
