import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state ={
    emailAddress:'',
    password:'',
    errors:[]
  }
  /*
  change state everytime the input values changes
   */
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]:value
    })
  }

  /*
  User sigin in actions
   */
  submit = () =>{
    const {context} = this.props;
    const{
      emailAddress,
      password
    } = this.state
    const {from} = this.props.location.state || {from:'/'};
    context.actions.signIn(emailAddress,password).then(user=>{
      if(user){
        this.props.history.push(from)
      } else {
        this.setState({errors:["Sign in failed"]})
      }
    }).catch(error => {
      console.log(error)
      this.props.history.push('/error')
    })
  }

  cancel = () =>{
    this.props.history.push('/')
  }

  render() {
    const {
      errors
    } = this.state
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <Form
              submit = {this.submit}
              submitText ='Sign In'
              cancel = {this.cancel}
              errors = {errors}
              elements={
                ()=>(
                  <React.Fragment>
                    <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" onChange={this.change} />
                    <input id="password" name="password" type="password" placeholder="Password" onChange={this.change} />
                  </React.Fragment>
                )
              }
            />
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    )
  }
}
