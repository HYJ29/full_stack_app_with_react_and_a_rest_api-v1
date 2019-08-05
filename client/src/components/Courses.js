import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DisplayCourses from './DisplayCourses';

export default class Courses extends Component {
  state = {
    courses:[]
  }

  componentDidMount() {
    const {context} = this.props
    const {courses} = this.state
    context.data.getCourses().then((courses)=>{
      this.setState({courses})
    })
  }

  render(){
    const {context} = this.props
    const {courses} = this.state
    const auth = context.authenticatedUser

    return (
      <DisplayCourses courses={courses} auth={auth} location={this.props.location}/>
    )
  }
}
