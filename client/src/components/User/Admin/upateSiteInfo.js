import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid, populateUserFields } from '../../utils/Form/FormActions';
import { getSiteInfo } from '../../../actions/site_actions';

class UpateSiteInfo extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formData: {
      address: {
        element: 'input',
        value: '',
        config: {
          name: 'address_input',
          type: 'text',
          placeholder: 'Enter Address',
          label: 'Address'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      hours: {
        element: 'input',
        value: '',
        config: {
          name: 'hours_input',
          type: 'text',
          placeholder: 'Enter Working Hours',
          label: 'Working Hours'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      phone: {
        element: 'input',
        value: '',
        config: {
          name: 'phone_input',
          type: 'text',
          placeholder: 'Enter Phone Number',
          label: 'Phone Number'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter contact email',
          label: 'Contact Email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
    }
  }

  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'site-info');
    this.setState({
      formError: false,
      formData: newFormData
    })
  }

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'site-info');
    let formIsValid = isFormValid(this.state.formData, 'site-info');
    if (formIsValid) {
      console.log(dataToSubmit)
    } else {
      this.setState({
        formError: true
      })
    }
  }

  componentDidMount() {
    this.props.dispatch(getSiteInfo()).then(() => {
      const newFormData = populateUserFields(this.state.formData, this.props.site.siteInfo[0]);
      this.setState({
        formData: newFormData
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Site Info</h1>
        <form onSubmit={(event) => this.submitForm(event)}>
          <FormField
            id={'address'}
            formData={this.state.formData.address}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={'hours'}
            formData={this.state.formData.hours}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={'phone'}
            formData={this.state.formData.phone}
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
                <div className="form_success">Success</div>
                : null
            }
            {
              this.state.formError ?
                <div className="error_label">Please check your data</div>
                : null
            }
            <button onClick={(event) => this.submitForm(event)}>Update Site Info</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    site: state.site
  }
}

export default connect(mapStateToProps)(UpateSiteInfo);