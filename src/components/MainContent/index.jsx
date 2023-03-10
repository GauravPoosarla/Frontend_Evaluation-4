import React from 'react';
import { useEffect, useState } from 'react';
import Search from '../../assets/icon-search-dark@3x.png';
import FieldRenderer from '../FieldRenderer';
import PopUp from '../PopUp';
import PropTypes from 'prop-types';
import axios from 'axios';
import './MainContent.css';

const MainContent = () => {
  const [collections, setCollections] = useState([]);
  const [clickedId, setClickedId] = useState(null);
  const [fields, setFields] = useState([]);
  const [isAddEditFieldOverlay, setIsAddEditFieldOverlay] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8001/all-collections', {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(response => {
        setCollections(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8001/get-content-fields/${clickedId}`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(response => {
        const fieldsResponse = [];
        response.data.forEach(field => {
          fieldsResponse.push(field.fields);
        });
        setFields(fieldsResponse);
      });
  }, [clickedId]);

  const clickHandler = event => {
    const clickedCollection = collections.find(collection => collection.collection_name === event.target.name);
    setClickedId(clickedCollection.id);
  };

  const contentHandler = () => {
    setIsAddEditFieldOverlay(true);
  };

  return (
    <div className='main-content'>
      {isAddEditFieldOverlay && <PopUp setIsAddEditFieldOverlay={setIsAddEditFieldOverlay} />}
      <div className='main-content-left'>
        <div className='main-content-header'>
          <h1>Content Types</h1>
        </div>
        <div className='main-content-collections'>
          <div className='main-content-sub-header'>
            <div className='main-content-total-number'>
              <p>{collections.length} </p>
              <p>Types</p>
            </div>
            <img src={Search} alt='search' />
          </div>
          <br />
          <button className='main-content-add-button' onClick={contentHandler}>
            + New Type
          </button>
          {collections.map((collection, idx) => (
            <div key={idx}>
              <button className='content-button' name={collection.collection_name} onClick={clickHandler}>
                <div>{collection.collection_name}</div>
                <div>{collection.Contents.length}</div>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className='main-content-right'>
        {clickedId && <FieldRenderer collections={collections} fields={fields} clickedId={clickedId} />}
      </div>
    </div>
  );
};

MainContent.propTypes = {
  collections: PropTypes.array,
  clickedId: PropTypes.number,
};

export default MainContent;
