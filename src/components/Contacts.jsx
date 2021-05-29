import { useEffect } from 'react';
import FiltredList from './FiltredList';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import { useSelector, useDispatch } from 'react-redux';
import { takeContactsFromServer } from '../redux/operations';

const Contacts = () => {
  useEffect(() => {
    onTakeContactsFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const onTakeContactsFromServer = () => dispatch(takeContactsFromServer());

  return (
    <main className="main">
      <ContactForm />

      <ul>
        {filter.length === 0 && <ContactList />}
        {filter.length !== 0 && <FiltredList />}
      </ul>
    </main>
  );
};

export default Contacts;
