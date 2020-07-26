import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'


import { currentUserSelector } from './redux/user/user.selectors'
import { checkUserSession } from './redux/user/user.actions';
import { signOutStart } from './redux/user/user.actions';

import LoginPage from './pages/login-page/login-page.component';
import RegisterPage from './pages/register-page/register-page.component';
import GalleryPage from './pages/gallery-page/gallery-page.component';

import './App.css';

const App = ({ checkUserSession, currentUser, signOutStart }) => {
  const signOutStyle = {
    display : `${currentUser? "block" : "none"}`,
    position : "absolute",
    top: "0",
    left : "75%"
  }
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession])
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => currentUser ? (<Redirect to='/register'/>) : (<LoginPage/>)}/>
        <Route path="/register" render={() => !currentUser ? (<Redirect to='/'/>) : (<RegisterPage/>)}/>
        <Route path='/gallery' component={GalleryPage}/>
      </Switch>
      <Button variant="secondary" href='/' style={signOutStyle} onClick={signOutStart} size="sm">Sign Out</Button>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser : currentUserSelector,
});

const mapStateToDispatch = dispatch => ({
  checkUserSession : () => dispatch(checkUserSession()),
  signOutStart : () => dispatch(signOutStart())
});


export default connect(mapStateToProps, mapStateToDispatch)(App);
