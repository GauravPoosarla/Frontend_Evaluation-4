import React from 'react';
import CollectionsSidebar from '../../components/CollectionsSidebar';
import MainContent from '../../components/MainContent';
import CollectionPage from '../../components/Collection';
import './Home.css';
const Home = () => {
  const [isCollectionPage, setIsCollectionPage] = React.useState(false);
  const [collectionId, setCollectionId] = React.useState('');
  const [collectionName, setCollectionName] = React.useState('');
  return (
    <div className='home'>
      <div className='home-sidebar'>
        <CollectionsSidebar
          setIsCollectionPage={setIsCollectionPage}
          setCollectionId={setCollectionId}
          setCollectionName={setCollectionName}
        />
      </div>
      <div className='home-main-content'>
        {!isCollectionPage ? (
          <MainContent />
        ) : (
          <CollectionPage collectionId={collectionId} collectionName={collectionName} />
        )}
      </div>
    </div>
  );
};

export default Home;
