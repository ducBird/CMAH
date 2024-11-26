import React, { Component } from "react";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function SimpleSlider() {
  const data = [
    {
      icons: "⭐⭐⭐⭐⭐",
      review: "View more review",
    },
    {
      icons: "⭐⭐⭐⭐⭐",
      review: "View more ",
    },
    {
      icons: "⭐⭐⭐⭐⭐",
      review: "View more review",
    },
  ];

  var settings = {
    dots: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="btn__nextprev w-[80%] mx-auto mt-20">
      <h1 className="text-center pb-5 text-3xl">Testimonials</h1>
      <div className="border-b border-primary mb-10 "></div>
      <Slider {...settings}>
        {data.map((item, index) => {
          return (
            <div key={index} className="w-full text-center">
              <p className="text-3xl mb-12">{item.icons}</p>
              <p className="text-2xl text-primary">{item.review}</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
