import React, {Component} from 'react';
import DisplayCourses from './DisplayCourses';

export default class Profile extends Component {
  state={
    user: null
  }

  componentDidMount(){
    const {context} = this.props;
    const auth = context.authenticatedUser;
    this.setState({user:auth})
  }

  render(){
    const {user} = this.state
    return(
      <div>
        {
        user
        ?
        <React.Fragment>
          <h1 className="profile-label">User Profile</h1>
          <h2 className="profile-label">User Name:</h2>
          <h3 className="profile-value">{`${user.firstName} ${user.lastName}`}</h3>
          <h2 className="profile-label">User Email:</h2>
          <h3 className="profile-value">{user.emailAddress}</h3>
          <h2 className="profile-label">Courses Number:</h2>
          <h3 className="profile-value">{user.courses.length}</h3>
          <h1 className="profile-label">My Courses</h1>
          <DisplayCourses courses={user.courses} auth={user} location={this.props.location} />
        </React.Fragment>
        :
        null
      }

      </div>

    )
  }
}
