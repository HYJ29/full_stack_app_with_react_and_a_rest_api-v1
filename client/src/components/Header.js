import React from 'react';
import { Link } from 'react-router-dom';

/*
Header component. change contents with authentification 
 */
export default ({context}) =>{
  const auth = context.authenticatedUser;
  return (
    <div className="header">
       <div className="bounds">
         <Link className="header--logo" to='/'>Courses</Link>
         <nav>
           {
             auth
             ?
             <React.Fragment>
               <Link to='/profile'>Welcome! {auth.lastName}</Link>
               <Link className="signout" to="/signout">Sign Out</Link>
             </React.Fragment>
             :
             <React.Fragment>
               <Link className="signup" to="/signup">Sign Up</Link>
               <Link className="signin" to="/signin">Sign In</Link>
             </React.Fragment>
           }
         </nav>
       </div>
     </div>
  )
}
