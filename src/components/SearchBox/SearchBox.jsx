import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './SearchBox.module.css';

const SearchBox = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  function handleInputChange(e) {
    const { value } = e.target;
    setSearchQuery(value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    onSubmit(searchQuery);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="">
        <input
          type="text"
          name="query"
          placeholder="Search movies"
          value={searchQuery}
          onChange={handleInputChange}
          required
          className={s.input}
        />
      </label>
      <button type="submit" className={s.button}>
        Search
      </button>
    </form>
  );
};

SearchBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export { SearchBox };
