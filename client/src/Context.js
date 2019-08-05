import React, {Component} from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();


/**
 * Make a Provider class
 * @type {Object}
 */
export class Provider extends Component {
  //by making data instance in constructor, not state, prevent abuse of rendering
  constructor(){
    super();
    this.data= new Data();
  }
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  }
  render() {
    const value = {
      data: this.data,
      actions:{
        signIn:this.signIn,
        signOut:this.signOut
      },
      authenticatedUser:this.state.authenticatedUser
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }

  signIn = async (emailAddress,password) => {
    const user = await this.data.getUser(emailAddress,password)
    this.setState({
      authenticatedUser:user
    })
    Cookies.set('authenticatedUser',user);
    return user
  }

  signOut = () => {
    this.setState({
      authenticatedUser:null
    })
    Cookies.remove('authenticatedUser');
  }

}

export const Consumer = Context.Consumer

/**
 * HOC for consumer components
 * @param  {[type]} Component consumes state values
 * @return {[type]}           can use props & context values
 */
export const withContext = (Component) => {
  return function ContextComponent(props) {
    return(
      <Context.Consumer>
        {context => <Component {...props} context={context}/>}
      </Context.Consumer>
    )
  }


}
