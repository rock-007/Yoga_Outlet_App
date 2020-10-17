import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
// https://react-swipeable-views.com/demos/demos/ ....multiple ways to use slides
function SwipeableHome() {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const styles = {
    slide: {
      padding: 15,
      minHeight: 100,
      color: "#fff",
    },
    slide1: {
      background: "none",
    },
    slide2: {
      background: "none",
    },
    slide3: {
      background: "none",
    },
  };
  return (
    <>
      <div style={{ paddingLeft: "7em", paddingTop: "7em", maxHeight: "73em", textAlign: "center" }}>
        <AutoPlaySwipeableViews>
          <div style={Object.assign({}, styles.slide, styles.slide1)} style={{ padding: "0" }}>
            <img
<<<<<<< HEAD
              src="https://res.cloudinary.com/umair007/image/upload/v1598520396/ecommerece%20project/Slids/slide3_nfu8hl_b3bebs.webp"
=======
              src="https://res.cloudinary.com/umair007/image/upload/v1598627966/ecommerece%20project/Slids/slide3_tmgcdo.webp"
>>>>>>> 3aa2f162263d58ca7555717fe695fdd043964746
              style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}
            />
          </div>
          <div style={Object.assign({}, styles.slide, styles.slide2)} style={{ padding: "0" }}>
            <img
<<<<<<< HEAD
              src="https://res.cloudinary.com/umair007/image/upload/v1598520396/ecommerece%20project/Slids/slid1_n8tth1_1_cihe87.webp"
              style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}
            />
          </div>
          <div style={Object.assign({}, styles.slide, styles.slide3)} style={{ padding: "0" }}>
            <img
              src="https://res.cloudinary.com/umair007/image/upload/v1598520396/ecommerece%20project/Slids/slid1_n8tth1_1_cihe87.webp"
              style={{ maxWidth: "100vh", maxHeight: "100vh", margin: "auto" }}
            />
          </div>
=======
              src="https://res.cloudinary.com/umair007/image/upload/v1598627663/ecommerece%20project/Slids/slid1_ek0hs5.webp"
              style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}
            />
          </div>
          <div style={Object.assign({}, styles.slide, styles.slide1)} style={{ padding: "0" }}>
            <img
              src=" https://res.cloudinary.com/umair007/image/upload/v1598778952/ecommerece%20project/yoga-blocks-bricks-800x480_zszubo.webp"
              style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}
            />
          </div>
          {/* <div style={Object.assign({}, styles.slide, styles.slide3)} style={{ padding: "0" }}>
            <img
              src="https://res.cloudinary.com/umair007/image/upload/v1598627010/ecommerece%20project/Slids/10367226295e58a38d32556350993054_3_rmf6te.webp"
              style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}
            />
          </div> */}
>>>>>>> 3aa2f162263d58ca7555717fe695fdd043964746
        </AutoPlaySwipeableViews>
      </div>
    </>
  );
}

export default SwipeableHome;
