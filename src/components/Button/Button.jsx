import css from './Button.module.css';
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <button className={css.Button} type="button" onClick={onClick}>
      load more
    </button>
  );
};

export default Button;

Button.protoTypes = {
  onClick: PropTypes.func.isRequired,
};
