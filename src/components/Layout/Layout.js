import React, { Fragment } from 'react';
import Header from '../Header';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';

const HeaderWithRouter = withRouter(Header);

const Layout = ({ fluid, children }) => {
  return (
    <Fragment >
      <HeaderWithRouter />
      <Container fluid={fluid} >
        {children}
      </Container >
    </Fragment >
  );
};

export default Layout;