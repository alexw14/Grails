import React from 'react';
import UserLayout from '../../hoc/user';
import UpdateUserInfo from './updateUserInfo';

const UpdateProfile = () => {
  return (
    <UserLayout>
      <div className="title">Profile</div>
      <UpdateUserInfo />
    </UserLayout>
  );
};

export default UpdateProfile;