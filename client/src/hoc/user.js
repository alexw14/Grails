import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const links = [
  {
    name: 'My Account',
    linkTo: '/user/dashboard'
  },
  {
    name: 'User Information',
    linkTo: '/user/user-profile'
  },
  {
    name: 'My Cart',
    linkTo: '/user/cart'
  }
];

const adminLinks = [
  {
    name: 'Site Info',
    linkTo: '/admin/site-info'
  },
  {
    name: 'Add Product',
    linkTo: '/admin/add-product'
  },
  {
    name: 'Manage Category',
    linkTo: '/admin/manage-category'
  }
]

const UserLayout = (props) => {

  const generateLinks = (links) => (
    links.map((item, i) => {
      return (
        <Link to={item.linkTo} key={i}>
          {item.name}
        </Link>
      )
    })
  )

  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My Account</h2>
          <div className="links">
            {generateLinks(links)}
          </div>
          {
            props.user.userData.isAdmin ?
              <div>
                <h2>Admin</h2>
                <div className="links">
                  {generateLinks(adminLinks)}
                </div>
              </div>
              : null
          }
        </div>
        <div className="user_right">
          {props.children}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserLayout);