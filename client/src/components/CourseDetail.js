import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class CourseDetail extends Component {
  state ={
    course:null,
    tryDelete:false
  }

  componentDidMount(){
    const {context, match} = this.props;
    const {course} = this.state;
    const id = match.params.id
    context.data.getOneCourse(id).then(course => {
      if(course){
        if(course.description){
          course.description = course.description.split(/\n/);
        }
        if(course.materialsNeeded){
          course.materialsNeeded = course.materialsNeeded.split(/\n/);
        }
        this.setState({course});
      } else {
        this.props.history.push('/notfound')
      }
    }).catch((err)=>{
      this.props.history.push('/error')
      console.log(err.message)
    })
  }

  delete = () =>{
    this.setState({tryDelete:true})
  }

  deleteConfirm = () => {
    const {context, match} = this.props;
    const {course} = this.state;
    const id = match.params.id
    const auth = context.authenticatedUser

    context.data.deleteCourse(id, auth).then(errors => {
      if(errors.length>0){
        const errMessages = errors.map(error=>error.message);
        this.setState({errors:errMessages})
      } else {
        this.props.history.push('/')
      }
    })
  }
  render() {
    const {context, match} = this.props;
    const {course,tryDelete} = this.state;
    const id = match.params.id;
    const auth = context.authenticatedUser;
    const {from} = this.props.location.state || {from:'/'};

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
            {
              course && auth.emailAddress === course.user.emailAddress
              ?
              <span>
                <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                {
                  tryDelete
                  ?
                  <Link className="button" onClick={this.deleteConfirm}>Delete Confirmation</Link>
                  :
                  <button className="button" onClick={this.delete}>Delete Course</button>
                }
              </span>
              :
              null
            }
            <Link className="button button-secondary" to={from}>Return to List</Link></div>
          </div>
        </div>
        {
          course?
            (
              <div className="bounds course--detail">
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{course.title}</h3>
                    <p>{`By ${course.user.firstName} ${course.user.lastName}`}</p>
                  </div>
                  <div className="course--description">
                    {
                      course.description.map((course,i) =>(
                        <p key={i}>{course}</p>
                      ))
                    }
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{course.estimatedTime}</h3>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ul>
                          { course.materialsNeeded
                            ?
                            (course.materialsNeeded.map((materal,i)=>(
                              <li key={i}>{materal}</li>
                            )))
                            :
                            null
                          }
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )
            :
            null
          }

      </div>
    )
  }
}
