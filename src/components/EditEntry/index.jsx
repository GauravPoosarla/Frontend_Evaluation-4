/* eslint-disable react/prop-types */
import React from 'react';
import './EditEntry.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function EditEntry(props) {
  const { setIsAddEditFieldOverlay, onChanged, setOnChanged, collectionId, collectionName, contentId } = props;
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedCollectionFields, setSelectedCollectionFields] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8001/all-entries-collection/${collectionId}`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(data => setSelectedCollection(data));
  }, []);

  useEffect(() => {
    const collectionFields = [];
    axios
      .get(`http://localhost:8001/get-content-fields/${collectionId}`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(data => {
        data.data.forEach(field => {
          collectionFields.push(field.fields);
        });
        setSelectedCollectionFields(collectionFields);
      });
  }, []);

  if (selectedCollection == null) return <p>Loading..</p>;

  const editCollection = () => {
    const newEntry = {};
    selectedCollectionFields.forEach(field => {
      newEntry[field] = document.getElementById(field).value;
    });
    axios
      .put(
        `http://localhost:8001/update-content/${contentId}`,
        { content: { ...newEntry } },
        { headers: { authorization: localStorage.getItem('token') } }
      )
      .then(response => {
        console.log(response.data);
        setOnChanged(!onChanged);
      });
    setIsAddEditFieldOverlay(false);
  };

  return (
    <div className='addNewEntryModalContainerOut'>
      <div className='addNewEntryModalContainer'>
        <h1>Edit {collectionName}</h1>
        {selectedCollectionFields.map((field, index) => {
          return (
            <div key={index} className='field'>
              <label>{field}</label>
              <br />
              <input type='text' id={field} />
            </div>
          );
        })}
        <div className='buttons'>
          <button id='cancelButton' onClick={() => setIsAddEditFieldOverlay(false)} type='cancel'>
            Cancel
          </button>
          <button onClick={editCollection} type='submit'>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
