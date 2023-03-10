/* eslint-disable react/prop-types */
import React from 'react';
import './AddNewEntry.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function AddNewEntry(props) {
  const { setEntryModalVisibility, onChanged, setOnChanged, collectionId, collectionName } = props;
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

  const createCollection = () => {
    const newEntry = {};
    selectedCollectionFields.forEach(field => {
      newEntry[field] = document.getElementById(field).value;
    });
    axios
      .post(
        `http://localhost:8001/create-content/${collectionId}`,
        { content: { ...newEntry } },
        { headers: { authorization: localStorage.getItem('token') } }
      )
      .then(response => {
        console.log(response.data);
        setOnChanged(!onChanged);
      });
    setEntryModalVisibility(false);
  };

  return (
    <div className='addNewEntryModalContainerOut'>
      <div className='addNewEntryModalContainer'>
        <h1>New {collectionName}</h1>
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
          <button id='cancelButton' onClick={() => setEntryModalVisibility(false)} type='cancel'>
            Cancel
          </button>
          <button className='add-button' onClick={createCollection} type='submit'>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
