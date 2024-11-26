/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./FeatureProduct.css";
import FeaturedProductSlider from "./FeaturedProductSlider";
function FeaturedProducts() {
  return (
    <div className="collection-section mt-[-4rem]">
      <div className="container w-[80%] mx-auto">
        <div className="featured-product border-b border-primary">
          <h2>Ưu đãi hấp dẫn - Khuyến mãi</h2>
        </div>
      </div>
      <FeaturedProductSlider />
    </div>
  );
}

export default FeaturedProducts;
