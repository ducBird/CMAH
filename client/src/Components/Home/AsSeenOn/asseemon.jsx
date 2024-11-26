import React from "react";
import Img from "./imgData";
const asseemon = () => {
  return (
    <div className="w-[80%] mx-auto">
      <div className="border-b border-primary pt-20 mb-10">
        <h2 className="text-3xl text-center font-bold pb-5 text-primary">
          Thương hiệu
        </h2>
      </div>
      <div className="grid grid-cols-4 gap-10 w-[80%] mx-auto">
        {Img.map((item, index) => {
          return (
            <a href="#" key={index}>
              <div>
                <img src={item.img} alt="" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default asseemon;
