import React, { useState, useEffect } from "react";
import logo from "../logo.svg";
import "../App.css";
import ProjectLogo from "../Img/logo.svg";
import HomeDisplay from "./HomeDisplay";
import SwipeableHome from "./SwipeableHome";

import { Button, ButtonGroup, Dropdown, MenuItem, Container } from "react-bootstrap";

function Home({ userData, userstatus, addBasketitems, userDataRefresh }) {
  const [yogaMatState, setYogaMatState] = useState("---Select Yogamats---");
  const [yogaEquipState, setYogaEquipState] = useState("---Select Equipments---");

  const [yogaClothsState, setYogaClothsState] = useState("---Select Cloths---");
  const [accessoriesState, setAccessoriesState] = useState("---Select Accessories---");
  const [showPage, setShowPage] = useState(undefined);

  const [homePage, setHomepage] = useState(undefined);
  useEffect(() => {
    userDataRefresh();
  }, [userstatus]);

  function reset() {
    setYogaMatState("---Select Yogamats---");
    setAccessoriesState("---Select Accessories---");
    setYogaClothsState("---Select Cloths---");
    setYogaEquipState("---Select Equipments---");
  }

  function yogaMatSelected(e) {
    reset();
    setYogaMatState(e.currentTarget.textContent);
    console.log(e.currentTarget.textContent);
    tabsearch(e.currentTarget.textContent);
  }
  function equipmentSelected(e) {
    reset();
    setYogaEquipState(e.currentTarget.textContent);
    tabsearch(e.currentTarget.textContent);
  }
  function accessoriesselected(e) {
    reset();
    setAccessoriesState(e.currentTarget.textContent);
    tabsearch(e.currentTarget.textContent);
  }
  function Clothsselected(e) {
    reset();
    setYogaClothsState(e.currentTarget.textContent);
    tabsearch(e.currentTarget.textContent);
  }

  function tabsearch(selection) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    let datasent1 = { selection: selection };
    let options = {
      method: "POST",
      headers,
      crendtials: "include",
      body: JSON.stringify(datasent1),
    };

    let selection1 = `/#/${selection}`;
    let customerSelection = encodeURIComponent(selection1);

    let url = `/api/x1`;

    let request = new Request(url);

    (async () => {
      let tabsearchback = await fetch(request, options)
        .then((res) => {
          return res.json(res);
        })
        .then((data1) => {
          setHomepage(data1);
          setShowPage(1);
        })
        .catch((err) => {
          setHomepage(undefined);
        }); // if not data comes then it will turn page to default
    })();
  }
  return (
    <React.Fragment>
      <div className="homestyle" style={{}}>
        <h3>
          <hr />
          <ul className="homebarstyle" style={{ textAlign: "center" }}>
            <li>
              {/* <Button variant="primary">Primary</Button> */}
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="lg" style={{ height: "3em", width: "22em" }}>
                  {yogaMatState}
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdownMenuSubItems">
                  <Dropdown.Item href="#/Eco-YogaMats" onClick={yogaMatSelected}>
                    {/* //TODO: we can later take off the href as it doesnt seems to have any effect here */}
                    Eco-YogaMats
                  </Dropdown.Item>
                  <Dropdown.Item href="#/Travel-YogaMats" onClick={yogaMatSelected}>
                    Travel-YogaMats
                  </Dropdown.Item>
                  <Dropdown.Item href="#/YogaMat-Towel" onClick={yogaMatSelected}>
                    YogaMat-Towel
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="lg" style={{ height: "3em", width: "22em" }}>
                  {yogaEquipState}
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdownMenuSubItems">
                  <Dropdown.Item href="#/yoga-Block&Bricks" onClick={equipmentSelected}>
                    Yoga-Block&Bricks
                  </Dropdown.Item>
                  <Dropdown.Item href="#/Yoga-Chairs&Feetup" onClick={equipmentSelected}>
                    Yoga-Chairs&Feetup
                  </Dropdown.Item>
                  <Dropdown.Item href="#/Yoga-Ropes&swing" onClick={equipmentSelected}>
                    Yoga-Ropes&swing
                  </Dropdown.Item>
                  <Dropdown.Item href="#/Yoga-Belts" onClick={equipmentSelected}>
                    Yoga-Belts
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="lg" style={{ height: "3em", width: "22em" }}>
                  {yogaClothsState}
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdownMenuSubItems">
                  <Dropdown.Item href="#/Bottoms" onClick={Clothsselected}>
                    Bottoms
                  </Dropdown.Item>
                  <Dropdown.Item href="#/Tops" onClick={Clothsselected}>
                    Tops
                  </Dropdown.Item>
                  <Dropdown.Item href="#/Socks" onClick={Clothsselected}>
                    Socks
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="lg" style={{ height: "3em", width: "22em" }}>
                  {accessoriesState}
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdownMenuSubItems">
                  <Dropdown.Item href="#/Travelsize-SkinCare" onClick={accessoriesselected}>
                    Travelsize-SkinCare
                  </Dropdown.Item>
                  <Dropdown.Item href="#/Bath&Body" onClick={accessoriesselected}>
                    Bath&Body
                  </Dropdown.Item>
                  <Dropdown.Item href="#/WaterBottles" onClick={accessoriesselected}>
                    WaterBottles
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
          <hr />
        </h3>
      </div>
      <Container style={{ justifyContent: "left", marginBottom: "8em", paddingRight: "7em", maxWidth: "1167px" }}>
        {showPage ? <HomeDisplay props={homePage} addBasketitems={addBasketitems} /> : <SwipeableHome />}
      </Container>
    </React.Fragment>
  );
}

export default Home;
