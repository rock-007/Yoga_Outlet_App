import React, { useState, useEffect } from "react";
import logo from "../logo.svg";
import "../App.css";
import { Button, ButtonGroup, ToggleButtonGroup, ToggleButton, Dropdown, MenuItem, Container } from "react-bootstrap";
import { makeStyle, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from "@material-ui/core";

function Basket({ basketItems, updatedBasket, resetBasket }) {
  let [totalPrice, setTotalPrice] = useState(0);

  console.log(basketItems);
  const increaseQuantity = (eachproduct) => {
    if (eachproduct.stockQuantity > eachproduct.quantity + 1) {
       let newProductQty = eachproduct;
      newProductQty.quantity = +eachproduct.quantity + 1;
       updatedBasket(newProductQty);
    }
    //else we can throw error that not enough porducts in stock
  };
  const decreseQuantity = (eachproduct) => {
    if (eachproduct.stockQuantity > eachproduct.quantity + 1) {
      
      let newProductQty = eachproduct;
      newProductQty.quantity = +eachproduct.quantity - 1;
       updatedBasket(newProductQty);
    }
     
  };

  const buyNow = (basketItems) => {
    

    resetBasket(basketItems);
    window.location.href = "https://yogaoutlet.herokuapp.com/signin";
  };

  useEffect(() => {
    if (basketItems) {
      let total = 0;
      for (let i = 0; i < basketItems.length; i++) {
        let eachItemTotalPrice = basketItems[i].price * basketItems[i].quantity;
        total = eachItemTotalPrice + total;
      }
      console.log("47bask", total);

      setTotalPrice(total);
    }
  });

  console.log("53bask", totalPrice);

  return (
    <>
      <div style={{ width: "25rem", float: "right", paddingRight: "6.5rem" }}>
        <TableContainer
          className="basket-summary"
          component={Paper}
          style={{ float: "right", top: "0", display: "flex", flexDirection: "column", maxHeight: "9vw", maxWidth: "14vw" }}
        >
          <Table className="basket-summary-inside">
            <TableHead>
              <TableRow>
                <TableCell className="font-weight-bold" style={{ fontSize: "200%", fontStyle: "normal", textAlign: "center" }}>
                  Total Price{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <tr>
                <td
                  className="tex-lg-center font-weight-bold"
                  style={{ paddingTop: "20%", textAlign: "center", alignItems: "center", justifyContent: "center", fontSize: "200%", fontStyle: "italic" }}
                >
                  {totalPrice}£
                </td>
              </tr>

              <tr>
                <td></td>
              </tr>
            </TableBody>
          </Table>
        </TableContainer>
        {/* <ButtonGroup aria-label="quantityofproduct"> */}

        <ButtonGroup>
          <Button
            className=" buttonBlock"
            variant="primary"
            style={{ width: "18.5rem", position: "relative", float: "right" }}
            name="subtract"
            value="subtract"
            onClick={() => buyNow(basketItems)}
          >
            Buy Now
          </Button>
        </ButtonGroup>
      </div>
      <div className="BasketSigninProducts" style={{ float: "left" }}>
        <TableContainer className="BasketSigninItems" component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> </TableCell>
                <TableCell className="tex-lg-center font-weight-bold" style={{ fontSize: "200%", fontStyle: "normal", textAlign: "center" }}>
                  Product Name{" "}
                </TableCell>
                <TableCell className="font-weight-bold" style={{ fontSize: "200%", fontStyle: "normal", textAlign: "center" }}>
                  {" "}
                  Item No.
                </TableCell>
                <TableCell className="font-weight-bold" style={{ fontSize: "200%", fontStyle: "normal", textAlign: "center", textAlign: "center" }}>
                  {" "}
                  Quantitiy
                </TableCell>
                <TableCell className="font-weight-bold" style={{ textAlign: "center", fontSize: "200%", fontStyle: "normal" }}>
                  {" "}
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {basketItems.map((eachproduct) => {
                let productName = eachproduct.product_name;
                let producNumber = eachproduct.producNumber;
                let price = eachproduct.price;
                let desc = eachproduct.productDescription;
                let photo = eachproduct.image_URL;
                let stockQuantity = eachproduct.stockQuantity;
                let boughtQuantitiy = eachproduct.quantity;
                return (
                  <TableRow key={producNumber}>
                    <TableCell>
                      <img className="BasketProducts-image" src={photo} />
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "150%", fontStyle: "italic", fontWeight: "550", borderRightStyle: "solid", borderRightColor: "#E2DBDB", borderRightWidth: "thin" }}
                    >
                      {productName}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        fontSize: "150%",
                        fontStyle: "italic",
                        fontWeight: "550",
                        borderRightStyle: "solid",
                        borderRightColor: "#E2DBDB",
                        borderRightWidth: "thin",
                      }}
                    >
                      {/* Item No:{producNumber} (InStock:{stockQuantity}) */}
                      {producNumber}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "150%", fontStyle: "italic", fontWeight: "550", borderRightStyle: "solid", borderRightColor: "#E2DBDB", borderRightWidth: "thin" }}
                    >
                      <ul style={{ alignItems: "center", padding: "5%", marginTop: "30%", listStyleType: "none", float: "bottom", display: "flex", flexDirection: "column" }}>
                        <li style={{ maxWidth: "10rem", borderBottom: "none" }}>
                          <span>{boughtQuantitiy} </span>
                        </li>
                        <li style={{ paddingTop: "15%", maxWidth: "10rem", borderBottom: "none" }}>
                          <ButtonGroup aria-label="quantityofproduct">
                            <Button variant="secondary" name="subtract" value="subtract" onClick={() => decreseQuantity(eachproduct)}>
                              -
                            </Button>
                            {/* <Button name={productName} variant="secondary">
                              {eachproduct.quantity}
                            </Button> */}
                            <Button variant="secondary" name="add" value="add" onClick={() => increaseQuantity(eachproduct)}>
                              +
                            </Button>
                          </ButtonGroup>
                        </li>
                      </ul>
                    </TableCell>
                    <TableCell style={{ textAlign: "center", fontSize: "150%", fontStyle: "italic", fontWeight: "550" }}>£{boughtQuantitiy * price}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Basket;

// {
//   basketItems.map((eachproduct) => {
//     let productName = eachproduct.product_name;
//     let producNumber = eachproduct.producNumber;
//     let price = eachproduct.price;
//     let desc = eachproduct.productDescription;
//     let photo = eachproduct.image_URL;
//     let stockQuantity = eachproduct.stockQuantity;
//     return (
//       <div className="" key={producNumber}>
//         <ul>
//           <li>
//             <img className="BasketProducts-image" src={photo} />
//           </li>
//           <li>{productName} </li>
//           <li>
//             Item No:{producNumber}(InStock:{stockQuantity})
//           </li>
//           <li>price:{price}£ </li>

//           <li>
//  <ButtonGroup aria-label="quantityofproduct">
// {/* //   <Button variant="secondary" name="subtract" value="subtract" onClick={() => decreseQuantity(eachproduct)}>
// //     -
// //   </Button> */}
// //   <Button name={productName} variant="secondary">
// //     {eachproduct.quantity}
// //   </Button>
// //   <Button variant="secondary" name="add" value="add" onClick={() => increaseQuantity(eachproduct)}>
// //     +
// //   </Button>
// // </ButtonGroup>
//             &nbsp;
//             {/* will get the value and object passed as on click for all the info of the selectede item */}
//             {/* <Button
//             name={producNumber}
//             variant="primary"
//             // onClick={() => {
//             //   addBasketitems(eachproduct, quantities[productName]);
//             //   alert(`The item:${productName}, with added quantitiy:${quantities[productName]} is added to the basket`);
//             //   resetcounter(productName);
//             // }}
//           >
//             Add to Basket
//           </Button> */}
//           </li>
//         </ul>
//       </div>
//     );
//   });
// }
