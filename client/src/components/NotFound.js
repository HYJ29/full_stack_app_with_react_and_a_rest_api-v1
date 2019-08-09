import React from 'react';
import {Link} from 'react-router-dom';
import notFoundImage from '../images/NotFound.png'

/*
component for page not-found
 */
export default function NotFound({match}){
  return (
    <div className="notFound">
      <img src={notFoundImage} alt="notFoundImage"/>
      <p >Not Found</p>
      <Link id="goBackButton" className="button" to="/">Go Back</Link>
    </div>
  )
}
