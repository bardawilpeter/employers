import React, { Fragment } from 'react';

import Layout from './components/Layout/Layout';
import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';
import LoginPage from './pages/Auth/Login';
import './App.css';

function App() {
  return (
    <Fragment>
      <Layout
        header={
          <MainNavigation />
        }
      />
      <LoginPage />
    </Fragment>
  );
}

export default App;
