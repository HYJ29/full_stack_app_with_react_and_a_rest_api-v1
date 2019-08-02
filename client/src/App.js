import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import {withContext} from './Context';

import Header from './components/Header';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';

const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);


export default ()=> (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Courses}/>
        <Route path='/courses/create' component={CreateCourse}/>
        <Route exact path='/courses/:id' component={CourseDetail}/>
        <Route path='/courses/:id/update' component={UpdateCourse}/>
        <Route path='/signIn' component={UserSignIn}/>
        <Route path='/signUp' component={UserSignUp}/>
        <Route path='/signOut' component={UserSignOut}/>
      </Switch>
    </div>

  </Router>
);
