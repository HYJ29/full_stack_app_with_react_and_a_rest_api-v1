import React from 'react';

export default function DisplayErrors({errors}) {
  let displayErrors = null
  if(errors.length>0){
    displayErrors = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((err,i)=> <li key={i}>{err}</li>)}
          </ul>
        </div>
      </div>
    );
  }
  return displayErrors;
}
