import config from './config'

exports default class Data {
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
        'Content-type'= 'application/json; charset=utf-8',
      }
    };

    // if there is body, put in on options
    if(body!==null){
      options.body = JSON.stringify(body)
    }

    //if it require auth, put options headers an encoded credential
    if(requireAuth){
      const encodedCredentials = btoa(`{${credentials.username}:${credentials.password}}`);
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
  async getUser(username,pssword){
    const response = await this.api('/users','GET',null,true,{username,password});
    if(response.status === 200){
      return response.json();
    } else {
      throw new Error('error from getUsers')
    }
  }

  /**
   * creating user to REST API
   * @param  {Object}  user data passed to it
   * @return {Promise}      empty array or errors
   */
  async createUser(user){
    const response = await this.api('/users', 'POST', user);
    if(response.status === 201){
      return [];
    } else if (response.status ===400){
      return response.json().then(data => data.error)
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
      throw new Error('error from getCourese');
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
      return response.json().then(data => data.error)
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
    const response = await this.api('/courses', 'POST', course, true,{auth.usernmae,auth,password});
    if(response.status === 201){
      return [];
    } else if(response.status === 400){
      return response.json().then(data => data.error);
    } else {
      throw new Erorr('error from createCourse');
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
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {auth.username,auth.password});
    if(response.status===204){
      return []
    } else if (response.status ===400){
      return response.json().then(data=>data.error);
    } else {
      throw new Error('error from editCourse');
    }
  }

  /**
   * delete a course from REST API
   * @param  {Integer}  id   course id to delete
   * @param  {Object}  auth auth data
   * @return {Promise}      empty array or errors
   */
  async deleteCourse(id, auth){
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {auth.username, auth.password});
    if(response.status===204){
      return [];
    } else {
      throw new Error('error from deleteCourse')
    }
  }




}
