import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const links = [
  {
    name: 'My Account',
    linkTo: '/user/dashboard'
  },
  {
    name: 'My Profile',
    linkTo: '/user/user-profile'
  },
  {
    name: 'My Cart',
    linkTo: '/user/cart'
  }
];

const adminLinks = [
  {
    name: 'Add Product',
    linkTo: '/admin/add-product'
  },
  {
    name: 'Management',
    linkTo: '/admin/manage-category'
  },
  {
    name: 'Site Info',
    linkTo: '/admin/site-info'
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
      <div className="user-container">
        <div className="user-left-nav">
          <div className="title">My Account</div>
          <div className="links">
            {generateLinks(links)}
          </div>
          {
            props.user.userData.isAdmin ?
              <div>
                <div className="title">Admin</div>
                <div className="links">
                  {generateLinks(adminLinks)}
                </div>
              </div>
              : null
          }
        </div>
        <div className="user-right">
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