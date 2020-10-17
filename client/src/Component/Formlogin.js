import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../logo.svg";
import "../App.css";
import { Button, ButtonGroup, ToggleButtonGroup, ToggleButton, Dropdown, MenuItem, Container } from "react-bootstrap";

function Forlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState([]);
  const [missingField, setMissingField] = useState(null);

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setMissingField(null);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // this is the function that will be called when the user submit the form and will passed the event as well
  const credentialVerify = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMissingField("Email or Password is missing!");
    } else {
      setMissingField(null);
      const dataSend = { email: email, password: password, logout: false };
      const headers = new Headers();
      headers.append("content-type", "application/json");

      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(dataSend), // here datassend is object so first convert the data into object before stingify

        credentials: "include",
      };
      console.log(email);

      const request = new Request("https:/api/newuser", options);

      (async () => {
        const incomingdata = await fetch(request)
          .then((res) => {
            if (res.status >= 200 && res.status < 405) {
              window.location.href = "https://yogaoutlet.herokuapp.com/";
            } else {
              return res.json();
            }
          })
          .then((body) => {
            return body;
          })
          .catch((err) => console.log("err"));

        setItems(incomingdata);
        setEmail("");
        setPassword("");
      })();
    }
  };

  return (
    <>
      <div style={{ paddingTop: "15%", marginLeft: "0px", justifyContent: "left" }}>
        {
          // <form method="POST" className="formstyle" onSubmit={credentialVerify}>

          <form method="POST" onSubmit={credentialVerify} className="form" role="form">
            <div style={{ paddingLeft: "5%", padding: "5%" }} className="form-group row">
              <label style={{ paddingRight: "22rem", display: "flex", whiteSpace: "nowrap" }} className="col-lg-3 col-form-label form-check-label" for="enterEmail">
                Email address
              </label>
              <div class="col-md-9">
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="email"
                  id="enterEmail"
                  name="email"
                  value={email}
                  onChange={updateEmail}
<<<<<<< HEAD
                  style={{ width: "25vw", minWidth: "19rem" }}
=======
                  style={{ width: "25vw", minWidth: "19rem", fontSize: "1.7rem" }}
>>>>>>> 3aa2f162263d58ca7555717fe695fdd043964746
                />
              </div>
            </div>

            <div style={{ paddingLeft: "5%", padding: "5%" }} className="form-group row">
              <label style={{ paddingRight: "22rem" }} className="col-lg-3 col-form-label form-check-label" for="enterPassword ">
                Password
              </label>
              <div class="col-md-9">
                <input
                  style={{}}
                  type="text"
                  placeholder="Password"
                  class="form-control"
                  name="password"
                  id="enterPassword"
                  value={password}
                  onChange={updatePassword}
<<<<<<< HEAD
                  style={{ width: "25vw", minWidth: "19rem" }}
=======
                  style={{ width: "25vw", minWidth: "19rem", fontSize: "1.7rem" }}
>>>>>>> 3aa2f162263d58ca7555717fe695fdd043964746
                />
              </div>
            </div>
            <div class="col-md-9" style={{ paddingLeft: "36%" }}>
              <ButtonGroup style={{ paddingTop: "3rem" }}>
                <Button
                  className=" buttonBlock"
                  variant="primary"
                  type="submit"
                  style={{ height: "3rem", paddingLeft: "16%", marginLeft: "0px", width: "12rem", justifyContent: "left", fontSize: "1.5rem"}}
                >
                  Submit
                </Button>
              </ButtonGroup>
            </div>
          </form>
        }
      </div>
      <small style={{ color: "red", paddingTop: "5%" }}>{missingField != null ? `*${missingField}` : ""} </small>
    </>
  );
}

export default Forlogin;
