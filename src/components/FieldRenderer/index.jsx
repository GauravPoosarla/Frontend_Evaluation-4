import React from 'react';
import PropTypes from 'prop-types';
import './FieldRenderer.css';
import Edit from '../../assets/user-edit-text-message-note@3x.png';
import Delete from '../../assets/trash-delete-recycle-bin-bucket-waste@3x.png';

const FieldRenderer = ({ collections, fields, clickedId }) => {
  const content = collections.find(collection => collection.id === clickedId);
  // const name = content.collection_name;
  return (
    <div className='field-renderer'>
      <div className='field-renderer-header'>
        <h1>Fields</h1>
      </div>
      <div className='field-renderer-fields'>
        <div className='collection-name'>{content.collection_name}</div>
        <div className='collection-fields'>
          {fields.length} <p>Fields</p>
        </div>
        <div className='field-renderer-main'>
          <button className='field-renderer-add-button'>Add Field</button>
          {fields.map((field, idx) => (
            <button className='field-renderer-button' key={idx}>
              <div>{field}</div> <div className='field-renderer-button-text'>{'Text'}</div>
              <div>
                <img src={Edit} alt='edit' /> <img src={Delete} alt='delete' />
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
