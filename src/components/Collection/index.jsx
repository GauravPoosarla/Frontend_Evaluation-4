/* eslint-disable */
import React from 'react';
import { useState } from 'react';
import './Collection.css';
import { useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Edit from '../../assets/user-pencil-write-ui-education@3x.png';
import Delete from '../../assets/trash-delete-recycle-bin-bucket-waste@3x.png';
import AddNewEntry from '../AddNewEntry';
import EditEntry from '../EditEntry';

const Collections = props => {
  const { collectionId, collectionName } = props;
  const [collectionData, setCollectionData] = useState(null);
  const [isAddEditFieldOverlay, setIsAddEditFieldOverlay] = useState(false);
  const [onChanged, setOnChanged] = useState(false);
  const [entryModalVisibility, setEntryModalVisibility] = useState(false);
  const [contentId, setContentId] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8001/all-entries-collection/${collectionId}`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(data => {
        setCollectionData(data);
      });
  }, [onChanged]);

  if (collectionData == null) return <p>Loading..</p>;

  const uniqueFields = [];
  {
    collectionData.data.map(item => {
      Object.keys(item.values).map(key => {
        if (!uniqueFields.includes(key)) {
          uniqueFields.push(key);
        }
      });
    });
  }

  const addEventHandler = () => {
    setEntryModalVisibility(true);
  };

  const editHandler = contentId => {
    setIsAddEditFieldOverlay(true);
    setContentId(contentId);
  };

  const deleteHandler = contentId => {
    axios
      .delete(`http://localhost:8001/delete-content/${contentId}`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(response => {
        console.log(response.data);
        setOnChanged(!onChanged);
      });
  };

  return (
    <div className='Collections'>
      {entryModalVisibility && (
        <AddNewEntry
          setEntryModalVisibility={setEntryModalVisibility}
          collectionId={collectionId}
          collectionName={collectionName}
          setOnChanged={setOnChanged}
          onChanged={onChanged}
        />
      )}
      {isAddEditFieldOverlay && (
        <EditEntry
          setIsAddEditFieldOverlay={setIsAddEditFieldOverlay}
          collectionId={collectionId}
          collectionName={collectionName}
          setOnChanged={setOnChanged}
          onChanged={onChanged}
          contentId={contentId}
        />
      )}
      <div className='Collections-header'>
        <span className='Collections-header-name'>{collectionName}</span>
      </div>
      <div className='Collections-content'>
        <div className='Collections-content-header'>
          <span className='Collections-content-header-count-left'>{collectionData.data.length} Entries Found</span>
          <span className='Collections-content-header-count-right' onClick={addEventHandler}>
            Add a new entry{' '}
          </span>
        </div>
        <div className='Collections-content-main'>
          {uniqueFields.map((item, index) => {
            return (
              <div key={index} className='Collections-content-main-field'>
                <p className='field'>{item}</p>
              </div>
            );
          })}
          {uniqueFields.length > 0 && <p className='field-actions'>Actions</p>}
        </div>
        <div className='rows'>
          {collectionData.data.map((item, index) => {
            return (
              <div key={index} className='Collections-content-main-field-values'>
                {uniqueFields.map((field, index) => {
                  return (
                    <div>
                      <div key={index} className='Collections-content-main'>
                        <p>{item.values[field]}</p>
                      </div>
                    </div>
                  );
                })}
                <div className='actions'>
                  <img
                    src={Edit}
                    alt='edit'
                    onClick={() => {
                      editHandler(collectionData.data[index].content_id);
                    }}
                  />
                  <img
                    src={Delete}
                    alt='delete'
                    onClick={() => {
                      deleteHandler(collectionData.data[index].content_id);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Collections.propTypes = {
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
};

export default Collections;
