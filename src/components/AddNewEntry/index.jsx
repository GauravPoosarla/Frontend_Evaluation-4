/* eslint-disable react/prop-types */
import React from 'react';
import './AddNewEntry.css';
import axios from 'axios';

export default function AddNewEntry(props) {
  const { setEntryModalVisibility, onChange, setOnChange } = props;
  const selectedCollection = {
    fields: ['name', 'description', 'price', 'image'],
  };
  const createCollection = () => {
    const newEntry = {};
    selectedCollection.fields.forEach(field => {
      newEntry[field] = document.getElementById(field).value;
    });
    axios
      .post(
        'http://localhost:8001/create-content/:content_id',
        { content: { ...newEntry } },
        { headers: { authorization: localStorage.getItem('token') } }
      )
      .then(response => {
        console.log(response.data);
        setOnChange(!onChange);
      });
    setEntryModalVisibility(false);
  };
  return (
    <div className='addNewEntryModalContainerOut'>
      <div className='addNewEntryModalContainer'>
        <h1>New {'Collection Name'}</h1>
        {selectedCollection.fields.map((field, index) => {
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
          <button onClick={createCollection} type='submit'>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
