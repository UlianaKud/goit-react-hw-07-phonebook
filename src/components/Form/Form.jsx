import { useRef, useEffect } from 'react';
import { addContactsThunk } from 'redux/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/selectors';
import Notiflix from 'notiflix';
import { nanoid } from '@reduxjs/toolkit';
import scss from './form.module.scss';
import InputMask from 'react-input-mask';

const Form = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const inputRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    input.getSelection();
  }, []);

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

    dispatch(
      addContactsThunk({
        id: nanoid(),
        name: form.elements.name.value,
        phone: form.elements.number.value,
      })
    );
    inputRef.current.setInputValue('');
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
            placeholder="Name"
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
          <InputMask
            className={scss.input}
            type="tel"
            name="number"
            placeholder="Number"
            pattern="[\+]\d{2}[\(]\d{3}[\)]\d{7}"
            ref={inputRef}
            title="Phone number must have format +38(050)1234567 and can start with +"
            required
            mask="+3\8(999)9999999"
            maskChar=" "
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
