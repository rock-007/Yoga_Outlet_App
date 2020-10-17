import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Link } from "react-router-dom";
import ProjectLogo from "./Img/Yoga1.png";
import GithubLogo from "./Img/GithubLogo1.png";
import history from "./History";
import { withRouter } from "react-router";

import { Button, ButtonGroup, ToggleButtonGroup, ToggleButton, Dropdown, DropdownButton, MenuItem, Container } from "react-bootstrap";

function Nav({ userinfo, userstatus, basketItems }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  let productItemInCart = basketItems.length;
  // const [list, setList] = useState([1, 2, 3]);
  console.log("14xx", isDropdownOpen);

  const toggleDropDown = (e) => {
    e.preventDefault();
    console.log("22df", history.push("/signin"));
    history.push("/signin");

    console.log("18xx", e);
    setDropdownOpen((prevState) => !prevState);
  };

  const DropDownlist = () => {
    function dropDownItem(props) {
      return (
        <a href="#" className="menu-item">
          <span className="icon-button">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </a>
      );
    }

    return (
      <div className="dropdown1" style={{ height: "50px" }}>
        <dropDownItem>el</dropDownItem>
      </div>
    );
  };

  const navStyle = {
    color: "White",
  };
  console.log("eedr1", userinfo);
  let y111;
  // if cookies are present then signin and change the signin to `${name of account holder}`
  const delete_cookie = () => {
    console.log("eedrxc", userinfo);
    const dataSend = { email: userinfo[0].email || null, password: userinfo[0].password || null, logout: true };
    const headers = new Headers();
    headers.append("content-type", "application/json");
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(dataSend),
      credentials: "include",
    };
    console.log("deleet", dataSend);

    const request = new Request("/api/newuser", options);

    (async () => {
      const incomingdata = await fetch(request)
        .then((res) => {
          if (res.status > 200 && res.status < 400) {
          } else {
            return res.json();
          }
        })
        .then((body) => {
          window.localStorage.removeItem("user-status");
          window.localStorage.removeItem("user-data");
          window.localStorage.removeItem("buyNowFinal");
          window.localStorage.removeItem("user-basket");
          window.location.href = "https://yogaoutlet.herokuapp.com/";
          return body;
        });
    })();
  };

  return (
    <nav className="header">
      <label className="logo">
        <a href="/">
          <img className="yoga-image" src={ProjectLogo} />
        </a>
      </label>
      {/* //div */}
      <a href="https://github.com/rock-007/JavaScript-Project/tree/master/E-commerece-project">
        <img style={{ width: "149", height: "149", position: "absolute", top: "0", left: "0" }} src={GithubLogo} className="attachment-full size-full"></img>
      </a>

      <ul>
        <li>
          <a href="./basket">
            <i className="fa" style={{ "font-size": "24px" }}>
              &#xf07a;
            </i>
            <span class="badge badge-warning" id="lblCartCount">
              {productItemInCart}
            </span>
          </a>
        </li>
        <li className="myList">
          <Dropdown
            as={ButtonGroup}
            style={{
              marginTop: "5px",
              position: "relative",
              float: "left",
              top: "13px",
              height: "3rem",
              outline: "none !important",
              borderStyle: "none",
              border: "none !important",
              background: "none",
            }}
          >
            <Button variant="success" href="./signin" style={{ background: "none", borderStyle: "none", borderStyle: "none", outline: "none  " }}>
              {userstatus ? (
                <i
                  style={{ fontSize: "26px", border: "none", color: "white", background: "none", outline: "none" }}
                  className=" fas fa-user-circle	
                "
                ></i>
              ) : (
                <i
                  style={{
                    "border": "none",
                    "background": "none",
                    "outline": "none",
                    "color": "white",

                    "font-size": "1.8rem",
                    "fontFamily": "Roboto",
                    "textTransform": "none",
                    "marginLeft": "-3rem",
                  }}
                >
                  Sign in/ Register
                </i>
              )}
            </Button>

            <Dropdown.Toggle
              variant="success"
              aria-expanded="true"
              style={{ position: "relative", marginTop: "0.4rem", background: "none", borderStyle: "none", outline: "none  ", marginRight: "1rem" }}
            />

            <Dropdown.Menu style={{ background: "white" }}>
              <Dropdown.Item href="https://yogaoutlet.herokuapp.com/">Home Page</Dropdown.Item>
              <Dropdown.Item href="https://yogaoutlet.herokuapp.com/signin">Purchase History</Dropdown.Item>
              <Dropdown.Item
                style={{ backgroundColor: "white" }}
                // href="/signin"
                onClick={(e) => {
                  console.log("123x1");
                  delete_cookie();
                }}
              >
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
