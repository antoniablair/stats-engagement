import React from 'react';

const Filler = (props) => {
  return <div className="filler"></div>
}

const ProgressBar = (props) => {
  return (
  <div className="progress-bar">
    <Filler />
  </div>)
};