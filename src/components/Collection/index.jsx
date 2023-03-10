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

const Collections = props => {
  const { collectionId, collectionName } = props;
  const [collectionData, setCollectionData] = useState(null);
  const [isAddEditFieldOverlay, setIsAddEditFieldOverlay] = useState(false);
  const [onChanged, setOnChanged] = useState(false);
  const [entryModalVisibility, setEntryModalVisibility] = useState(false);

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

  console.log(collectionData);
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
    // axios call to add the field: TODO
  };

  const editHandler = () => {
    setIsAddEditFieldOverlay(true);
    // axios call to edit the field: TODO
  };

  console.log(uniqueFields);
  return (
    <div className='Collections'>
      {entryModalVisibility && <AddNewEntry setEntryModalVisibility={setEntryModalVisibility} />}
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
          {uniqueFields.length > 0 && <p className='field'>Actions</p>}
        </div>
        <div>
          {collectionData.data.map((item, index) => {
            return (
              <div key={index} className='Collections-content-main-field'>
                {uniqueFields.map((field, index) => {
                  return (
                    <div key={index} className='Collections-content-main-field-values'>
                      <p>{item.values[field]}</p>
                      <div className='actions'>
                        <img
                          src={Edit}
                          alt='edit'
                          onClick={() => {
                            editHandler(collectionData.data.content_id);
                          }}
                        />
                        <img src={Delete} alt='delete' />
                      </div>
                    </div>
                  );
                })}
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
