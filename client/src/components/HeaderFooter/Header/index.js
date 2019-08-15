import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { logOutUser } from '../../../actions/user_actions';

class Header extends Component {

  state = {
    page: [
      {
        name: 'Home',
        linkTo: '/',
        public: true
      },
      {
        name: 'Sneakers',
        linkTo: '/shop',
        public: true
      }
    ],
    user: [
      {
        name: 'My Cart',
        linkTo: '/user/cart',
        public: false
      },
      {
        name: 'My Account',
        linkTo: '/user/dashboard',
        public: false
      },
      {
        name: 'Log In',
        linkTo: '/login',
        public: true
      },
      {
        name: 'Log Out',
        linkTo: '/user/logout',
        public: false
      }
    ]
  }

  handleLogOut = () => {
    this.props.dispatch(logOutUser()).then(response => {
      if (response.payload.success) {
        this.props.history.push('/')
      }
    })
  }

  cartLink = (item, idx) => {
    const user = this.props.user.userData;
    return (
      <div className="cart-link" key={idx}>
        <Link to={item.linkTo} key={idx}>
          {item.name}
        </Link>
        <span>( {user.cart ? user.cart.length : 0} )</span>
      </div>
    )
  }

  defaultLink = (item, idx) => (
    item.name === 'Log Out' ?
      <div className="log-out-link"
        key={idx}
        onClick={() => this.handleLogOut()}
      >
        {item.name}
      </div>
      :
      <Link to={item.linkTo} key={idx}>
        {item.name}
      </Link>
  )


  showLinks = (type) => {
    let list = [];
    if (this.props.user.userData) {
      type.forEach((item) => {
        if (!this.props.user.userData.isAuth) {
          if (item.public) {
            list.push(item);
          }
        } else {
          if (item.name !== 'Log In') {
            list.push(item);
          }
        }
      });
    }
    return list.map((item, idx) => {
      if (item.name !== 'My Cart') {
        return this.defaultLink(item, idx)
      } else {
        return this.cartLink(item, idx)
      }
    });
  }

  render() {
    return (
      <header className="background-white">
        <div className="container">
          <div className="flexbox-container" style={{ flexDirection: 'row' }}>
            <div className="left-section">
              <div className="header-logo">
                Grails
              </div>
            </div>
            <div className="right-section">
              <div className="header-top">
                {this.showLinks(this.state.user)}
              </div>
              <div className="header-bottom">
                {this.showLinks(this.state.page)}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  };
};

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(withRouter(Header));