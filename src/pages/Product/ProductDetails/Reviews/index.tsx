import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import styled from 'styled-components';
import Pagination from '../../../../components/Layout/Pagination';
import { IReviewsList } from '../../../../models';
import FixedRatingStars from '../FixedRatingStars';

type ReviewsProps = {
  reviews: IReviewsList;
  baseUrl: string;
};

const Styled = {
  Wrapper: styled.div`
    width: 100%;
    margin: var(--xl) auto;
    display: flex;
    flex-wrap: wrap;
  `,
  ItemWrapper: styled.div`
    /* max-width: 500px; */
    width: 95%;
    margin: var(--xl) auto;
    box-shadow: 0 2px 5px 0px var(--p-color);
    display: flex;
    flex-direction: column;
    @media (min-width: 720px) {
      max-width: 40%;
    }

    @media (min-width: 960px) {
      max-width: 40%;
    }
  `,
  TitleWrapper: styled.div`
    background-color: var(--p-color);
    color: var(--p-bg);
    padding: 0 var(--l);
    padding-top: var(--xm);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    @media (min-width: 768px) {
      flex-direction: row;
      padding-top: 0;
    }
  `,
  Title: styled.h4`
    font-size: var(--l);
    font-weight: bold;
  `,
  Content: styled.span`
    padding: var(--l) var(--s);
  `,
  ContentWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (min-width: 768px) {
      flex-direction: row;
    }
  `,
  UserWrapper: styled.span`
    padding: var(--l) var(--l);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--s);
    @media (min-width: 768px) {
      border-left: 1px solid var(--p-color);
    }
  `,
  User: styled.strong`
    font-size: var(--xm);
  `,
  Recommend: styled.div`
    font-size: var(--l);
  `,
  Date: styled.div`
    font-size: var(--s);
  `,
};

const Reviews = ({ reviews, baseUrl }: ReviewsProps) => {
  console.log(reviews);
  return (
    <Styled.Wrapper>
      {reviews &&
        reviews.reviews.map((review) => (
          <Styled.ItemWrapper key={review.id}>
            <Styled.TitleWrapper>
              <Styled.Title>{review.title}</Styled.Title>
              <FixedRatingStars value={review.rating} />
            </Styled.TitleWrapper>
            <Styled.ContentWrapper>
              <Styled.Content>{review.content}</Styled.Content>
              <Styled.UserWrapper>
                <Styled.User>{review.user.firstname}</Styled.User>
                <Styled.Recommend>
                  {review.recommend ? <FaRegThumbsUp /> : <FaRegThumbsDown />}
                </Styled.Recommend>
                <Styled.Date>
                  <div>last update</div>
                  {new Date(review.updated_at).toLocaleDateString()}
                </Styled.Date>
              </Styled.UserWrapper>
            </Styled.ContentWrapper>
          </Styled.ItemWrapper>
        ))}
      <Pagination page={reviews.page} pages={reviews.pages} baseUrl={baseUrl} />
    </Styled.Wrapper>
  );
};

export default Reviews;
