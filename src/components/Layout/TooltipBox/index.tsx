import styled from 'styled-components';

type TooltipBoxProps = {
  element: React.ReactNode;
  tooltip: React.ReactNode;
};

const TooltipText = styled.div``;
const TooltipContent = styled.div`
  position: absolute;
  z-index: 100;
  top: calc(100% + 10px);
  left: calc(-1 * var(--l));
  visibility: hidden;
  color: transparent;
  background-color: transparent;
  width: 150px;
  padding: var(--s) var(--m);
  border-radius: 4px;
  transition: visibility 0.5s, color 0.5s, background-color 0.5s, width 0.5s,
    padding 0.5s ease-in-out;

  &:before {
    content: '';
    width: 0;
    height: 0;
    left: 40px;
    top: -10px;
    position: absolute;
    border: 10px solid transparent;
    transform: rotate(135deg);
    transition: border 0.4s ease-in-out;
  }
`;
const TooltipCard = styled.div`
  position: relative;
  & ${TooltipText}:hover + ${TooltipContent} {
    visibility: visible;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);

    padding: 8px 8px;
    &:before {
      border-color: transparent transparent rgba(0, 0, 0, 0.8)
        rgba(0, 0, 0, 0.8);
    }
  }
`;

const TooltipBox = ({ element, tooltip }: TooltipBoxProps) => {
  return (
    <TooltipCard>
      <TooltipText>{element}</TooltipText>
      <TooltipContent>{tooltip}</TooltipContent>
    </TooltipCard>
  );
};

export default TooltipBox;
