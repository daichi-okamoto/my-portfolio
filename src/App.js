import React, { useState } from 'react';
import Loading from './components/Loading/Loading';
import MainContent from './components/MainContent';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingFinish = () => {
    setIsLoading(false);
  };

  return (
    <div className="App">
      {isLoading ? (
        <Loading onFinish={handleLoadingFinish} />
      ) : (
        <MainContent />
      )}
    </div>
  );
}

export default App;
