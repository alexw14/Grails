import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Auth from './hoc/auth';
import Home from './components/Home';
import RegisterLogin from './components/RegisterLogin';
import Register from './components/RegisterLogin/register';
import Shop from './components/Shop';
import AddProduct from './components/User/Admin/addProduct';
import Management from './components/User/Admin/Management';
import ProductDetail from './components/Product';
import UserCart from './components/User/cart';

import UserDashboard from './components/User';
import UpdateProfile from './components/User/updateProfile';
import ManageSite from './components/User/Admin/manageSite';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
        <Route path="/user/cart" exact component={Auth(UserCart, true)} />
        <Route path="/user/user-profile" exact component={Auth(UpdateProfile, true)} />
        <Route path="/admin/add-product" exact component={Auth(AddProduct, true)} />
        <Route path="/admin/manage-category" exact component={Auth(Management, true)} />
        <Route path="/admin/site-info" exact component={Auth(ManageSite, true)} />

        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/register-login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/sneaker/:id" exact component={Auth(ProductDetail, null)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  )
}

export default Routes;
