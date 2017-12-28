import React from 'react';
import { Route } from 'react-router-dom';
// components
import AuthContainer from './Authentication/AuthContainer';
import NavbarContainer from './Navbar/NavbarContainer';
import HomeContainer from '../containers/Home/HomeContainer';
import ProfileContainer from '../containers/Profile/ProfileContainer';

const App = ({ children }) => (
  <div className='App'>
    <AuthContainer />
    <NavbarContainer />
    <div className='App_content'>
      <Route exact path='/' component={ HomeContainer }/>
      <Route exact path='/profile' component={ ProfileContainer }/>
    </div>
  </div>
);

export default App;