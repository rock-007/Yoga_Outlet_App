// bring in express
const express = require("express");
const mysqlx = require("mysql");
const jwt = require("jsonwebtoken");
const auth = require("./verifyTokenExisting");
const authNew = require("./verifyTokenNew");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const pdf = require("html-pdf");
const pdfTemplate = require("./documents/pdfTemplate");
const fs = require("fs");
const { isContext } = require("vm");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true, // for cookies
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

let connection = mysqlx.createConnection({
  host: "database-1.cjnxyreiymo1.eu-west-2.rds.amazonaws.com",
  user: "root",
  password: "Skyliner007!",
  database: "join_us",
  insecureAuth: true,
});

////!  LOGIN & LOGOUT
exports.handler = (event, contect, callback) => {
  Context.callbackWaitsForEmptyEventLoop = false;
  //app.post("/api/newuser", (req, res) => {
  let x1 = event.body;
  console.log("144", x1);

  if (event.body.logout === false) {
    connection.query("SELECT * FROM  users WHERE email=?;", [x1.email], function (err, results) {
      console.log(results);
      console.log("150new", results[0].email);
      console.log("151", results[0].email);
      if (err) console.log("13333", err);
      else {
        if (results[0].email && results[0].password) {
          //  console.log("79", results[0].email);

          //below if the user and paswword is correct == to do user is not already logedin
          //TODO chage the default userloginStatus to false rather null & on logout change to flase flag

          if ((results[0].password == x1.password && results[0].userloginStatus == true) || (results[0].password == x1.password && results[0].userloginStatus == null)) {
            //TODO: send user account details it like update the basket and user purchaee history
            const payload = { email: results[0].email };
            console.log("payloods", payload);
            //res.header("auth-token", token).send(token);
            const token = jwt.sign(payload, "lllfasdgfdadsfasdfdasfcadsf");
            //below are the cookies sent to user first time when he logsin
            callback(
              null,
              cookie("yogaoutlet_access_token", token, {
                maxAge: 25 * 24 * 60 * 60 * 1000,
                httpOnly: true, // it will enable on frotend-javascript to not have access to cokkies
                // secure:true ................. when in production
              })
            );

            // update the userloginStatus to true for this user
            connection.query(
              "UPDATE  users SET userloginStatus=? WHERE email=?",
              // hardcoding userloginStatus=1 to show the use is loggedin
              ["1", results[0].email],
              function (err, results) {
                if (err) callback(err);
                console.log("233er", results);
              }
            );
          } else {
            let x;
            callback(
              null,
              x.json({
                data: "invalid  password",
              })
            );
          }
        } else callback(null, redirect("http://localhost:3000/about"));
      }
    });
  } else {
    const payload = { email: event.body.email };
    console.log("339x", payload);
    const token = jwt.sign(payload, "lllfasdgfdadsfasdfdasfcadsf");

    callback(null, clearCookie("yogaoutlet_access_token"));
  }
  //});
};
