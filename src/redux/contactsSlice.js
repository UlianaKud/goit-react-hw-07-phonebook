import { createSlice } from '@reduxjs/toolkit';
const contactsInitialState = [];
const contactSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
      addContact(state, action) {
        state.push(action.payload);
      },
  
    deleteContact(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },

});

export const { addContact, deleteContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
