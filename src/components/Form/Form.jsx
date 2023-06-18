import { addContact } from '../../redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../redux/selectors';
import Notiflix from 'notiflix';
import { nanoid } from '@reduxjs/toolkit';
import scss from './form.module.scss';

const Form = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.target;

    const normalizedname = form.elements.name.value.toLowerCase();

    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizedname)
    ) {
      Notiflix.Notify.warning(`${normalizedname} is already in contacts`);
      return;
    }
    console.log(form.elements.name.value);

    dispatch(
      addContact({
        id: nanoid(),
        name: form.elements.name.value,
        number: form.elements.number.value,
      })
    );
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={scss.form}>
      <label htmlFor="name" className={scss.label}>
        <span>Name</span>
        <div className={scss.inputWrapper}>
          <input
            className={scss.input}
            type="text"
            name="name"
            placeholder='Name'
            pattern="[A-Za-z]{1,32}"
            title="Username must be one word"
            required
          />
          <span></span>
        </div>
      </label>
      <label htmlFor="number" className={scss.label}>
        <span>Number</span>
        <div className={scss.inputWrapper}>
          <input
            className={scss.input}
            type="tel"
            name="number"
            placeholder='Number'
            pattern="[\+]\d{2}[\(]\d{3}[\)]\d{7}"
            title="Phone number must have format +38(050)1234567 and can start with +"
            required
          />
          <span></span>
        </div>
      </label>
      <button type="submit" className={scss.button}>
        Add contact
      </button>
    </form>
  );
};

export default Form;
