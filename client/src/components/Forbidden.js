import React from 'react';
import {Link} from 'react-router-dom';
import notFoundImage from '../images/forbidden.png'

/*
component for pages accessing to forbidden route 
 */
export default function Forbidden({match}){
  return (
    <div className="notFound">
      <img src={notFoundImage} alt="notFoundImage"/>
      <p >Forbidden</p>
      <Link id="goBackButton" className="button" to="/">Go Back</Link>
    </div>
  )
}
