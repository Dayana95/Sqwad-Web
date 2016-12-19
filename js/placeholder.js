import React from 'react';
var Loader = require('halogen/PulseLoader');


export default function Placeholder() {
  return (
    <div className="container">
    <div className="col-md-9">
    <div className="placeholder">
        <Loader color="#6b00d9" size="16px" margin="4px"/>
    </div>
    </div>

    </div>
  );
}