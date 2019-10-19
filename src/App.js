import React from 'react';

import Layout from './components/Layout/Layout';
import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';
import './App.css';

function App() {
  return (
    <Layout
      header={
          <MainNavigation/>
      }
    />
  );
}

export default App;
