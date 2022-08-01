import React from "react";
import { useNavigate } from "react-router-dom";
import './PageNotFound.css'

export default function PageNotFound() {
  const navigate = useNavigate()
  return (
    <>
      <div className="face">
        <div className="band">
          <div className="red"></div>
          <div className="white"></div>
          <div className="blue"></div>
        </div>
        <div className="eyes"></div>
        <div className="dimples"></div>
        <div className="mouth"></div>
      </div>

      <h1>Oops! Something went wrong!</h1>
      <div className="btn" onClick={()=> navigate('/')}>Return to Home</div>
    </>
  );
}
