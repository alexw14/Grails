import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/FormActions';
import { registerUser } from '../../actions/user_actions';
import Dialog from '@material-ui/core/Dialog';

class Register extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Full name'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Email'
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
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm_password_input',
          type: 'password',
          placeholder: 'Confirm password'
        },
        validation: {
          required: true,
          confirm: 'password'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'register');
    this.setState({
      formError: false,
      formData: newFormData
    })
  }

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'register');
    let formIsValid = isFormValid(this.state.formData, 'register');
    if (formIsValid) {
      this.props.dispatch(registerUser(dataToSubmit)).then(res => {
        if (res.payload.success) {
          this.setState({
            formError: false,
            formSuccess: true,
          });
          setTimeout(() => {
            this.props.history.push('/login')
          }, 3000)
        } else {
          this.setState({
            formError: true
          })
        }
      }).catch(e => {
        this.setState({
          formError: true
        })
      })
    } else {
      this.setState({
        formError: true
      })
    }
  }

  render() {
    return (
      <div className="register-page-wrapper">
        <div className="container">
          <div className="register-login-container">
            <div className="left-section">
              <div
                style={{
                  background: `url(/images/featured/bred1back.jpeg)`,
                  width: '100%',
                  height: '400px',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain'
                }}
              />
            </div>
            <div className="right-section">
              <div className="register-title">Create an account</div>
              <div className="register-wrapper">
                <form onSubmit={(event) => this.submitForm(event)}>
                  <FormField
                    id={'name'}
                    formData={this.state.formData.name}
                    change={(element) => this.updateForm(element)}
                  />
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
                  <FormField
                    id={'confirmPassword'}
                    formData={this.state.formData.confirmPassword}
                    change={(element) => this.updateForm(element)}
                  />
                  <div>
                    {
                      this.state.formError ?
                        <div className="error-label">Please check your data</div>
                        : null
                    }
                    <div className="register-btn-wrapper">
                      <button
                        className="btn waves-effect waves-light transparent"
                        onClick={(event) => this.submitForm(event)}
                        style={{ color: 'black' }}
                      >
                        Create account
                    </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Dialog open={this.state.formSuccess}>
          <div className="dialog-alert">
            <div>Congratulations!</div>
            <div>You will be redirected to the login in a couple of seconds...</div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(Register);