import React, {Component} from 'react';
import DisplayCourses from './DisplayCourses';

export default class Courses extends Component {
  state = {
    courses:[]
  }

  /*
  load courses data and set state
   */
  componentDidMount() {
    const {context} = this.props
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
  
  /*
  rendering
   */
  render(){
    const {context} = this.props
    const {courses} = this.state
    const auth = context.authenticatedUser

    return (
      <DisplayCourses courses={courses} auth={auth} location={this.props.location}/>
    )
  }
}
