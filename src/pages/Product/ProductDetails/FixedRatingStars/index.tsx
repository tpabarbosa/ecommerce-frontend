import { FaStar, FaRegStar } from 'react-icons/fa';
import styled, { css } from 'styled-components';

type FilledStarsProps = {
  value: number;
};

const Styled = {
  StarsWrapper: styled.div`
    color: #e7b615;
    font-size: var(--l);
    height: var(--xl);
    margin: var(--xm) 0;
    position: relative;
  `,
  FilledStarsWrapper: styled.div<FilledStarsProps>(
    ({ value }) => css`
      position: absolute;
      top: 0;
      width: calc(${value / 2} * var(--l));
      overflow: hidden;
    `
  ),
  FilledStars: styled.div`
    width: calc(6 * var(--l));
  `,
  EmptyStars: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-bottom: var(--m);
    span {
      padding: 0 var(--s);
    }
  `,
  InfoWrapper: styled.div`
    height: var(--l);
  `,
};

type FixedRatingStarsProps = {
  value: number;
  count?: number;
};

const FixedRatingStars = ({ value, count }: FixedRatingStarsProps) => {
  return (
    <Styled.StarsWrapper>
      <Styled.EmptyStars>
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
        {count && (
          <>
            <span> ({value}) </span>
            <span>Reviewed by {count} users</span>
          </>
        )}
      </Styled.EmptyStars>
      <Styled.FilledStarsWrapper value={value}>
        <Styled.FilledStars>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </Styled.FilledStars>
      </Styled.FilledStarsWrapper>
    </Styled.StarsWrapper>
  );
};

export default FixedRatingStars;
