import React from 'react';
import { Collapse, Input, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, withHandlers, withStateHandlers } from 'recompose';
import { searchPostmortem } from '../../actions/postmortem.action';

const Toggle = withStateHandlers(
  ({ initialCollapsed = false }) => ({
    collapsed: initialCollapsed,
  }),
  {
    toggleNavbar: ({ collapsed }) => () => ({
      collapsed: !collapsed,
    })
  }
  )
;

const Header = ({ toggleNavbar, navigateTo, collapsed, searchPostmortem }) => (
  <Navbar color="dark" dark expand="md" fixed={'100'} >
    <NavbarBrand href="/" >Morgue-React</NavbarBrand >
    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
    <Collapse isOpen={!collapsed} navbar >
      <Nav className="ml-auto" navbar >
        <NavItem >
          <Input placeholder="search..." onChange={({ target }) => searchPostmortem(target.value)} />
        </NavItem >
        <NavItem >
          <NavLink className='c-pointer' onClick={() => navigateTo('/postmortem')} >Post-mortems</NavLink >
        </NavItem >
        <NavItem >
          <NavLink className='c-pointer' onClick={() => navigateTo('/postmortem/create')} >Create Post-mortem</NavLink >
        </NavItem >
      </Nav >
    </Collapse >
  </Navbar >
);

const mapDispatchToProps = (dispatch) => {
  return {
    searchPostmortem: (search) => dispatch(searchPostmortem(search))
  };
};

export default connect(null, mapDispatchToProps)(
  withRouter(compose(Toggle, withHandlers({ navigateTo: ({ history }) => (path) => history.push(path) }))(Header)));