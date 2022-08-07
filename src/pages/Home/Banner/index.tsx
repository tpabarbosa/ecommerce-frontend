import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import banner1 from '../../../assets/black-friday-4488821_1280.jpg';
import banner2 from '../../../assets/vecteezy_red-neon-megaphone-and-empty-frame-with-space-for-text_2317597.jpg';

type ImageProps = {
  position: boolean;
};

const Styled = {
  Wrapper: styled.section`
    width: 100vw;
    overflow: hidden;

    margin-bottom: var(--l);
    @media (min-width: 720px) {
      transform: scale(0.7) translateY(-15%);
      margin-bottom: -5%;
    }
  `,
  ImagesWrapper: styled.div`
    width: 200vw;
    aspect-ratio: calc(393 / 71);
    position: relative;
  `,
  Image: styled.img<ImageProps>(
    ({ position }: ImageProps) => css`
      width: 100vw;
      position: absolute;
      left: ${position ? 0 : `100vw`};
      transform: ${position ? `none` : `translateX(-100%)`};
      transition: transform 1s ease-in-out;

      &.moving {
        transform: ${position ? `translateX(-100%)` : `none`};
      }
    `
  ),
  NextImage: styled.img<ImageProps>(
    ({ position }) => css`
      width: 100vw;
      position: absolute;
      left: ${position ? `100vw` : 0};
      transform: ${position ? `none` : `translateX(-100%)`};
      transition: transform 1s ease-in-out;

      &.moving {
        transform: ${position ? `translateX(-100%)` : `none`};
      }
    `
  ),
};

const Banner = () => {
  const [image, setImage] = useState(0);
  const [nextImage, setNextImage] = useState(1);
  const [isMoving, setIsMoving] = useState(false);
  const [position, setPosition] = useState(true);
  const images = [banner1, banner2];

  const timer = () => {
    setIsMoving(true);
  };

  useEffect(() => {
    const interval = setInterval(timer, 5000);
    return () => clearInterval(interval);
  }, [image, nextImage]);

  const handleTransitionEnd = () => {
    if (!isMoving) return;
    setIsMoving(false);
    setImage(nextImage);
    if (nextImage === images.length - 1) {
      setNextImage(0);
    } else {
      setNextImage(nextImage + 1);
    }
    setPosition(!position);
  };

  return (
    <Styled.Wrapper>
      <Styled.ImagesWrapper>
        <Styled.Image
          position={position}
          className={isMoving ? 'moving' : ''}
          src={images[image]}
          alt={`banner ${image}`}
        />
        <Styled.NextImage
          position={position}
          className={isMoving ? 'moving' : ''}
          onTransitionEnd={handleTransitionEnd}
          src={images[nextImage]}
          alt={`banner ${nextImage}`}
        />
      </Styled.ImagesWrapper>
    </Styled.Wrapper>
  );
};

export default Banner;
