import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, bigImage }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={bigImage} alt="" loading="lazy" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.protoTypes = {
  handleBackdropClick: PropTypes.func,
  bigImage: PropTypes.string.isRequired,
};
