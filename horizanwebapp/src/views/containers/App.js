import React from 'react';
import { Route } from 'react-router-dom';
// components
import AuthContainer from './Authentication/AuthContainer';
import NavbarContainer from './Navbar/NavbarContainer';
import HomeContainer from '../containers/Home/HomeContainer';
// import FeedBackContainer from '../containers/FeedBack/FeedBackContainer';
// import NavbarContainer from '../containers/Navbar/NavbarContainer';
// consts
// import links from '../consts/links';

const App = ({ children }) => (
  <div className='App'>
    <AuthContainer />
    <NavbarContainer />
    <div className='App_content'>
      <Route exact path='/' component={ HomeContainer }/>
    </div>
  </div>
);

export default App;