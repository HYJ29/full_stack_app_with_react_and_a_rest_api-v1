import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {Consumer} from './Context';

/**
 * Prevent not authorized access to 'UpdateCourse' Page.
 * , block the approach from brower address bar
 */
export default function AuthorizedRoute({component:Component,...rest}){
  return (
    <Consumer>
      {
        context =>(
          <Route
          {...rest}
          render={ (props) =>{
            const {id} = props.match.params; //get course id trying to access
            let hasThisCourse;
            if(context.authenticatedUser){
              const authCourses = context.authenticatedUser.courses; //get current auth user's course list
              hasThisCourse = authCourses.find(course =>{
                return course.id == id //check this current auth user has this course
              })
            }
            return(
              context.authenticatedUser
              ?
              (
                hasThisCourse
                ?
                <Component {...props} />
                :
                <Redirect to="/error" />
              )
              :
              (<Redirect to={{
                pathname:"/signIn",
                state:{from:props.location}
              }} />)
            )
          }
          }
          />
        )
      }
    </Consumer>
  )
}
