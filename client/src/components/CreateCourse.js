import React, {Component} from 'react';
import Form from './Form';

export default class CreateCourese extends Component {
  state ={
    title:'',
    description:'',
    estimatedTime:null,
    materialsNeeded:null,
    errors:[]
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]:value
    })
  }

  submit = () => {
    const {context,location} = this.props;
    const auth = context.authenticatedUser;
    const {from} = location.state || '/';
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
    context.data.createCourse(course,auth)
    .then(errors => {
      if(errors.length>0){
        const errMessages = errors.map(error=>error.message);
        this.setState({errors:errMessages})
      } else {
        context.actions.signIn(auth.emailAddress,auth.password)
        .then(()=>{
          this.props.history.push(from)
        })

      }
    }).catch(error=>{
      console.log(error)
      this.props.history.push('/error')
    })
  }

  cancel = () => {
    const {location} = this.props
    const {from} = location.state || '/';
    this.props.history.push(from)
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
        <h1>Create Course</h1>
        <div>
          <Form
            submit = {this.submit}
            submitText ='Create Course'
            cancel = {this.cancel}
            errors = {errors}
            elements={
              ()=>(
                <React.Fragment>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.change} /></div>
                      <p>{`By ${auth.firstName} ${auth.lastName}`}</p>
                    </div>
                    <div className="course--description">
                      <div><textarea id="description" name="description"  placeholder="Course description..." onChange={this.change} /></div>
                    </div>
                  </div>

                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={this.change} /></div>
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div><textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." onChange={this.change}/></div>
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
