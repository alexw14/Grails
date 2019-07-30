import React from 'react';

const PageTopSection = (props) => {
  return (
    <div className="page_top">
      <div className="container">
        {props.title}
      </div>
    </div>
  );
};

export default PageTopSection;