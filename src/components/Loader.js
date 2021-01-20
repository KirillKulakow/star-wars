import React from "react";

const Loader = ({ width }) => {
  return (
    <svg
      version='1.1'
      id='L4'
      x='0px'
      y='0px'
      viewBox='0 0 60 20'
      enableBackground='new 0 0 0 0'
      style={{ width: width, margin: "0 auto" }}
    >
      <circle fill='#fff' stroke='none' cx='6' cy='10' r='6'>
        <animate
          attributeName='opacity'
          dur='1s'
          values='0;1;0'
          repeatCount='indefinite'
          begin='0.1'
        />
      </circle>
      <circle fill='#fff' stroke='none' cx='26' cy='10' r='6'>
        <animate
          attributeName='opacity'
          dur='1s'
          values='0;1;0'
          repeatCount='indefinite'
          begin='0.2'
        />
      </circle>
      <circle fill='#fff' stroke='none' cx='46' cy='10' r='6'>
        <animate
          attributeName='opacity'
          dur='1s'
          values='0;1;0'
          repeatCount='indefinite'
          begin='0.3'
        />
      </circle>
    </svg>
  );
};

export default Loader;
