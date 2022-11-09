import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';

class Routes extends React.Component {
  render() {
    return (
      <Route exact path="/" component={ Login } />
    );
  }
}

export default Routes;
