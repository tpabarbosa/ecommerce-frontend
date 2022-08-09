import { FaStar, FaRegStar } from 'react-icons/fa';
import styled, { css } from 'styled-components';

type FilledStarsProps = {
  val: number;
};

const Styled = {
  StarsWrapper: styled.div`
    color: #e7b615;
    font-size: var(--l);
    height: var(--xl);
    margin: var(--xm) 0;
    position: relative;
    min-width: calc(5 * var(--l));
  `,
  FilledStarsWrapper: styled.div<FilledStarsProps>(
    ({ val }) => css`
      position: absolute;
      top: 0;
      width: calc(${val / 2} * var(--l));
      overflow: hidden;
    `
  ),
  FilledStars: styled.div`
    min-width: calc(5 * var(--l));
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
        {count === 0 && (
          <>
            <span>No reviews</span>
          </>
        )}
        {count !== undefined && count !== 0 && value !== 0 && (
          <>
            <span> ({value}) </span>
            <span>Reviewed by {count} users</span>
          </>
        )}
      </Styled.EmptyStars>
      <Styled.FilledStarsWrapper val={value}>
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
