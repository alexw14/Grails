import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../hoc/user';
import { getCartItems } from '../../actions/user_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons/faFrown';
import { faSmile } from '@fortawesome/free-solid-svg-icons/faSmile';

class UserCart extends Component {

  state = {
    isLoading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  }

  componentDidMount() {
    let cartItem = [];
    let user = this.props.user;
    let userCart = user.userData.cart;
    if (userCart) {
      if (userCart.length > 0) {
        userCart.forEach((item) => {
          cartItem.push(item.id)
        });
        this.props.dispatch(getCartItems(cartItem, userCart)).then(() => {

        });
      }
    }
  }

  render() {
    return (
      <UserLayout>
        <div>
          cart
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserCart);