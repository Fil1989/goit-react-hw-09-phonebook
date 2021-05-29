import { handleFilterChange } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { postContactToServer } from '../redux/operations';
import { useState, useRef, useEffect } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const onFilterChange = e => dispatch(handleFilterChange(e));
  const onSubmitPostContact = e => dispatch(postContactToServer(e));

  const onSubmit = e => {
    onSubmitPostContact(e);
    setName('');
    setNumber('');
  };
  const onNameChange = e => {
    setName(e.value);
  };
  const onNumberChange = e => {
    setNumber(e.value);
  };
  return (
    <>
      <section className="add_contact">
        <form onSubmit={onSubmit} className="add_contact__form">
          <label htmlFor="addContact">Name</label>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            placeholder="Name of contact"
            onChange={onNameChange}
            id="addContact"
            value={name}
            ref={inputRef}
          />
          <label htmlFor="addNumber">Phone</label>
          <input
            type="tel"
            name="number"
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            placeholder="Phone number"
            onChange={onNumberChange}
            id="addNumber"
            value={number}
          />
          <button type="submit" className="btn">
            Add contact
          </button>
        </form>
      </section>
      <section className="filter_contacts">
        <h2>Contacts</h2>
        <label htmlFor="addFilter">Filter contacts by name</label>

        <input
          name="filter"
          placeholder="Enter a filter"
          type="text"
          onChange={onFilterChange}
          value={filter}
          id="addFilter"
        />
      </section>
    </>
  );
}

export default ContactForm;
