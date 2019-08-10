import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid, resetFields } from '../../utils/Form/FormActions';
import { getCategories, addCategory } from '../../../actions/products_actions';

class ManageCategories extends Component {

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
          placeholder: 'Enter product category'
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

  showCategories = () => (
    this.props.products.byCategories ?
      this.props.products.byCategories.map((item, i) => (
        <div className="category_item" key={item._id}>
          {item.name}
        </div>
      ))
      : null
  )

  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'categories');
    this.setState({
      formError: false,
      formData: newFormData
    });
  }

  handleResetFields = () => {
    const newFormData = resetFields(this.state.formData, 'categories')
    this.setState({
      formData: newFormData,
      formSuccess: true,
    });
    setTimeout(() => {
      this.setState({ formSuccess: false })
    }, 3000);
  }

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'categories');
    let formIsValid = isFormValid(this.state.formData, 'categories');
    let existingCategories = this.props.products.byCategories;
    if (formIsValid) {
      this.props.dispatch(addCategory(dataToSubmit, existingCategories)).then(response => {
        if (response.payload.success) {
          this.handleResetFields();
        } else {
          this.setState({ formError: true })
        }
      })
    } else {
      this.setState({
        formError: true
      });
    }
  }

  componentDidMount() {
    this.props.dispatch(getCategories());
  }

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Categories</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">
              {this.showCategories()}
            </div>
          </div>
          <div className="right">
            <form onSubmit={(event) => this.submitForm(event)}>
              <FormField
                id={'name'}
                formData={this.state.formData.name}
                change={(element) => this.updateForm(element)}
              />
              {
                this.state.formSuccess ?
                  <div className="form_success">Success!</div>
                  : null
              }
              {
                this.state.formError ?
                  <div className="error_label">Please check your data</div>
                  : null
              }
              <button onClick={(event) => this.submitForm(event)}>Add Category</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(ManageCategories);