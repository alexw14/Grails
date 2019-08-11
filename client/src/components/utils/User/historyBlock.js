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
          <td>{item.price}</td>
          <td>{item.quantity}</td>
        </tr>
      ))
      : null
  )

  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>Date of purchase</th>
            <th>Sneaker</th>
            <th>Price</th>
            <th>Quantity</th>
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