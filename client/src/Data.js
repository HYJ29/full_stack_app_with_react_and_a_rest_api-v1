import config from './config'

export default class Data {
  /**
   * Getting data from REST API
   * @param  {string}  path                routing path
   * @param  {String}  [method='GET']      method
   * @param  {Object}  [body=null]         object that passed as req.body
   * @param  {Boolean} [requireAuth=false] is it require authentication?
   * @param  {Object}  [credentials=null]  encoded credentials for authentication
   * @return {Object}                      data from REST API
   */
  api(path, method='GET', body=null, requireAuth=false, credentials=null){
    const url = config.baseUrl + path
    const options = {
      method,
      headers :{
        'Content-Type': 'application/json; charset=utf-8',
      }
    };

    // if there is body, put in on options
    if(body!==null){
      options.body = JSON.stringify(body)
    }

    //if it require auth, put options headers an encoded credential
    if(requireAuth){
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }


    return fetch(url,options);
  }

  /**
   * getting userdata from REST API
   * @param  {String}  username [username]
   * @param  {String}  pssword  [password]
   * @return {Promise}          user data frm REST API
   */
  async getUser(emailAddress,password){
    const response = await this.api('/users','GET',null,true,{emailAddress:emailAddress,password:password});
    if(response.status === 200){
      return response.json();
    } else {
      return null
      };
  }

  /**
   * creating user to REST API
   * @param  {Object}  user data passed to it
   * @return {Promise}      empty array or errors
   */
  async createUser(user){
    const response = await this.api('/users', 'POST', user);
    if(response.status === 201){
      return []
      //errors from sequelize validation
    } else if (response.status ===400){
      return response.json().then(data =>{
        return data.error.errors
      })
      //errors from express-validator( actually using this)
    } else if( response.status === 422){
      return response.json().then(data => {
        return data.errors.map(error => {
          return {
            message:error.msg
          }
        })
      })
    } else {
      throw new Error('error from createUser')
    }
  }

  /**
   * getting all courses in the REST API
   * @return {Promise} courses data
   */
  async getCourses(){
    const response = await this.api('/courses', 'GET');
    if(response.status === 200){
      return response.json();
    } else {
      return null
    }
  }

  /**
   * get specific one course from REST API
   * @param  {Integer}  id course id number
   * @return {Promise}    course data
   */
  async getOneCourse(id){
    const response = await this.api(`/courses/${id}`,'GET');
    if(response.status === 200){
      return response.json();
    } else if(response.status === 404){
      return null
    } else {
      throw new Error('error from getOneCourse');
    }
  }

  /**
   * create a coure to REST API
   * @param  {Object}  course course to create
   * @param  {Object}  auth   authentication data
   * @return {Promise}        data from REST api
   */
  async createCourse(course, auth){
    const response = await this.api('/courses', 'POST', course, true,{emailAddress:auth.emailAddress,password:auth.password});
    if(response.status === 201){
      return [];
    } else if(response.status === 400){
      return response.json().then(data => data.error.errors);
    } else {
      throw new Error('error from createCourse');
    }
  }

  /**
   * edit a course to REST API
   * @param  {Integer}  id     course id to edit
   * @param  {Object}  course edited course data
   * @param  {Object}  auth   auth data
   * @return {Promise}        empty array or errors
   */
  async editCourse(id, course, auth){
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress:auth.emailAddress,password:auth.password});
    if(response.status===204){
      return []
    } else if (response.status ===400){
      return response.json().then(data=>data.error.errors);
    } else {
      return response.json().then(data=>[{message:data.message?data.message:"failed update"}])
    }
  }

  /**
   * delete a course from REST API
   * @param  {Integer}  id   course id to delete
   * @param  {Object}  auth auth data
   * @return {Promise}      empty array or errors
   */
  async deleteCourse(id, auth){
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress:auth.emailAddress,password:auth.password});
    if(response.status===204){
      return [];
    } else {
      return response.json().then(data=>data.error.errors);
    }
  }




}
