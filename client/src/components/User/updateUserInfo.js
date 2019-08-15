import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid, populateUserFields } from '../utils/Form/FormActions';
import { updateProfileUser, clearUpdateProfileUser } from '../../actions/user_actions';

class UpdateUserInfo extends Component {

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
          placeholder: 'Full Name'
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
      }
    }
  }

  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'update_user');
    this.setState({
      formError: false,
      formData: newFormData
    });
  }

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'update_user');
    let formIsValid = isFormValid(this.state.formData, 'update_user');
    if (formIsValid) {
      this.props.dispatch(updateProfileUser(dataToSubmit)).then(() => {
        if (this.props.user.updateUser.success) {
          this.setState({
            formSuccess: true
          }, () => {
            setTimeout(() => {
              this.props.dispatch(clearUpdateProfileUser());
              this.setState({ formSuccess: false });
            }, 3000)
          });
        }
      });
    } else {
      this.setState({
        formError: true
      });
    }
  }

  componentDidMount() {
    const newFormData = populateUserFields(this.state.formData, this.props.user.userData);
    this.setState({
      formData: newFormData
    });
  }

  render() {
    return (
      <div className="update-profile-container">
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
          <div>
            {
              this.state.formSuccess ?
                <div className="form-success">Success</div>
                : null
            }
            {
              this.state.formError ?
                <div className="error-label">Please check your data</div>
                : null
            }
            <div className="update-btn" onClick={(event) => this.submitForm(event)}>Update</div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UpdateUserInfo);