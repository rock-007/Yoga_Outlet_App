import React, { useState, useEffect } from "react";
import "../App.css";
import { makeStyle, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from "@material-ui/core";
function Useraccount({ userinfo, userstatus, allInvoices }) {
  let generateFile = (content, fileName) => {
    let content1 = content.slice(28);
    var decodedData = atob(content1);
    const length = decodedData.length;
    const arrayBuffer = new ArrayBuffer(length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < length; i++) {
      uintArray[i] = decodedData.charCodeAt(i);
    }
    const blob = new Blob([uintArray], { type: "application/pdf" });

    console.log(blob);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  const generatePdf = (invoice_Name) => {
    let invoice_Object = {
      invoice_Name: invoice_Name,
    };

    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append("responseType", "bufferarray");
    const options = {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(invoice_Object),
    };
    const newRequest = new Request("https://yogaoutlet.herokuapp.com/api/invoice-only", options);

    (async () => {
      const invoice_Call = await fetch(newRequest)
        .then((res) => {
          var headers = res.headers;

          const contentType = res.headers.get("Content-Type");
          var contentDisposition = res.headers.get("content-disposition");

          return res.text();
        })
        .then((data) => {
          generateFile(data, invoice_Name);
        });
    })();
  };
  let creatTime = userinfo[0].create_time || "0-0-0";

  console.log("ewr", creatTime);

  const initails1 = (name1) => {
    let firstNameOnly = name1[0].first_name;

    let string1array = firstNameOnly.split("");

    let newarray1 = [];
    newarray1.push(string1array[0]);
    newarray1.push(string1array[1]);

    let new1 = newarray1.join("");

    return new1;
  };
  return (
    <>
      <div className="BasketSigninProducts" style={{ float: "left" }}>
        <TableContainer className="BasketSigninItems" component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="tex-lg-center font-weight-bold" style={{ fontSize: "200%", fontStyle: "normal", textAlign: "center" }}>
                  Invoice No
                </TableCell>
                <TableCell className="tex-lg-center font-weight-bold" style={{ fontSize: "200%", fontStyle: "normal", textAlign: "center" }}>
                  {" "}
                  Date of Purchase
                </TableCell>
                <TableCell className="tex-lg-center font-weight-bold" style={{ fontSize: "200%", fontStyle: "normal", textAlign: "center" }}>
                  {" "}
                  Description
                </TableCell>
                <TableCell className="tex-lg-center font-weight-bold" style={{ fontSize: "200%", fontStyle: "normal", textAlign: "center" }}>
                  {" "}
                  Invoice
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allInvoices.map((eachInvoice, index) => {
                console.log("fdsg", eachInvoice);
                //   console.log("29oop", eachInvoice[index].invoice_document.data);
                let invoiceNo = eachInvoice.invoiceNo;
                let date_of_purchase1 = eachInvoice.date_of_purchase;
                let users_user_id = eachInvoice.users_user_id;
                let invoice_Name = `${users_user_id}` + `_` + `${invoiceNo}`;
                let products_summary = eachInvoice.products_summary;
                console.log("fdsxg", invoice_Name);

                return (
                  <TableRow key={invoiceNo}>
                    <TableCell
                      className="tex-lg-center font-weight-light"
                      style={{ fontSize: "200%", fontStyle: "oblique", textAlign: "center", borderRightStyle: "solid", borderRightColor: "#E2DBDB", borderRightWidth: "thin" }}
                    >
                      {invoiceNo}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "200%", fontStyle: "oblique", textAlign: "center", borderRightStyle: "solid", borderRightColor: "#E2DBDB", borderRightWidth: "thin" }}
                    >
                      {date_of_purchase1.split("T", 1)[0]}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "200%", fontStyle: "oblique", textAlign: "center", borderRightStyle: "solid", borderRightColor: "#E2DBDB", borderRightWidth: "thin" }}
                    >
                      {products_summary}
                    </TableCell>
                    <TableCell className="tex-lg-center font-weight-bold" style={{ fontFamily: "Myfont", fontSize: "200%", fontStyle: "oblique", textAlign: "center" }}>
                      <span
                        className="glyphicon glyphicon-cloud-download"
                        role="button"
                        tabIndex="-1"
                        onKeyDown={() => generatePdf(invoice_Name)}
                        onClick={() => generatePdf(invoice_Name)}
                      ></span>

                      {/* <span role="button" tabIndex="-1" onKeyDown={() => generatePdf(allPdf[index], invoiceNo1)} onClick={() => generatePdf(allPdf[index], invoiceNo1)}>
                        invoiceNo:{invoiceNo1}
                      </span> */}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div class="col-md-2 pb-5" style={{ minWidth: "22em", float: "right", paddingRight: "5rem" }}>
        {" "}
        <div class="author-card pb-3">
          <div
            class="author-card-cover"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/umair007/image/upload/v1598715776/ecommerece%20project/dynamic_yoga_mat_grip_5mm_-_grey_domyos_by_decathlon_8500978_1411207_atozth.jpg)",
            }}
          ></div>
          <div class="author-card-profile">
            <div class="avatar">
              <span
                class="avatar-text avatar-text-primary rounded-circle"
                style={{ backgroundColor: "#176BB5", border: "3px solid #191919", borderRadius: "18px", boxShadow: "0 0 2px #888", fontSize: "1.8em" }}
              >
                <span class="initial-wrap">
                  <span>{initails1(userinfo)}</span>
                </span>
              </span>
            </div>

            <div class="author-card-details " style={{ paddingTop: "2em" }}>
              <h5 class="author-card-name text-lg" style={{ fontSize: "142%", width: "2em" }}>
                {userinfo[0].first_name}
                {userinfo[0].last_name}
              </h5>
              <span class="author-card-position">Joined {creatTime.split("T", 1)[0]}</span>
            </div>
          </div>
        </div>
        <div class="wizard">
          <nav class="list-group list-group-flush">
            <div class="list-group-item" href="#" style={{ borderTop: "1px solid rgba(0,0,0,.125)", fontSize: "calc(5px + 0.3vw)", fontWeight: "bold" }}>
              <i class="fe-icon-map-pin text-muted"></i>Account ID: &nbsp;{userinfo[0].user_id}
            </div>{" "}
            <div class="list-group-item" href="#" style={{ borderTop: "1px solid rgba(0,0,0,.125)", fontSize: "calc(5px + 0.3vw)", fontWeight: "bold" }}>
              <i class="fe-icon-map-pin text-muted"></i>Email:&nbsp;{userinfo[0].email}
            </div>
          </nav>
        </div>
      </div>
      {/* <div style={{ float: "right", paddingRight: "5rem" }}>
        <TableContainer
          className="signin-welcome"
          component={Paper}
          style={{ float: "right", top: "0", display: "flex", flexDirection: "column", maxHeight: "9vw", maxWidth: "14vw" }}
        >
          <Table className="basket-summary-inside">
            <TableHead>
              <TableRow>
                <TableCell className="tex-lg-center font-weight-bold" style={{ fontSize: "200%", fontStyle: "normal", textAlign: "Left" }}>
                  Account Details{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <tr>
                <td className="tex-lg-center font-weight-bold" style={{ fontSize: "130%", fontStyle: "normal", textAlign: "Left" }}>
                  Name:{userinfo[0].first_name}{" "}
                </td>
              </tr>
              <tr>
                <td className="tex-lg-center font-weight-bold" style={{ fontSize: "130%", fontStyle: "normal", textAlign: "Left" }}>
                  Account ID:{userinfo[0].user_id}{" "}
                </td>
              </tr>
              <tr>
                <td className="tex-lg-center font-weight-bold" style={{ fontSize: "130%", fontStyle: "normal", textAlign: "Left" }}>
                  email:{userinfo[0].email}{" "}
                </td>
              </tr>
              <tr>
                <td className="tex-lg-center font-weight-bold" style={{ fontSize: "130%", fontStyle: "normal", textAlign: "Left" }}>
                  Member since:{creatTime.split("T", 1)[0]}
                </td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </TableBody>
          </Table>
        </TableContainer>
      </div> */}
    </>
  );
}

export default Useraccount;
