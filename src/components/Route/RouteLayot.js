import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../Layout/Layout';

const RouteLayout = ({ component: Component, fluid = false, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <Layout fluid={fluid} >
        < Component {...matchProps} />
      </Layout >
    )} />
  );
};

export default RouteLayout;