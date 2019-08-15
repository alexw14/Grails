import React from 'react';
import moment from 'moment';

const UserHistoryBlock = (props) => {

  const renderHistoryBlocks = () => (
    props.purchaseHistory ?
      // reverse array so most recent purcahse shows at the top
      props.purchaseHistory.reverse().map((item, i) => (
        <tr key={i}>
          <td>{moment(item.dateOfPurchase).format("MM-DD-YYYY")}</td>
          <td>{item.brand} {item.name}</td>
          <td>{item.quantity}</td>
          <td>${item.price}</td>
        </tr>
      ))
      : null
  )

  return (
    <div className="history-blocks">
      <table>
        <thead>
          <tr>
            <th>Date of Purchase</th>
            <th>Sneaker</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {renderHistoryBlocks()}
        </tbody>
      </table>
    </div>
  );
};

export default UserHistoryBlock;