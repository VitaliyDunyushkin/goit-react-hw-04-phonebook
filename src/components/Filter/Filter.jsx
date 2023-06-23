import React from 'react';
import PropTypes from 'prop-types';

import css from './filter.module.css';

export default function Filter({ onSearch, filter }) {
  const handleChange = event => {
    onSearch(event.target.value);
  };

  return (
    <>
      <h3 className={css.title}>Find contacts by name</h3>
      <input
        className={css.input}
        type="text"
        name="filter"
        value={filter}
        onChange={handleChange}
        title="Search contacts"
      />
    </>
  );
}

Filter.propTypes = {
  onSearch: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
