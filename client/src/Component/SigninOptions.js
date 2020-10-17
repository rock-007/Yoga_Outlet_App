import React, { useState, useEffect, useMemo } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Formlogin from "./Formlogin";
import Formregister from "./Formregister";

function SigninOptions({ userinfo2 }) {
 
  const [login, setlogin] = useState(true);
  const [register, setregister] = useState(false);

  function loginclicked() {
    setlogin(true);
    setregister(false);
  }
  function registerclicked() {
    setlogin(false);
    setregister(true);
  }
  console.log("userinfo2 21 at SIGNINOPTIONS", userinfo2);
  // TO Do check the login input and ifusers put worng info or empty filed then pop up error using Rejex
  return (
    <div>
      <div className="root-container" style={{ paddingRight: "10%", maxWidth: "165%" }}>
        <div className="box-controller">
          <div style={{ borderRight: "1px solid grey" }} onClick={loginclicked}>
            <i>
              {" "}
              <em> Login </em>
            </i>
          </div>
          <div onClick={registerclicked}>
            <em>Register </em>
          </div>
        </div>

        <div className="box-controller-input" style={{ paddingTop: "0px", marginTop: "0px" }}>
          <div style={{ maxHeight: "55rem", minHeight: "39rem", justifyContent: "left" }}>
             {login && <Formlogin />} {register && <Formregister />}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SigninOptions;
