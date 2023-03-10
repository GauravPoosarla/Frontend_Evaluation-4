/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './PopUp.css';
export default function PopUpEditField(props) {
  const { onChanged, setOnChanged } = props;
  const [newFieldName, setNewFieldName] = useState({
    field: '',
  });

  const handleClickCancel = () => {
    props.setIsEditFieldOverlay(false);
  };
  const handleChangeFieldName = event => {
    setNewFieldName(previousData => ({
      ...previousData,
      field: event.target.value,
    }));
  };
  const handleClickAdd = async () => {
    const response = await axios.post(
      `http://localhost:8001/create-content-fields/${props.clickedId}`,
      { field: newFieldName.field },
      { headers: { authorization: localStorage.getItem('token') } }
    );
    props.setIsEditFieldOverlay(false);
    setOnChanged(!onChanged);
  };
  return (
    <div className='add-edit-overlay-wrapper'>
      <div className='add-edit-overlay-content'>
        <div className='add-edit-overlay-top'>
          <span className='header-top'>Add Field</span>
        </div>
        <div className='add-edit-overlay-middle'>
          <span className='add-edit-overlay-content-name'>Field Name</span>
          <input
            type='text'
            value={newFieldName.field}
            className='add-edit-overlay-content-name'
            onChange={handleChangeFieldName}
          />
        </div>
        <div className='add-edit-overlay-bottom'>
          <span className='add-edit-overlay-cancel-button' onClick={handleClickCancel}>
            Cancel
          </span>
          <span className='add-edit-overlay-add-button' onClick={handleClickAdd}>
            Add
          </span>
        </div>
      </div>
    </div>
  );
}
PopUpEditField.propTypes = {
  setIsEditFieldOverlay: PropTypes.func.isRequired,
  clickedId: PropTypes.string.isRequired,
  onChanged: PropTypes.bool.isRequired,
  setOnChanged: PropTypes.func.isRequired,
};
