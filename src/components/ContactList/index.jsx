import { deleteContactFromServer } from '../../redux/operations';
import { useSelector, useDispatch } from 'react-redux';

function ContactList() {
  const filter = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts);
  const isLoading = useSelector(state => state.isLoading);
  const dispatch = useDispatch();
  const onDelete = id => dispatch(deleteContactFromServer(id));

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

export default ContactList;
