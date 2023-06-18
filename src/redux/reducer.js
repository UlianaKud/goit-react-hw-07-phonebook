import { combineReducers } from '@reduxjs/toolkit';
import { contactReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';

export const reducer = combineReducers({
    contacts: contactReducer,
    filter: filterReducer,
})