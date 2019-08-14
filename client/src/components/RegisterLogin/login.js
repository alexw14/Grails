import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UtilButton from '../utils/button';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/FormActions';
import { loginUser } from '../../actions/user_actions';

class Login extends Component {

  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Email Address'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Password'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'login');
    this.setState({
      formError: false,
      formData: newFormData
    })
  }

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'login');
    let formIsValid = isFormValid(this.state.formData, 'login');
    if (formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then(res => {
        if (res.payload.loginSuccess) {
          this.props.history.push('/user/dashboard');
        } else {
          this.setState({
            formError: true
          })
        }
      });
    } else {
      this.setState({
        formError: true
      })
    }
  }

  render() {
    return (
      <div className="signin-wrapper">
        <form onSubmit={(event) => this.submitForm(event)}>
          <FormField
            id={'email'}
            formData={this.state.formData.email}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={'password'}
            formData={this.state.formData.password}
            change={(element) => this.updateForm(element)}
          />
          {
            this.state.formError ?
              <div className="error-label">
                Email or password not correct.
              </div>
              : null
          }
          <div className="login-btn-wrapper">
            <button
              className="btn waves-effect waves-light"
              onClick={(event) => this.submitForm(event)}
            >
              Login
          </button>
          </div>
        </form>
        <UtilButton
          type="default"
          title="Create account +"
          linkTo="/register"
          addStyles={{
            margin: "10px 0 0 0"
          }}
        />
      </div>
    );
  }
}

export default connect()(withRouter(Login));