import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContacts } from 'api/getContacts';
import { addContacts } from 'api/getContacts';
import { deleteContacts } from 'api/getContacts';

export const fetchContactsThunk = createAsyncThunk('contacts/fetchAll', () => {
  return fetchContacts();
});

export const addContactsThunk = createAsyncThunk('contacts/addContact', (payload) => {
    console.log(payload);
    return addContacts(payload);
  });

  export const deleteContactsThunk = createAsyncThunk('contacts/deleteContact', (id, { rejectWithValue }) => {
    console.log('deleteContactsThunk');
    try {
        return deleteContacts(id)
    } catch (error) {
        return rejectWithValue(error)
    }
}) 