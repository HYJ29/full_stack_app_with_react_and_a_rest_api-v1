import React, {Component} from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {
  state ={
    title:'',
    description:'',
    estimatedTime:null,
    materialsNeeded:null,
    errors:[]
  }

  componentDidMount(){
    const {context,match} = this.props;
    const {id} = match.params
    const auth =context.authenticatedUser;

    context.data.getOneCourse(id).then(course =>{
      this.setState({
        title:course.title,
        description:course.description,
        estimatedTime:course.estimatedTime,
        materialsNeeded:course.materialsNeeded
      })
    })
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]:value
    })
  }

  submit = () => {
    const {context, match} = this.props;
    const auth = context.authenticatedUser;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId:auth.id
    }
    const {id} = match.params

    context.data.editCourse(id, course,auth)
    .then(errors => {
      if(errors.length>0){
        const errMessages = errors.map(error=>error.message);
        this.setState({errors:errMessages})
      } else {
        context.actions.signIn(auth.emailAddress,auth.password)
        this.props.history.push('/')
      }
    })
  }

  cancel = () => {
    this.props.history.push('/')
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;
    const {context} = this.props;
    const auth = context.authenticatedUser;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form
            submit = {this.submit}
            submitText ='Update Course'
            cancel = {this.cancel}
            errors = {errors}
            elements={
              ()=>(
                <React.Fragment>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.change} value={title}/></div>
                      <p>{`By ${auth.firstName} ${auth.lastName}`}</p>
                    </div>
                    <div className="course--description">
                      <div><textarea id="description" name="description" placeholder="Course description..." onChange={this.change} value={description}/></div>
                    </div>
                  </div>

                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={this.change} value={estimatedTime?estimatedTime:""} /></div>
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div><textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." onChange={this.change}
                          value={materialsNeeded?materialsNeeded:""}/></div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </React.Fragment>
              )
            }
          />
        </div>
      </div>
    )
  }
}
