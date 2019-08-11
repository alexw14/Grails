import React from 'react';
import UpdateSiteInfo from './upateSiteInfo';
import UserLayout from '../../../hoc/user';

const ManageSite = () => {
  return (
      <UserLayout>
        <UpdateSiteInfo />
      </UserLayout>
  );
};

export default ManageSite;