import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid, populateUserFields } from '../../utils/Form/FormActions';
import { getSiteInfo, updateSiteInfo } from '../../../actions/site_actions';

class UpateSiteInfo extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formData: {
      location: {
        element: 'input',
        value: '',
        config: {
          name: 'location_input',
          type: 'text',
          placeholder: 'Enter Location',
          label: 'Location'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      social: {
        element: 'input',
        value: '',
        config: {
          name: 'social_input',
          type: 'text',
          placeholder: 'Enter Social Media',
          label: 'Social Media'
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
      this.props.dispatch(updateSiteInfo(dataToSubmit)).then(() => {
        this.setState({
          formSuccess: true
        }, () => {
          setTimeout(() => {
            this.setState({ formSuccess: false });
          }, 3000);
        });
      });
    } else {
      this.setState({
        formError: true
      });
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
      <div className="update-site-info-container">
        <div className="title">Site Info</div>
        <form onSubmit={(event) => this.submitForm(event)}>
          <FormField
            id={'location'}
            formData={this.state.formData.location}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={'social'}
            formData={this.state.formData.social}
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
                <div className="form-success">Success</div>
                : null
            }
            {
              this.state.formError ?
                <div className="error-label">Please check your data</div>
                : null
            }
            <div className="update-site-info-btn" onClick={(event) => this.submitForm(event)}>Update Site Info</div>
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