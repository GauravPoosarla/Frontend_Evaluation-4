import React from 'react';
import CollectionsSidebar from '../../components/CollectionsSidebar';
import MainContent from '../../components/MainContent';
import './Home.css';
const Home = () => {
  return (
    <div className='home'>
      <div className='home-sidebar'>
        <CollectionsSidebar />
      </div>
      <div className='home-main-content'>
        <MainContent />
      </div>
    </div>
  );
};

export default Home;
