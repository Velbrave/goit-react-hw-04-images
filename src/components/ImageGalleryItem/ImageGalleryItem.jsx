import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ smallImage, bigImage, openModal }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={openModal}>
      <img
        className={css.Image}
        src={smallImage}
        alt=""
        data-image={bigImage}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.protoTypes = {
  smallImage: PropTypes.string.isRequired,
  bigImage: PropTypes.string.isRequired,
  openModal: PropTypes.func,
};
