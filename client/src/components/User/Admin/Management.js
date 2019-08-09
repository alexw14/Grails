import React from 'react';
import UserLayout from '../../../hoc/user';
import ManageBrands from './manageBrands';
import ManageCategories from './manageCategories';

const ManageCategory = () => {
  return (
    <UserLayout>
      <ManageBrands />
      <ManageCategories />
    </UserLayout>
  );
};

export default ManageCategory;