import React, { Component } from 'react';

const loading = () => {
  console.log('loading loaded');
  return <h1 data-test-id="loading-screen">Loading...</h1>;
};

export default loading;
