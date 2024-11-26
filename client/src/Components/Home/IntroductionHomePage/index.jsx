import React from "react";
import FeaturedProducts from "./FeaturedProductsHomePage/FeaturedProducts";
import Slider from "./Slider/Slider";
import Works from "./works/Works";
function IntroductionHomePage() {
  return (
    <div className="introduction-home-page">
      {/* IntroductionHomePage */}
      <Slider />
      <Works />
      <FeaturedProducts />
    </div>
  );
}

export default IntroductionHomePage;
