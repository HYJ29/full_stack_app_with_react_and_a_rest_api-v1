import React from 'react';
import {Link} from 'react-router-dom';
import notFoundImage from '../images/forbidden.png'

export default function Forbidden({match}){
  return (
    <div className="notFound">
      <img src={notFoundImage}/>
      <p >Forbidden</p>
      <Link id="goBackButton" className="button" to="/">Go Back</Link>
    </div>
  )
}
