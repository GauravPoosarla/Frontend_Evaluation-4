import React from 'react';
import CollectionsSidebar from '../../components/CollectionsSidebar';
import MainContent from '../../components/MainContent';
import CollectionPage from '../../components/CollectionPage';
import './Home.css';
const Home = () => {
  const [isCollectionPage, setIsCollectionPage] = React.useState(false);
  const [collectionName, setCollectionName] = React.useState('');
  return (
    <div className='home'>
      <div className='home-sidebar'>
        <CollectionsSidebar setIsCollectionPage={setIsCollectionPage} setCollectionName={setCollectionName} />
      </div>
      <div className='home-main-content'>
        {!isCollectionPage ? <MainContent /> : <CollectionPage collectionName={collectionName} />}
      </div>
    </div>
  );
};

export default Home;
