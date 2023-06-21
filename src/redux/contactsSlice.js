import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  fetchContactsThunk,
  addContactsThunk,
  deleteContactsThunk,
} from './thunks';

const handlePending = state => {
  state.isLoading = true;
  state.error = '';
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const handleFetchContacts = (state, { payload }) => {
  state.isLoading = false;
  state.items = payload;
};

const handleAddContacts = (state, { payload }) => {
  state.isLoading = false;
  state.items.push(payload);
};

const handleDeleteContacts = (state, { payload }) => {
  state.isLoading = false;
  state.items = state.items?.filter(item => item.id !== payload.id);
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: initialState.contacts,
  extraReducers: builder => {
    builder
      .addCase(fetchContactsThunk.fulfilled, handleFetchContacts)
      .addCase(addContactsThunk.fulfilled, handleAddContacts)
      .addCase(deleteContactsThunk.fulfilled, handleDeleteContacts)
      .addMatcher(action => {
        return action.type.endsWith('/pending');
      }, handlePending)
      .addMatcher(action => {
        return action.type.endsWith('/rejected');
      }, handleRejected);
  },
});

export const contactReducer = contactSlice.reducer;
