import React from 'react';
import UserLayout from '../../hoc/user';
import MyButton from '../utils/button';
import UserHistoryBlock from '../utils/User/historyBlock';

const UserDashboard = ({ user }) => {

  return (
    <UserLayout>
      <div>
        <div className="user-info-panel">
          <div className="title">User Information</div>
          <div className="user-info">
            <span>{user.userData.name}</span>
            <span>{user.userData.email}</span>
          </div>
          <MyButton
            type="default"
            title="Edit Profile"
            linkTo="/user/user-profile"
          />
        </div>
        {
          user.userData.history ?
            <div className="user-purchase-history-panel">
              <div className="title">Order History</div>
              <div className="user-product-block-wrapper">
                <UserHistoryBlock
                  purchaseHistory={user.userData.history}
                />
              </div>
            </div>
            : null
        }

      </div>
    </UserLayout>
  );
};

export default UserDashboard;