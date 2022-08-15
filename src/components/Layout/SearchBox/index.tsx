import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import { ThemeStyled } from '../../../contexts/Theme/themeCSS.styles';
import { useNavigate } from 'react-router-dom';

const Styled = {
  Wrapper: styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
    border-radius: 15px;
    overflow: hidden;
    background-color: var(--p-bg);
    color: var(--p-color);

    @media (min-width: 768px) {
      max-width: 70%;
    }
  `,
  Input: styled.input`
    flex: 1;
    font-size: var(--m);
    padding: var(--xs) var(--m);
  `,
  Button: styled(ThemeStyled.Button)`
    padding: var(--xs) var(--l);
  `,
};

export const SearchBox = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSearch('');
    if (search) {
      navigate(`/products/search?search=${search}`);
    } else {
      navigate('/products');
    }
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <Styled.Wrapper className="secondary" onSubmit={handleSubmit}>
      <Styled.Input
        placeholder="Type a word to search"
        onChange={handleChangeSearch}
        value={search}
      ></Styled.Input>
      <Styled.Button type="submit" className="btn">
        <BsSearch data-icon="search" />
      </Styled.Button>
    </Styled.Wrapper>
  );
};
