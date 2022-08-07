import styled from 'styled-components';
import Modal from '../../../../components/Layout/Modal';
import { IUseModal } from '../../../../components/Layout/Modal/useModal';
import { ThemeStyled } from '../../../../contexts/Theme/themeCSS.styles';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IPhoto } from '../../../../models';

const Styled = {
  ImageWrapper: styled(ThemeStyled.Box).attrs({ as: 'nav', type: 'tertiary' })`
    width: 80%;
    margin-left: 10%;
    padding: var(--m);
    z-index: 2;
    text-align: center;
    overflow-y: hidden;
    transform: translateX(-100%);
    transition: transform 0.4s;

    &.active {
      transform: none;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `,
  PreviousButton: styled(ThemeStyled.RoundButton).attrs({
    size: 'custom',
    custom: '3rem',
  })`
    position: absolute;
    top: 50%;
    left: 8%;
  `,
  NextButton: styled(ThemeStyled.RoundButton).attrs({
    size: 'custom',
    custom: '3rem',
  })`
    position: absolute;
    top: 50%;
    right: 8%;
  `,
};

type ImagesDisplayerModalProps = {
  modal: IUseModal;
  images: IPhoto[];
  imagesState: [number, React.Dispatch<React.SetStateAction<number>>];
};

const ImagesDisplayerModal = ({
  modal,
  images,
  imagesState,
}: ImagesDisplayerModalProps) => {
  const [currentImage, setCurrentImage] = imagesState;

  const handlePreviousButton = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
    if (currentImage === 0) {
      setCurrentImage(images.length - 1);
    }
  };

  const handleNextButton = () => {
    if (currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
    if (currentImage === images.length - 1) {
      setCurrentImage(0);
    }
  };

  return (
    <Modal modal={modal}>
      <Styled.ImageWrapper className={modal.isOpen ? 'active' : ''}>
        <Styled.PreviousButton
          onClick={handlePreviousButton}
          className={modal.isOpen ? 'active' : ''}
        >
          <FaChevronLeft />
        </Styled.PreviousButton>
        <img
          src={images[currentImage].url}
          alt={images[currentImage].description || 'No description'}
        />
        <Styled.NextButton
          onClick={handleNextButton}
          className={modal.isOpen ? 'active' : ''}
        >
          <FaChevronRight />
        </Styled.NextButton>
      </Styled.ImageWrapper>
    </Modal>
  );
};

export default ImagesDisplayerModal;
