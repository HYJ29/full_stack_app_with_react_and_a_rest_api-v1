import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import {withContext} from './Context';
import PrivateRoute from './PrivateRoute';

import Header from './components/Header';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse)
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const ProfileWithContext = withContext(Profile);


export default ()=> (
  <Router>
    <div>
      <HeaderWithContext />
      <Switch>
        <Route exact path='/' component={CoursesWithContext}/>
        <PrivateRoute path='/courses/create' component={CreateCourseWithContext}/>
        <PrivateRoute exact path='/courses/:id' component={CourseDetailWithContext}/>
        <PrivateRoute path='/courses/:id/update' component={UpdateCourseWithContext}/>
        <Route path='/signIn' component={UserSignInWithContext}/>
        <Route path='/signUp' component={UserSignUpWithContext}/>
        <Route path='/signOut' component={UserSignOutWithContext}/>
        <PrivateRoute path='/profile' component={ProfileWithContext} />
        <Route path='/notfound' component={NotFound}/>
        <Route path='/forbidden' component={Forbidden}/>
        <Route path='/error' component={UnhandledError}/>
      </Switch>
    </div>

  </Router>
);
