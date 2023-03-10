import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Search from '../../assets/icon-search-dark@3x.png';
import PropTypes from 'prop-types';
import './CollectionsSidebar.css';

const CollectionsSidebar = props => {
  const { setIsCollectionPage, setCollectionId, setCollectionName } = props;
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8001/all-collections', {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(response => {
        setCollections(response.data);
      });
  }, []);

  return (
    <div className='side-bar'>
      <div className='side-bar-header'>
        <h1>CMS+</h1>
      </div>
      <div className='side-bar-collections'>
        <div className='sidebar-sub-header'>
          <p>COLLECTION TYPES</p>
          <img src={Search} alt='search' />
        </div>
        <br />
        <ul className='sidebar-collections'>
          {collections.map((collection, index) => (
            <>
              <li
                key={index}
                onClick={() => {
                  setIsCollectionPage(true);
                  setCollectionId(collection.collection_id);
                  setCollectionName(collection.collection_name);
                }}>
                {collection.collection_name}
              </li>
              <br />
            </>
          ))}
        </ul>
      </div>
      <div className='content-type-builder'>
        <p>CONTENT TYPE BUILDER</p>
      </div>
    </div>
  );
};

CollectionsSidebar.propTypes = {
  setIsCollectionPage: PropTypes.func.isRequired,
  setCollectionId: PropTypes.func.isRequired,
  setCollectionName: PropTypes.func.isRequired,
};

export default CollectionsSidebar;
