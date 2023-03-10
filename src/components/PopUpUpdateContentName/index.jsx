/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './PopUpUpdateContentName.css';
export default function PopUpUpdateContentName(props) {
  const { collections, collectionName, onChanged, setOnChanged } = props;
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

  const collectionId = collections.filter(collection => collection.name === collectionName)[0].collection_id;
  console.log(collectionId);

  const handleClickAdd = async () => {
    const response = await axios.post(
      `http://localhost:8001/update-collection/${collectionId}`,
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
          <span className='header-top'>Content Name</span>
        </div>
        <div className='add-edit-overlay-middle'>
          <span className='add-edit-overlay-content-name'>New Content Name</span>
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
PopUpUpdateContentName.propTypes = {
  setIsEditFieldOverlay: PropTypes.func.isRequired,
  collections: PropTypes.arrayOf(PropTypes.object).isRequired,
  collectionName: PropTypes.string.isRequired,
  onChanged: PropTypes.bool.isRequired,
  setOnChanged: PropTypes.func.isRequired,
};
