import {
  FaEdit,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaPlusCircle,
} from 'react-icons/fa';
import styled, { css } from 'styled-components';
import TooltipBox from '../../../../components/Layout/TooltipBox';
import { ThemeStyled } from '../../../../contexts/Theme/themeCSS.styles';
import useUser from '../../../../contexts/User';
import { IReview } from '../../../../models';
import FixedRatingStars from '../FixedRatingStars';

type ReviewItemProps = {
  review: IReview | null | undefined;
  isUser?: boolean;
};

type ItemProps = {
  isUser?: boolean;
};

const Styled = {
  ItemWrapper: styled.div`
    /* max-width: 500px; */
    width: 95%;
    margin: var(--xl) auto;
    box-shadow: 0 2px 5px 0px var(--p-color);
    display: flex;
    flex-direction: column;
    @media (min-width: 720px) {
      max-width: 45%;
    }

    @media (min-width: 960px) {
      max-width: 40%;
    }
  `,
  TitleWrapper: styled.div<ItemProps>(
    ({ isUser }: ItemProps) => css`
      background-color: ${isUser ? 'var(--p-bg)' : 'var(--p-color)'};
      color: ${isUser ? 'var(--p-color)' : 'var(--p-bg)'};
      border-bottom: ${isUser ? '1px solid var(--p-color)' : '0'};
      padding: 0 var(--l);
      padding-top: var(--xm);
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      gap: var(--l);
      @media (min-width: 768px) {
        flex-direction: row;
        padding-top: 0;
      }
    `
  ),
  Title: styled.h4`
    font-size: var(--l);
    font-weight: bold;
    text-align: center;
  `,
  Content: styled.span`
    padding: var(--l) var(--s);
  `,
  ContentWrapper: styled(ThemeStyled.Box).attrs({ type: 'tertiary' })`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  `,
  UserWrapper: styled(ThemeStyled.Box).attrs({ type: 'secondary' })`
    padding: var(--l) var(--m);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: var(--s);
    position: relative;
    /* min-width: 150px; */
    @media (min-width: 768px) {
      border-left: 1px solid var(--p-color);

      flex-direction: column;
    }
  `,
  User: styled.strong`
    font-size: var(--xm);
  `,
  Recommend: styled.div`
    font-size: var(--xl);
  `,
  Date: styled.div`
    font-size: var(--s);
  `,
  AddReview: styled.div`
    margin: 0 auto;
    position: relative;
  `,
};

const ReviewItem = ({ review, isUser = false }: ReviewItemProps) => {
  const user = useUser();

  const handleEditReview = () => {
    console.log('init review editing');
  };

  const handleNewReview = () => {
    console.log('init new review');
  };

  return (
    <Styled.ItemWrapper>
      {user.isLoggedIn && !review && (
        <>
          <Styled.TitleWrapper>
            <Styled.Title>Add a review</Styled.Title>
            <FixedRatingStars value={0} />
          </Styled.TitleWrapper>
          <Styled.ContentWrapper>
            <Styled.AddReview>
              <TooltipBox
                element={
                  <ThemeStyled.RoundButton
                    onClick={handleNewReview}
                    size={'custom'}
                    custom={'3rem'}
                  >
                    <FaPlusCircle />
                  </ThemeStyled.RoundButton>
                }
                tooltip={<div>Add your review</div>}
              />
            </Styled.AddReview>
          </Styled.ContentWrapper>
        </>
      )}
      {review && (
        <>
          <Styled.TitleWrapper isUser={isUser}>
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
              {user.id === review.user.id && (
                <TooltipBox
                  element={
                    <ThemeStyled.RoundButton
                      onClick={handleEditReview}
                      size={'custom'}
                      custom={'2.5rem'}
                    >
                      <FaEdit />
                    </ThemeStyled.RoundButton>
                  }
                  tooltip={<div>Edit your review</div>}
                />
              )}
            </Styled.UserWrapper>
          </Styled.ContentWrapper>
        </>
      )}
    </Styled.ItemWrapper>
  );
};

export default ReviewItem;
