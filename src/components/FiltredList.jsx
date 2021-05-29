import { useSelector, useDispatch } from 'react-redux';
import { deleteContactFromServer } from '../redux/operations';

const FiltredList = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const isLoading = useSelector(state => state.isLoading);
  const dispatch = useDispatch();
  const onDelete = id => dispatch(deleteContactFromServer(id));

  function filteredList() {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  return (
    <section className="contact_list">
      {filteredList().map(contact => {
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
};

export default FiltredList;
