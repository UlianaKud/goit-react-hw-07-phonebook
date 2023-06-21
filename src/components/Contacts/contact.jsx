import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  visibleContacts,
  selectIsLoading,
  selectError,
} from '../../redux/selectors';
import { deleteContactsThunk, fetchContactsThunk } from 'redux/thunks';
import scss from './contact.module.scss';

const Contact = () => {
  // const contacts = useSelector(selectContacts);
  // const filter = useSelector(selectFilter);
  const contacts = useSelector(visibleContacts);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  // const visibleContacts = () => {
  //   const normalizedFilter = filter?.toLowerCase();

  //   if (normalizedFilter !== '' && contacts?.length) {
  //     return contacts.filter(contact =>
  //       contact.name.toLowerCase().includes(normalizedFilter)
  //     );
  //   } else {
  //     return contacts;
  //   }
  // };
  const onDeleteContact = id => {
    dispatch(deleteContactsThunk(id));
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <ul className={scss.contactList}>
        {contacts.map(({ id, name, phone }) => {
          return (
            <li key={`${phone}-${name}`} className={scss.contactItem}>
              <div className={scss.contactWrapper}>
                <span>{name}:</span>
                <span className={scss.number}>{phone}</span>
                <button
                  type="button"
                  className={scss.button}
                  onClick={() => onDeleteContact(id)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

Contact.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default Contact;
