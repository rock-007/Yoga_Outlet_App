// #rfcp short for function componnet

import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Nav from "./Nav";
import Basket from "./Component/Basket";
import Signin from "./Component/Signin";
import Home from "./Component/Home";
import history from "./History";

import Footer from "./Component/Footer";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const userAccountData = () => {
  // user info can be loaded after refresh
  return JSON.parse(window.localStorage.getItem("user-data"));
};
const isLoggedIn = () => {
  return !!window.localStorage.getItem("user-status"); // !! : cast to boolean
};
let initialvalue = () => {
  let y1 = JSON.parse(window.localStorage.getItem("user-basket") || "[]");

  return y1;
};
let finalbuyitems = () => {
  // console.log(window.localStorage.getItem("user-final"));
  let z1 = JSON.parse(window.localStorage.getItem("user-final") || "[]");
  return z1;
};
let buyNowTrue1 = () => {
  let z1 = !!JSON.parse(window.localStorage.getItem("buyNowFinal") || "0");
  return z1;
};

function App() {
  const [siginalready, setifsignedin] = useState(isLoggedIn());
  const [userData, setUserData] = useState(userAccountData());
  const [basketItems, setBasketItems] = useState(initialvalue()); // this will come from two level down child the items

  const [finalBuy, setfinalBuy] = useState(finalbuyitems());
  const [buyNow, setbuyNow] = useState(buyNowTrue1());

  const resetBuynow = (latestState) => {
    setbuyNow(latestState);
    window.localStorage.setItem("buyNowFinal", JSON.stringify(latestState));
  };

  const resetBasket = (basketItems) => {
    // console.log("basket556", basketItems);
    //setfinalBuy will set to some value and if (finalBuy != null && buyNow === true) is true then it will call the API call
    setfinalBuy(basketItems);
    window.localStorage.setItem("user-final", JSON.stringify(basketItems));

    setBasketItems([]);
    window.localStorage.setItem("user-basket", JSON.stringify([]));
    setbuyNow(true);
    window.localStorage.setItem("buyNowFinal", JSON.stringify(true));
  };

  const updatedBasket = (newProductQty) => {
    setBasketItems((prevItems) => {
      let updatedQuantityArray = [];
      for (let z = 0; z < basketItems.length; z++) {
        // console.log(basketItems[z].producNumber);
        // console.log(newProductQty.producNumber);
        if (newProductQty.producNumber !== basketItems[z].producNumber) {
          // console.log(newProductQty.producNumber);
          // console.log(basketItems[z].producNumber);
          updatedQuantityArray.push(basketItems[z]);
        } else {
          if (newProductQty.quantity == 0) {
          } else {
            updatedQuantityArray.push(newProductQty);
          }
        }
      }
      window.localStorage.setItem("user-basket", JSON.stringify(updatedQuantityArray));
      return updatedQuantityArray;
    });
  };

  // product here is object and quantity is number and both coming from child componenet
  const addBasketitems = (product, quantity) => {
    setBasketItems((prevItems) => {
      let newItemsArray = [];
      let changeHappen = 0;

      if (basketItems.length < 1) {
        const newItems = [...prevItems, { ...product, quantity }];
        window.localStorage.setItem("user-basket", JSON.stringify(newItems));
        return newItems;
      } else {
        const compareItem = [{ ...product, quantity }];
        for (let i = 0; i < basketItems.length; i++) {
          if (compareItem[0].producNumber !== basketItems[i].producNumber) {
            newItemsArray.push(basketItems[i]);
          } else {
            newItemsArray.unshift(basketItems[i]);
            newItemsArray[0].quantity = +basketItems[i].quantity + quantity;
            changeHappen = 1;
          }
        }
        if (changeHappen == 0) {
          newItemsArray = [...newItemsArray, { ...product, quantity }];
        }

        console.log(newItemsArray);
        window.localStorage.setItem("user-basket", JSON.stringify(newItemsArray));
        return newItemsArray;
      }
    });
  };

  let url = "https://yogaoutlet.herokuapp.com/api/verifyifloginalready";

  let options = {
    credentials: "include",
    method: "POST",
  };

  let verifyifloginalready = new Request(url, options);

  useEffect(() => {
    credentailverify();
  }, []);

  const userDataRefresh = () => {
    credentailverify();
  };

  function credentailverify() {
    (async () => {
      const x1 = await fetch(verifyifloginalready)
        .then((res) => {
          if (res.status == 400 || res.status == 401) {
            window.localStorage.removeItem("user-data");

            return setifsignedin(false);
          } else if (siginalready == false) {
            setifsignedin(true);
            window.localStorage.setItem("user-status", true);
            return res.json();
          } else {
            return res.json();
          }
        })
        .then((data) => {
          let arrayData = [...data];
          setUserData(() => arrayData);

          window.localStorage.setItem("user-data", JSON.stringify(arrayData)); // if i dont JSON.stringify then it will appear as [object object]
        })
        .catch((err) => console.log("ddf", err));

      return x1;
    })();
  }
  return (
    <Router history={history}>
      <div className="App">
        <header className="header">
          <Nav basketItems={basketItems} userinfo={userData} userstatus={siginalready} />
        </header>

        <div className="main">
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => <Home {...props} userData={userData} userstatus={siginalready} addBasketitems={addBasketitems} userDataRefresh={userDataRefresh} />}
            />
            // render here work for passing the ste into the child component // from router {/* render={props=>(<newComponent}/> )} */}
            <Route
              path="/basket"
              exact
              render={(props) => (
                <Basket {...props} userData={userData} userstatus={siginalready} basketItems={basketItems} updatedBasket={updatedBasket} resetBasket={resetBasket} />
              )}
            />
            <Route
              path="/signin"
              exact
              render={(props) => <Signin {...props} buyNow={buyNow} resetBuynow={resetBuynow} userData={userData} finalBuy={finalBuy} userstatus={siginalready} />}
            />
          </Switch>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
