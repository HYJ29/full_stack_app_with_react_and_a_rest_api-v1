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
      if(courses){
        this.setState({courses})
      } else {
        this.props.history.push('/notfound')
      }
    }).catch((err)=>{
      this.props.history.push('/error')
      console.log(err.message)
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
