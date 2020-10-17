import React, { useState, useEffect } from "react";
import "../App.css";
import SigninOptions from "./SigninOptions";
import Useraccount from "./Useraccount";
import { savsAs } from "file-saver";

function Signin({ userData, userstatus, finalBuy, buyNow, resetBuynow }) {
  const [allInvoices, setallInvoices] = useState([]);

  useEffect(() => {
    resetBuynow(false);
    const headers = new Headers();
    headers.append("content-type", "application/json");

    const options = {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(),
    };

    const newRequest = new Request("https://yogaoutlet.herokuapp.com/api/invoice-all", options);

    (async () => {
      const invoiceFetch = await fetch(newRequest)
        .then((data) => {
          return data.json();
        })
        .then((data1) => {
          setallInvoices(data1);
        })
        .catch();
    })();
  }, [finalBuy == null && buyNow === false]);
  // here if the log says the customer clicked the buy now button and items in it, it call API
  if (finalBuy !== null && buyNow === true) {
    resetBuynow(false);
    const headers = new Headers();
    headers.append("content-type", "application/json");
    // let token =localStorage.getItem()
    // this incase from local storage headers.append("Authorization",bearer"token")
    console.log(JSON.stringify(finalBuy));
    const options = {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(finalBuy),
    };

    const newRequest = new Request("https://yogaoutlet.herokuapp.com/api/invoice", options);

    (async () => {
      const invoiceFetch = await fetch(newRequest)
        .then((data) => {
          return data.json();
        })
        .then((data1) => {
          setallInvoices(data1);
        })
        .catch((err) => {});
    })();
  }

  console.log(userData);
  return <div>{userstatus ? <Useraccount userinfo={userData} userstatus={userstatus} finalBuy={finalBuy} allInvoices={allInvoices} /> : <SigninOptions />}</div>;

  // <SigninOptions />
}
export default Signin;
