import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../hoc/user';
import UserProductBlock from '../utils/User/productBlock';
import { getCartItems } from '../../actions/user_actions';

class UserCart extends Component {

  state = {
    isLoading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  }

  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;
    let userCart = user.userData.cart;
    if (userCart) {
      if (userCart.length > 0) {
        userCart.forEach((item) => {
          cartItems.push(item.id)
        });
        this.props.dispatch(getCartItems(cartItems, userCart)).then(() => {
          if (this.props.user.cartDetails.length > 0) {
            this.calculateTotalPrice(this.props.user.cartDetails);
          }
        });
      }
    }
  }

  calculateTotalPrice = (cartDetails) => {
    let total = 0;
    cartDetails.forEach((item) => {
      total += parseInt(item.price, 10) * item.quantity
    });
    this.setState({
      total,
      showTotal: true
    });
  }

  handleRemoveItemFromCart = () => {

  }

  showSuccessMessage = () => (
    <div className="cart_success">
      <div>Thank you for your purchase! We will send you an update as soon as your product is shipped!</div>
    </div>
  )

  showNoItemMessage = () => (
    <div className="cart_no_items">
      <div>You have no items in your shopping cart</div>
    </div>
  )

  render() {
    return (
      <UserLayout>
        <div>
          <h1>My cart</h1>
          <div className="user_cart">
            <UserProductBlock
              products={this.props.user}
              type="cart"
              removeItem={(id) => this.handleRemoveItemFromCart(id)}
            />
            {
              this.state.showTotal ?
                <div>
                  <div className="user_cart_sum">
                    <div>Total Amount: $ {this.state.total}</div>
                  </div>
                </div>
                :
                this.state.showSuccess ?
                  this.showSuccessMessage()
                  :
                  this.showNoItemMessage()
            }
          </div>
          {
            this.state.showTotal ?
              <div className="paypal_button_container">
                PayPal Button
              </div>
              : null
          }
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