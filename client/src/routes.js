import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Home from './components/Home';
import RegisterLogin from './components/RegisterLogin';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/register-login" exact component={RegisterLogin} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  )
}

export default Routes;
