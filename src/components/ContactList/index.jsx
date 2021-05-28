// import { handleDelete } from '../../redux/actions';
import { deleteContactFromServer } from '../../redux/operations';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function ContactList({ filter, contacts, isLoading, onDelete }) {
  return (
    <section className="contact_list">
      {filter.length === 0 &&
        contacts.map(contact => {
          return (
            <li key={contact.id}>
              {contact.name}: {contact.number}
              <button onClick={() => onDelete(contact.id)}>Delete</button>
            </li>
          );
        })}
      {isLoading && <p>Loading...</p>}
    </section>
  );
}

const mapStateToProps = state => {
  return {
    filter: state.filter,
    contacts: state.contacts,
    isLoading: state.isLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => dispatch(deleteContactFromServer(id)),
  };
};
ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
