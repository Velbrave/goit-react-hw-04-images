import React from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { getPost } from '../service/post';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends React.Component {
  state = {
    images: [],
    showModal: false,
    searchName: '',
    page: 1,
    totalHits: 0,
    isLoading: false,
    isError: false,
    bigImage: '',
  };

  async componentDidUpdate(_, prevState) {
    const { page, searchName } = this.state;

    if (prevState.searchName !== searchName || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const images = await getPost(page, searchName);
        if (images.hits.length === 0) {
          toast.error(`Nothing found for request: ${searchName}`);
          return;
        }
        this.setState(prev => ({
          images: page > 1 ? [...prev.images, ...images.hits] : images.hits,
          page,
          totalHits: images.total,
        }));
      } catch (error) {
        this.setState({ isError: true });
        console.log(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmitForm = searchName => {
    this.setState({ page: 1, searchName });
  };

  handleChangePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  openModal = event => {
    const bigImage = event.target.dataset.image;
    if (event.target.nodeName === 'IMG') {
      this.setState(state => ({
        showModal: !state.showModal,
        bigImage,
      }));
    }
  };

  render() {
    const { showModal, images, bigImage, isLoading, isError } = this.state;
    const itemsPerPage = 12;

    if (isError) {
      return <p>Something went wrong...</p>;
    }

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmitForm} />

        {images.length > 0 ? (
          <ImageGallery images={images} openModal={this.openModal} />
        ) : null}

        {isLoading && <Loader />}

        {showModal && (
          <Modal onClose={this.toggleModal} bigImage={bigImage}></Modal>
        )}
        {images.length > 0 && this.state.totalHits > itemsPerPage && (
          <Button onClick={this.handleChangePage} />
        )}
      </div>
    );
  }
}
