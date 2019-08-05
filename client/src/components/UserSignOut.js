import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

export default ({context}) => {
  context.actions.signOut()
  return (
    <Redirect to='/'/>
  )
}
