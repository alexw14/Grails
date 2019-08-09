import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid, resetFields } from '../../utils/Form/FormActions';
import { getBrands, addBrand } from '../../../actions/products_actions';

class ManageBrand extends Component {

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
          placeholder: 'Enter product brand'
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

  showBrands = () => (
    this.props.products.byBrands ?
      this.props.products.byBrands.map((item, i) => (
        <div className="category_item" key={item._id}>
          {item.name}
        </div>
      ))
      : null
  )

  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'brands');
    this.setState({
      formError: false,
      formData: newFormData
    });
  }

  handleResetFields = () => {
    const newFormData = resetFields(this.state.formData, 'brands')
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
    let dataToSubmit = generateData(this.state.formData, 'brands');
    let formIsValid = isFormValid(this.state.formData, 'brands');
    let existingBrands = this.props.products.byBrands;
    if (formIsValid) {
      this.props.dispatch(addBrand(dataToSubmit, existingBrands)).then(response => {
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
    this.props.dispatch(getBrands());
  }

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Brands</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">
              {this.showBrands()}
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
              <button onClick={(event) => this.submitForm(event)}>Add Brand</button>
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

export default connect(mapStateToProps)(ManageBrand);