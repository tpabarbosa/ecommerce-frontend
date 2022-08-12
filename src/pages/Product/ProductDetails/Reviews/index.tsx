import styled from 'styled-components';
import Pagination from '../../../../components/Layout/Pagination';
import { IReviewsList, IReview } from '../../../../models';
import ReviewItem from './ReviewItem';

type ReviewsProps = {
  reviews: IReviewsList;
  onChangeReviewsPage: (newPage: number) => void;
  userReview: IReview | undefined | null;
};

const Styled = {
  Wrapper: styled.div`
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  `,
};

const Reviews = ({
  reviews,
  onChangeReviewsPage,
  userReview,
}: ReviewsProps) => {
  return (
    <>
      <Styled.Wrapper>
        {reviews &&
          reviews.reviews.map(
            (review) =>
              review.id !== userReview?.id && (
                <ReviewItem review={review} key={review.id} />
              )
          )}
        {userReview && <ReviewItem review={userReview} isUser />}
        {!userReview && <ReviewItem review={userReview} />}
      </Styled.Wrapper>
      <Pagination
        page={reviews.page}
        pages={reviews.pages}
        onChangePage={onChangeReviewsPage}
      />
    </>
  );
};

export default Reviews;
