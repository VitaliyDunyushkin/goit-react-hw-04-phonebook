import React, { useState } from 'react';
import PropTypes from 'prop-types';

import css from './contactForm.module.css';

export default function ContactForm({ onFormSubmit }) {
  const [friend, setFriend] = useState('');
  const [number, setNumber] = useState('');

  const contact = { name: friend, number: number };

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'friend') {
      setFriend(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };

  const reset = () => {
    setFriend('');
    setNumber('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    onFormSubmit(contact);
    reset();
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <label>
          Name
          <input
            className={css.input}
            type="text"
            name="friend"
            value={friend}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я
              ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe,
      dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de
      Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    </>
  );
}

ContactForm.propTypes = {
  state: PropTypes.exact({
    name: PropTypes.array.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onFormSubmit: PropTypes.func.isRequired,
};
