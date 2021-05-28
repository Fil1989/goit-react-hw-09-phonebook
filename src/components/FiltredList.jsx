import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteContactFromServer } from '../redux/operations';

// import { handleDelete } from '../redux/actions';

const FiltredList = props => {
  function filteredList() {
    return props.contacts.filter(contact =>
      contact.name.toLowerCase().includes(props.filter.toLowerCase()),
    );
  }

  return (
    <section className="contact_list">
      {filteredList().map(contact => {
        return (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button onClick={() => props.onDelete(contact.id)}>Delete</button>
          </li>
        );
      })}
      {props.isLoading && <p>Loading...</p>}
    </section>
  );
};

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    filter: state.filter,
    isLoading: state.isLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => dispatch(deleteContactFromServer(id)),
  };
};
FiltredList.propTypes = {
  contacts: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(FiltredList);
