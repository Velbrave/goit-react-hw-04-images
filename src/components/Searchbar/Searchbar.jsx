import React from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

class Searchbar extends React.Component {
  state = {
    searchName: '',
  };

  handleNameChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { searchName } = this.state;

    if (searchName.trim() === '') {
      toast.error('Fill in the search field');
      return;
    }

    this.props.onSubmit(searchName);
    this.setState({ searchName: '' });
  };

  render() {
    const { searchName } = this.state;
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormBtn}>
            <span className={css.Label}>Search</span>
          </button>

          <input
            className={css.Input}
            type="text"
            name="searchName"
            placeholder="Search images and photos"
            value={searchName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;

Searchbar.protoTypes = {
  handleSubmit: PropTypes.func,
  searchName: PropTypes.string,
  handleNameChange: PropTypes.func,
};
