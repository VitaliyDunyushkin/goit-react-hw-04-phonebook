import React, { useState, useEffect, useRef } from 'react';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { nanoid } from 'nanoid';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    savedContacts && setContacts(JSON.parse(savedContacts));
  }, []);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // /////=======================================================================
  //   componentDidMount() {
  //     contacts = localStorage.getItem('contacts');

  //     if (contacts !== null) {
  //       this.setState({ contacts: JSON.parse(contacts) });
  //     }
  //   }

  //   componentDidUpdate(prevProps, prevState) {
  //     if (this.state.contacts !== prevState.contacts) {
  //       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //     }
  //   }

  const formSubmitHandler = ({ name, number }) => {
    const newContact = { name, number, id: nanoid() };
    const message = name + ' is already in contacts';

    if (contacts.find(contact => contact.name === name)) {
      alert(message);
    } else {
      setContacts(prevState => [...prevState, newContact]);
    }
  };

  const handleDelete = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const contactsFiltered = () =>
    contacts.filter(contact => {
      const nameInLowerCase = contact.name.toLowerCase();
      return nameInLowerCase.includes(filter.toLowerCase());
    });

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={formSubmitHandler} />
      <hr />

      <h2>Contacts</h2>
      <Filter onSearch={setFilter} filter={filter} />
      <ContactList contacts={contactsFiltered()} onClick={handleDelete} />
    </>
  );
}
