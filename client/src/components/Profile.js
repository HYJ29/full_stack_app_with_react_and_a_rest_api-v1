import React, {Component} from 'react';
import DisplayCourses from './DisplayCourses';

export default class Profile extends Component {
  state={
    user: null
  }
  /*
  load current authentifiaction user data and set state.
   */
  componentDidMount(){
    const {context} = this.props;
    const auth = context.authenticatedUser;
    this.setState({user:auth})
  }

  /*
  rendering
   */
  render(){
    const {user} = this.state
    return(
      <div>
        {
        user
        ?
        <div className="bounds">
          <h1 className="profile-label">User Profile</h1>
          <h2 className="profile-label">User Name:</h2>
          <h3 className="profile-value">{`${user.firstName} ${user.lastName}`}</h3>
          <h2 className="profile-label">User Email:</h2>
          <h3 className="profile-value">{user.emailAddress}</h3>
          <h2 className="profile-label">Courses Number:</h2>
          <h3 className="profile-value">{user.courses.length}</h3>
          <h1 className="profile-label">My Courses</h1>
          <DisplayCourses courses={user.courses} auth={user} location={this.props.location} />
        </div>
        :
        null
      }

      </div>

    )
  }
}
