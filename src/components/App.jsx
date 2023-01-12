import { useEffect, useState } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { getPost } from '../service/post';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [bigImage, setBigImage] = useState('');

  useEffect(() => {
    if (searchName === '') {
      return;
    }
    setIsLoading(true);
    const makeRequest = async () => {
      try {
        const images = await getPost(page, searchName);
        if (images.hits.length === 0) {
          toast.error(`Nothing found for request: ${searchName}`);
          return;
        }
        setImages(prev => [...prev, ...images.hits]);
        setPage(page);
        setTotalHits(images.total);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    makeRequest();
  }, [page, searchName]);

  const handleSubmitForm = searchName => {
    setPage(1);
    setSearchName(searchName);
    setImages([]);
  };

  const handleChangePage = () => {
    setPage(prev => prev + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = event => {
    const bigImage = event.target.dataset.image;
    if (event.target.nodeName === 'IMG') {
      setShowModal(!showModal);
      setBigImage(bigImage);
    }
  };

  const itemsPerPage = 12;

  if (isError) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div>
      <Searchbar onSubmit={handleSubmitForm} />

      {images.length > 0 ? (
        <ImageGallery images={images} openModal={openModal} />
      ) : null}

      {isLoading && <Loader />}

      {showModal && <Modal onClose={toggleModal} bigImage={bigImage}></Modal>}
      {images.length > 0 && totalHits > itemsPerPage && (
        <Button onClick={handleChangePage} />
      )}
    </div>
  );
};
