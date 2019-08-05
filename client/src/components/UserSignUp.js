import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from './Form';

export default class CreateCourese extends Component {
  state ={
    firstName:'',
    lastName:'',
    emailAddress:'',
    password:'',
    confirmPassword:'',

    errors:[]
  }
  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors
    } = this.state
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <Form
              submit = {this.submit}
              submitText ='Sign Up'
              cancel = {this.cancel}
              errors = {errors}
              elements={
                ()=>(
                  <React.Fragment>
                    <input id="firstName" name="firstName" type="text" placeholder="First Name"  onChange={this.change} value={firstName} />
                    <input id="lastName" name="lastName" type="text" placeholder="Last Name"  onChange={this.change} value={lastName} />
                    <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address"  onChange={this.change} value={emailAddress} />
                    <input id="password" name="password" type="password" placeholder="Password"  onChange={this.change} value={password} />
                    <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password"  onChange={this.change} value={confirmPassword} />
                  </React.Fragment>
                )
              }
            />
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    )
  };

  change = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    this.setState(()=>{
      return {[name]:value}
    });
  }


  submit = () =>{
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors
    } = this.state
    const {context} = this.props
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    }
    context.data.createUser(user)
      .then(errors => {
        if(errors.length>0){
          const errMessages = errors.map(error=>error.message);
          this.setState({errors:errMessages})
        } else {
          context.actions.signIn(emailAddress,password)
          this.props.history.push('/')
        }
      }).catch(error=>{
        console.log(error);
        this.props.history.push('/error');
      })

  }

  cancel = () =>{

  }
}
