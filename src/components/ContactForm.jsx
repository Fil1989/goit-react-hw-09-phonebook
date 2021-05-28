import { handleFilterChange } from '../redux/actions';
import { connect } from 'react-redux';
import { postContactToServer } from '../redux/operations';
import { useState } from 'react';

import PropTypes from 'prop-types';

function ContactForm({ filter, onFilterChange, onSubmitPostContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

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
          />
          <label htmlFor="addNumber">Number</label>
          <input
            type="tel"
            name="number"
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            placeholder="Enter a number"
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
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    onFilterChange: e => dispatch(handleFilterChange(e)),
    onSubmitPostContact: e => dispatch(postContactToServer(e)),
  };
};

ContactForm.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func,
  onFilterChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
