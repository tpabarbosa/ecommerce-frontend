// import { useNavigate } from 'react-router-dom';
import { ThemeStyled } from '../../../contexts/Theme/themeCSS.styles';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';

interface IPagination {
  page: number;
  pages: number;
  onChangePage: (newPage: number) => void;
}

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: var(--s) auto;
    padding: var(--m);
    max-width: 400px;
  `,

  Page: styled.div`
    font-size: var(--l);
    padding: var(--s) var(--l);
    margin: 0 var(--l);
  `,
};

const Pagination = ({ page, pages, onChangePage }: IPagination) => {
  const handleNext = () => {
    onChangePage(page + 1);
  };

  const handlePrevious = () => {
    onChangePage(page - 1);
  };

  return (
    <>
      {pages > 1 && (
        <Styled.Wrapper>
          {pages > 1 && (
            <ThemeStyled.RoundButton
              size="custom"
              custom="3rem"
              disabled={page <= 1}
              onClick={handlePrevious}
            >
              {/* <Link to={`${baseUrl}page=${page - 1}`}> */}
              <FaChevronLeft />
              {/* </Link> */}
            </ThemeStyled.RoundButton>
          )}
          {pages > 3 && page - 1 >= 1 && (
            <ThemeStyled.TextButton onClick={handlePrevious}>
              {page - 1}
            </ThemeStyled.TextButton>
          )}
          <Styled.Page> {page}</Styled.Page>
          {pages > 3 && page + 1 <= pages && (
            <ThemeStyled.TextButton onClick={handleNext}>
              {page + 1}
            </ThemeStyled.TextButton>
          )}
          {pages > 1 && (
            <ThemeStyled.RoundButton
              size="custom"
              custom="3rem"
              disabled={page >= pages}
              onClick={handleNext}
            >
              {/* <Link to={`${baseUrl}&page=${page + 1}`}> */}
              <FaChevronRight />
              {/* </Link> */}
            </ThemeStyled.RoundButton>
          )}
        </Styled.Wrapper>
      )}
    </>
  );
};

export default Pagination;
