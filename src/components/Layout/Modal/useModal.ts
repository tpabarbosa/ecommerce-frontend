import { useState } from 'react';
export interface IUseModal {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  set: (value: boolean) => void;
}
const useModal = (initialState: boolean = false): IUseModal => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const set = (value: boolean) => {
    setIsOpen(value);
  };

  return {
    isOpen,
    open,
    close,
    toggle,
    set,
  };
};

export default useModal;
