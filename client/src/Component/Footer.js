import React, { useState } from "react";
import "../App.css";
// import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";

function Footer() {
  const [name, setnewName] = useState(null);
  const updatesignupEmail = (e) => {
    setnewName(e.currentTarget.value);
  };

  let signupEmail = (e) => {
    e.preventDefault();
    e.currentTarget.emailForSignupOnly.value = "";

    let headers = new Headers();

    const options = {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(name),
    };
    (async () => {
      let newRequest = new Request("https://yogaoutlet.herokuapp.com/api/newsignupemail", options);

      let signupNewEmail = await fetch(newRequest)
        .then((res) => {
          console.log(res);
          //  console.log(res.result);

          return res.json();
        })
        .then((data) => {
          console.log("email has been sent to server for further process", data);
        });
    })();
  };

  return (
    <div className="footer" style={{ msOverflowY: "hidden" }}>
      <div className="container" style={{ height: "13rem", width: "100vh", minMarginLeft: "0.1%", paddingTop: "1%" }}>
        <div className="row" style={{ display: "inlineFlex", marginTop: "0.5em", width: "100%" }}>
          {/* colum 1 */}
          <div className="col" style={{ maxWidth: "16rem" }}>
            <h4> Yogaoutlet Ltd</h4>
            <ul className="list-unstyled">
              <li>(+44) 123-123-1234</li>
              <li> 123 street London road</li>
              <li>London, UK</li>
            </ul>
          </div>

          {/* colum 2 */}

          <div className="col" style={{ maxWidth: "25rem" }}>
            <h4> ABOUT US</h4>
            <ul className="list-unstyled">
              <li> Terms of Use</li>
              <li>Privacy Policy</li>
              <li>Accessibility Statement</li>
            </ul>
          </div>
          {/* colum 3 */}
          <div></div>

          <div className="col" style={{ maxWidth: "45rem", maxMarginLeft: "20%" }}>
            <h4> SIGN UP FOR EMAIL</h4>
            <ul className="list-unstyled">
              <li>For yoga updates, offers, news and promotions</li>
              <li>
                {
                  <form style={{ postion: "block" }} onSubmit={signupEmail} className="input-group">
                    <input
                      type="text"
                      placeholder="Enter here your email"
                      id="forSignupemail"
                      class="form-control inputBlock"
                      name="emailForSignupOnly"
                      value={name}
                      onChange={updatesignupEmail}
                      style={{ maxWidth: "19rem" }}
                    />
                    <ButtonGroup>
                      <Button className="btn buttonBlock" variant="primary" type="submit">
                        SIGNUP
                      </Button>
                    </ButtonGroup>
                  </form>
                }
              </li>
            </ul>
          </div>
        </div>

        <hr style={{ padding: "0", margin: "0" }} />
        <div className="row" style={{ height: "2rem", marginTop: "0" }}>
          <p className="col-sm">@copy;{new Date().getFullYear()} Yogaoutlet Ltd | ALL right reserved | Terms of Service | Privacy</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
