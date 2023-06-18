import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../../redux/selectors';
import { getFilter } from '../../redux/selectors';
import { deleteContact } from '../../redux/contactsSlice';
import scss from './contact.module.scss';

const Contact = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const visibleContacts = () => {
    const normalizedFilter = filter?.toLowerCase();

    if (normalizedFilter !== '' && contacts?.length) {
      console.log('visibleContacts', normalizedFilter, contacts);
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    } else {
      return contacts;
    }
  };
  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={scss.contactList}>
      {visibleContacts()?.map(({ id, name, number }) => {
        return (
          <li key={`${number}-${name}`} className={scss.contactItem}>
            <div className={scss.contactWrapper}>
              <span>{name}:</span>
              <span className={scss.number}>{number}</span>
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

export default Contact;

Contact.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
