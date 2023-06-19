import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../../redux/selectors';
import { getFilter } from '../../redux/selectors';
import { deleteContactsThunk, fetchContactsThunk } from 'redux/thunks';
import scss from './contact.module.scss';

const Contact = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, []);

  const visibleContacts = () => {
    const normalizedFilter = filter?.toLowerCase();

    if (normalizedFilter !== '' && contacts?.length) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    } else {
      return contacts;
    }
  };
  const onDeleteContact = id => {
    dispatch(deleteContactsThunk(id));
  };

  return (
    <ul className={scss.contactList}>
      {visibleContacts()?.map(({ id, name, phone }) => {
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
