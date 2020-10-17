import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../logo.svg";
import "../App.css";
import { Button, ButtonGroup, ToggleButtonGroup, ToggleButton, Dropdown, MenuItem, Container } from "react-bootstrap";

function Formregister() {
  const [email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState([]);

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  //? Credentialverify  function is called when user submit the button
  const credentialVerify = (event) => {
    event.preventDefault();

    const dataSend = {
      email: email,
      FirstName: FirstName,
      LastName: LastName,
      password: password,
    };
    const headers = new Headers();
    headers.append("content-type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(dataSend),
      redirect: "follow",
    };
    const request = new Request("https://yogaoutlet.herokuapp.com/api/customers", options);

    (async () => {
      const incomingdata = await fetch(request)
        .then((res) => {
          // TOdo catch error here
          window.location.href = "https://yogaoutlet.herokuapp.com/signin";
        })
        .then.catch((err) => console.log(err));

      setItems(incomingdata);
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
    })();
  };

  return (
    <div style={{ Height: "34rem", marginLeft: "0px", justifyContent: "left" }}>
      {
        <form style={{ width: "100% " }} method="POST" className="formstyle" onSubmit={credentialVerify}>
          <div style={{ paddingLeft: "0%", paddingRight: "5%", marginLeft: "0", marginRight: "2%" }} className="form-group row">
            {" "}
            <label
              style={{ paddingRight: "22rem", display: "flex", whiteSpace: "nowrap", fontSize: "1.9rem" }}
              className="col-lg-3 col-form-label form-check-label"
              for="enterEmail"
            >
              Email address
            </label>
            <div class="col-md-9">
              <input
                class="form-control"
<<<<<<< HEAD
                style={{ width: "25vw", minWidth: "19rem" }}
=======
                style={{ width: "25vw", minWidth: "19rem", fontSize: "1.7rem" }}
>>>>>>> 3aa2f162263d58ca7555717fe695fdd043964746
                type="text"
                placeholder="email"
                id="enterEmail"
                name="email"
                value={email}
                onChange={updateEmail}
              />
            </div>
          </div>

          <div style={{ paddingLeft: "0%", paddingRight: "5%", marginLeft: "0", marginRight: "2%" }} className="form-group row">
            <label
              for="firstName"
<<<<<<< HEAD
              style={{ paddingRight: "222rem", display: "flex", whiteSpace: "nowrap", fontSize: "1.9rem" }}
=======
              style={{ paddingRight: "22rem", display: "flex", whiteSpace: "nowrap", fontSize: "1.9rem" }}
>>>>>>> 3aa2f162263d58ca7555717fe695fdd043964746
              className="col-lg-3 col-form-label form-check-label"
            >
              First Name
            </label>
            <div class="col-md-9">
              <input
                class="form-control"
<<<<<<< HEAD
                style={{ width: "25vw", minWidth: "19rem" }}
=======
                style={{ width: "25vw", minWidth: "19rem", fontSize: "1.7rem" }}
>>>>>>> 3aa2f162263d58ca7555717fe695fdd043964746
                type="text"
                placeholder="firstname"
                id="firstName"
                name="FirstName"
                value={FirstName}
                onChange={updateFirstName}
              />
            </div>
          </div>

          <div style={{ paddingLeft: "0%", paddingRight: "5%", marginLeft: "0", marginRight: "2%" }} className="form-group row">
            <label for="lastName" style={{ paddingRight: "22rem", display: "flex", whiteSpace: "nowrap", fontSize: "1.9rem" }} className="col-lg-3 col-form-label form-check-label">
              Last Name
            </label>
            <div class="col-md-9">
              <input
                for="passwordRis"
                class="form-control"
<<<<<<< HEAD
                style={{ width: "25vw", minWidth: "19rem" }}
=======
                style={{ width: "25vw", minWidth: "19rem", fontSize: "1.7rem" }}
>>>>>>> 3aa2f162263d58ca7555717fe695fdd043964746
                type="text"
                placeholder="lastname"
                to="lastName"
                name="LastName"
                value={LastName}
                onChange={updateLastName}
              />
            </div>
          </div>
          <div style={{ paddingLeft: "0%", paddingRight: "5%", marginLeft: "0", marginRight: "2%" }} className="form-group row">
            <label for="password" style={{ paddingRight: "22rem", display: "flex", whiteSpace: "nowrap", fontSize: "1.9rem" }} className="col-lg-3 col-form-label form-check-label">
              Password
            </label>
            <div class="col-md-9">
              <input
                class="form-control"
<<<<<<< HEAD
                style={{ width: "25vw", minWidth: "19rem" }}
=======
                style={{ width: "25vw", minWidth: "19rem", fontSize: "1.7rem" }}
>>>>>>> 3aa2f162263d58ca7555717fe695fdd043964746
                type="text"
                placeholder="Password"
                to="password"
                name="password"
                value={password}
                onChange={updatePassword}
              />
            </div>
          </div>

          <small id="passwordRis" class="form-text text-muted" style={{ paddingRight: "22%", paddingLeft: "3.3%", fontSize: "115%", display: "flex" }}>
<<<<<<< HEAD
            Password must contains atleast an alphabast, a number and sepeical charter in it
=======
            Password must contains atleast an alphabast, a number and sepeical character in it
>>>>>>> 3aa2f162263d58ca7555717fe695fdd043964746
          </small>
          <div class="col-md-9" style={{ paddingLeft: "33%" }}>
            <ButtonGroup style={{ paddingTop: "3rem" }}>
              <Button
                className=" buttonBlock"
                variant="primary"
                type="submit"
                style={{ height: "3rem", paddingLeft: "16%", marginLeft: "0px", width: "12rem", justifyContent: "left", fontSize: "1.5rem" }}
              >
                Submit
              </Button>
            </ButtonGroup>
          </div>
        </form>
      }
    </div>
  );
}

export default Formregister;
