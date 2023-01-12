import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleNameChange = event => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchName.trim() === '') {
      toast.error('Fill in the search field');
      return;
    }

    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormBtn}>
          <span className={css.Label}>Search</span>
        </button>

        <input
          className={css.Input}
          type="text"
          name="searchName"
          placeholder="Search images and photos"
          value={searchName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.protoTypes = {
  handleSubmit: PropTypes.func,
  searchName: PropTypes.string,
  handleNameChange: PropTypes.func,
};
