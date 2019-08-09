import React from 'react';
import {Link} from 'react-router-dom';
import notFoundImage from '../images/unexpected.png'

/*
componnet for unhandled errors
 */
export default function UnhandledError({match}){
  return (
    <div className="notFound">
      <img src={notFoundImage} alt="notFoundImage"/>
      <p >Unhandled Error Occured!</p>
      <Link id="goBackButton" className="button" to="/">Go Back</Link>
    </div>
  )
}
