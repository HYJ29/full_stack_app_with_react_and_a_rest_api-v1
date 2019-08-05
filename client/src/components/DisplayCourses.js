import React from 'react';
import {Link} from 'react-router-dom';

export default function DisplayCourses({
  courses,
  auth,
  location
}) {
  return (
    <div className="bounds">
      {
        courses.map((course,i)=>{
          const myCourse =
            auth && course.user && auth.emailAddress === course.user.emailAddress
            ?
            "mine"
            :
            "notmine"
          return (
            <div key={i} className="grid-33">
            <Link className={`course--module course--link ${myCourse}`} to={{
              pathname:`/courses/${course.id}`,
              state:{from:location}
            }}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
                <h3 className="course--label">{`Username: ${course.user && course.user.firstName || auth.firstName} ${course.user && course.user.lastName || auth.lastName}`}</h3>
                <h3 className="course--label">{`Email address: ${course.user&& course.user.emailAddress || auth.emailAddress}`}</h3>


              </Link></div>
          )
        })
      }
      <div className="grid-33"><Link className="course--module course--add--module" to={{
        pathname:"/courses/create",
        state:{from:location}
      }}>
          <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
            </svg>New Course</h3>
        </Link></div>
    </div>
  )
}
