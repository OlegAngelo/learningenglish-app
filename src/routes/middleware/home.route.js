import React from 'react'
import { Route } from 'react-router-dom';

const HomeRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={ props => {
        if (true) {
          return <Component {...props}/>;
        }

        // You can return a Redirect function here if the statement above is false.
      }}
    />
  )
}

export default HomeRoute;
