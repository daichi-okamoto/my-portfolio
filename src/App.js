// src/App.js
import React, { useState } from 'react';
import Loading from './components/Loading';
import MainContent from './components/MainContent';

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
