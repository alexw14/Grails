import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../hoc/user';
import UserProductBlock from '../utils/User/productBlock';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../actions/user_actions';
import CheckOutButton from '../utils/checkoutButton';

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
          if (this.props.user.cartDetail.length > 0) {
            this.calculateTotalPrice(this.props.user.cartDetail);
          }
        });
      }
    }
  }

  calculateTotalPrice = (cartDetail) => {
    let total = 0;
    cartDetail.forEach((item) => {
      total += parseInt(item.price, 10) * item.quantity
    });
    this.setState({
      total,
      showTotal: true
    });
  }

  handleRemoveItemFromCart = (id) => {
    this.props.dispatch(removeCartItem(id)).then(() => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false
        });
      } else {
        this.calculateTotalPrice(this.props.user.cartDetail);
      }
    });
  }

  showSuccessMessage = () => (
    <div className="cart-success">
      <div>Thank you for your purchase!</div>
      <div> We will send you an update as soon as your product is shipped!</div>
    </div>
  )

  showNoItemMessage = () => (
    <div className="cart-no-items">
      <div>You have no items in your shopping cart</div>
    </div>
  )

  transactionSuccess = () => {
    this.props.dispatch(onSuccessBuy({ cartDetail: this.props.user.cartDetail })).then(() => {
      if (this.props.user.successBuy) {
        this.setState({
          showTotal: false,
          showSuccess: true
        });
      }
    });
  }

  render() {
    return (
      <UserLayout>
        <div>
          <div className="title">My cart</div>
          <div className="user-cart">
            <UserProductBlock
              products={this.props.user}
              type="cart"
              removeItem={(id) => this.handleRemoveItemFromCart(id)}
            />
            {
              this.state.showTotal ?
                <div>
                  <div className="user-cart-sum">
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
              <div className="checkout-button-container">
                <CheckOutButton
                  toPay={this.state.total}
                  onSuccess={() => this.transactionSuccess()}
                />
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