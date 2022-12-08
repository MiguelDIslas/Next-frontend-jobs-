import React from 'react'

const Loader = () => {
  return (
    <div className="d-flex justify-content-center center-loader">
      <div className="lds-ellipse">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader;