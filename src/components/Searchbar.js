import React, { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = form.elements.searchInput.value;
    this.props.onSubmit({ inputValue });
    form.reset();
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.formButton}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            name="searchInput"
            className={css.formInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
