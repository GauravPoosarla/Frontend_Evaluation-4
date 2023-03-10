import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Search from '../../assets/icon-search-dark@3x.png';
import './CollectionsSidebar.css';

const CollectionsSidebar = () => {
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
          {collections.map(collection => (
            <>
              <li key={collection.id}>{collection.collection_name}</li>
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

export default CollectionsSidebar;
