import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/user_actions';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function (ComposedClass, reload, adminRoute = null) {
  class AuthCheck extends Component {

    state = {
      isLoading: true
    }

    componentDidMount() {
      this.props.dispatch(auth()).then(response => {
        let user = this.props.user.userData;
        if (!user.isAuth) {
          if (reload) {
            this.props.history.push('/login');
          }
        } else {
          if (adminRoute && !user.isAdmin) {
            this.props.history.push('/user/dashboard');
          } else {
            if (reload === false) {
              this.props.history.push('/user/dashboard');
            }
          }
        }
        this.setState({
          isLoading: false
        });
      })
    }

    render() {
      if (this.state.isLoading) {
        return (
          <div className="main-loader">
            <CircularProgress style={{ color: '#FF8C00' }} thickness={6} />
          </div>
        )
      }
      return (
        <ComposedClass {...this.props} user={this.props.user} />
      );
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user
    }
  }

  return connect(mapStateToProps)(AuthCheck);
}
