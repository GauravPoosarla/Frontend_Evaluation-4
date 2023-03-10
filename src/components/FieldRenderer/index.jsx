import React from 'react';
import PropTypes from 'prop-types';
import './FieldRenderer.css';
import Edit from '../../assets/user-edit-text-message-note@3x.png';
import Delete from '../../assets/trash-delete-recycle-bin-bucket-waste@3x.png';
import PopUpAddField from '../PopUpAddField';
import { useState } from 'react';
import axios from 'axios';

const FieldRenderer = ({ collections, fields, clickedId }) => {
  const content = collections.find(collection => collection.id === clickedId);
  const [isAddEditFieldOverlay, setIsAddEditFieldOverlay] = useState(false);
  const [field, setField] = useState('');

  const addHandler = () => {
    setIsAddEditFieldOverlay(true);
  };

  const deleteHandler = async field => {
    const response = await axios.get(`http://localhost:8001/get-content-fields/${clickedId}`, {
      headers: { authorization: localStorage.getItem('token') },
    });
    console.log(response);
    const fieldId = response.data.find(fieldContent => fieldContent.fields === field).field_id;
    await axios.delete(`http://localhost:8001/delete-content-field/${fieldId}`, {
      headers: { authorization: localStorage.getItem('token') },
    });
  };
  return (
    <div className='field-renderer'>
      {isAddEditFieldOverlay && (
        <PopUpAddField
          collections={collections}
          clickedId={clickedId}
          setIsAddEditFieldOverlay={setIsAddEditFieldOverlay}
        />
      )}
      <div className='field-renderer-header'>
        <h1>Fields</h1>
      </div>
      <div className='field-renderer-fields'>
        <div className='collection-name'>{content.collection_name}</div>
        <div className='collection-fields'>
          {fields.length} <p>Fields</p>
        </div>
        <div className='field-renderer-main'>
          <button className='field-renderer-add-button' onClick={addHandler}>
            Add Field
          </button>
          {fields.map((field, idx) => (
            <button className='field-renderer-button' key={idx}>
              <div>{field}</div> <div className='field-renderer-button-text'>{'Text'}</div>
              <div>
                <img src={Edit} alt='edit' />{' '}
                <img
                  src={Delete}
                  alt='delete'
                  onClick={() => {
                    deleteHandler(field);
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

FieldRenderer.propTypes = {
  collections: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  clickedId: PropTypes.number.isRequired,
};

export default FieldRenderer;
