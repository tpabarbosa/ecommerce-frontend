import { useState } from 'react';

import styled from 'styled-components';
import useModal from '../../../../components/Layout/Modal/useModal';
import { IPhoto } from '../../../../models';
import ImagesDisplayerModal from './ImagesDisplayerModal';

const Styled = {
  Wrapper: styled.div`
    border: 1px solid var(--p-color);
  `,

  ThumbnailsWrapper: styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: var(--s) 0;
    margin-bottom: 0;
  `,
  Thumbnails: styled.img`
    width: 20%;
    /* height: 20%; */
    display: inline-block;
    font-size: var(--xs);
  `,
  Image: styled.img`
    width: 100%;
    height: 100%;
  `,
};

type ImagesDisplayerProps = {
  images: IPhoto[];
};

const ImagesDisplayer = ({ images }: ImagesDisplayerProps) => {
  const imagesState = useState(0);
  const [currentImage, setCurrentImage] = imagesState;
  const modal = useModal();

  return (
    <Styled.Wrapper>
      <div>
        {images.length > 0 && (
          <Styled.Image
            src={images[currentImage].url}
            alt={images[currentImage].description || 'No description'}
            onClick={modal.open}
          />
        )}
        <Styled.ThumbnailsWrapper>
          {images.length > 0 &&
            images.map((image, index) => (
              <Styled.Thumbnails
                key={`image-${image.id}`}
                src={image.url}
                alt={image.description || 'No description'}
                onClick={() => setCurrentImage(index)}
              />
            ))}
        </Styled.ThumbnailsWrapper>
      </div>

      <ImagesDisplayerModal
        modal={modal}
        images={images}
        imagesState={imagesState}
      />
    </Styled.Wrapper>
  );
};

export default ImagesDisplayer;
