import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { changeFilterFild } from '../../redux/filterSlice';
import scss from './filter.module.scss';


const Filter = () => {
  const dispatch = useDispatch();
  const handleChangeFilter = evt => {
    const { value } = evt.target;
    dispatch(changeFilterFild(value));
  };
  return (
    <label htmlFor="filter" className={scss.filter}>
      Find contact by name
      <input
        className={scss.input}
        type="text"
        name="filter"
        onChange={handleChangeFilter}
      />
    </label>
  );
};

export default Filter;

Filter.propTypes = {
  value: PropTypes.string,
};
