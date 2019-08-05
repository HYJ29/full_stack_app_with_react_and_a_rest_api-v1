import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {Consumer} from './Context';

// export default function PrivateRoute({path,component}){
//   return (
//     <Consumer>
//       {
//         context => {
//           if(context.authenticatedUser){
//             return <Route path={path} component={component}/>
//           } else {
//             return <Redirect to="/signIn" />
//           }
//         }
//       }
//     </Consumer>
//
//   )
// }

export default function PrivateRoute({component:Component,...rest}){
  return (
    <Consumer>
      {
        context =>(
          <Route
          {...rest}
          render={props =>(
            context.authenticatedUser
            ?
            <Component {...props} />
            :
            <Redirect to={{
              pathname:"/signIn",
              state:{from:props.location}
            }} />
          )

          }
          />
        )
      }
    </Consumer>

  )
}
