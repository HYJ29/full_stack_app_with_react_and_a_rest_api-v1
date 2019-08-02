import React, {Component} from 'react';

const Context = React.createContext();


/**
 * Make a Provider class
 * @type {Object}
 */
export class Provider extends Component {

  render() {
    return (
      <Context.Provider>
        {this.props.children}
      </Context.Provider>
    )
  }
  state = {

  }
}

/**
 * HOC for consumer components
 * @param  {[type]} Component consumes state values
 * @return {[type]}           can use props & context values
 */
export const withContext = (Component) => {
  return function ContextComponent(props) {
    return(
      <Context.Consumer>
        {<Component {...props} context={props.context}/>}
      </Context.Consumer>
    )
  }


}
