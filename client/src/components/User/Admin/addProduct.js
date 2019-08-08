import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../hoc/user';
import FormField from '../../utils/Form/formfield';
import FileUpload from '../../utils/Form/FileUpload';
import { update, generateData, isFormValid, populateOptionFields, resetFields } from '../../utils/Form/FormActions';
import { getBrands, getCategories, addProduct, clearProduct } from '../../../actions/products_actions';

class AddProduct extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Product Name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter product name'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Product Description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter product description'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      colorway: {
        element: 'input',
        value: '',
        config: {
          label: 'Colorway',
          name: 'colorway_input',
          type: 'text',
          placeholder: 'Enter colorway'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      releaseDate: {
        element: 'input',
        value: '',
        config: {
          label: 'Product Release Date',
          name: 'releaseDate_input',
          type: 'text',
          placeholder: 'Enter product release date'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Product Price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter product price'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      brand: {
        element: 'select',
        value: '',
        config: {
          label: 'Product Brand',
          name: 'brand_input',
          options: []
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      category: {
        element: 'select',
        value: '',
        config: {
          label: 'Product Category',
          name: 'category_input',
          options: []
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Shipping',
          name: 'shipping_input',
          options: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' }
          ]
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Available',
          name: 'available_input',
          options: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' }
          ]
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Publish',
          name: 'publish_input',
          options: [
            { key: true, value: 'Public' },
            { key: false, value: 'Private' }
          ]
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: '',
        showLabel: false
      }
    }
  }

  updateFields = (newFormData) => {
    this.setState({
      formData: newFormData
    });
  }

  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'products');
    this.setState({
      formError: false,
      formData: newFormData
    });
  }

  handleResetField = () => {
    const newFormData = resetFields(this.state.formData, 'products')
    this.setState({
      formData: newFormData,
      formSuccess: true,
    });
    setTimeout(() => {
      this.setState({
        formSuccess: false
      }, () => {
        this.props.dispatch(clearProduct());
      });
    }, 3000);
  }

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'products');
    let formIsValid = isFormValid(this.state.formData, 'products');
    if (formIsValid) {
      this.props.dispatch(addProduct(dataToSubmit)).then(() => {
        if (this.props.products.addProduct.success) {
          this.handleResetField();
        } else {
          this.setState({
            formError: true
          });
        }
      })
    } else {
      this.setState({
        formError: true
      });
    }
  }

  handleImages = () => {

  }

  componentDidMount() {
    const formData = this.state.formData;
    this.props.dispatch(getBrands()).then(res => {
      const newFormData = populateOptionFields(formData, this.props.products.byBrands, 'brand');
      this.updateFields(newFormData);
    });
    this.props.dispatch(getCategories()).then(res => {
      const newFormData = populateOptionFields(formData, this.props.products.byCategories, 'category');
      this.updateFields(newFormData);
    });
  }

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add Product</h1>
          <form onSubmit={(event) => this.submitForm(event)}>
            <FileUpload
              handleImages={(images) => this.handleImages(images)}
              reset={this.state.formSuccess}
            />
            <FormField
              id={'name'}
              formData={this.state.formData.name}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'description'}
              formData={this.state.formData.description}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'colorway'}
              formData={this.state.formData.colorway}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'releaseDate'}
              formData={this.state.formData.releaseDate}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'price'}
              formData={this.state.formData.price}
              change={(element) => this.updateForm(element)}
            />
            <div className="form_devider"></div>
            <FormField
              id={'brand'}
              formData={this.state.formData.brand}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'category'}
              formData={this.state.formData.category}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'shipping'}
              formData={this.state.formData.shipping}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'available'}
              formData={this.state.formData.available}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'publish'}
              formData={this.state.formData.publish}
              change={(element) => this.updateForm(element)}
            />
            <div>
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
              <button onClick={(event) => this.submitForm(event)}>Add Product</button>
            </div>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}


export default connect(mapStateToProps)(AddProduct);