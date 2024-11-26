/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
import WorkData from "../works/WorkData";
import "./Work.css";
function Works() {
  return (
    <div className="work-section w-[100%] mx-auto">
      <div className="container">
        <p className="work-activities border-b border-primary">
          Cách thức hoạt động
        </p>
        <div className="list-work relative">
          <div className="work-item grid grid-cols-3 my-8">
            {WorkData.map((value, index) => {
              return (
                <div className="one-third h-[300px] mx-2" key={index}>
                  <div className="text-center">
                    <div className="image-element__wrap py-2">
                      <img className="mx-auto" src={value.imageWork} alt="" />
                    </div>
                    <h3 className="regular_text">{value.title}</h3>
                    <div className="rte-setting text-black text-left">
                      <p>{value.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Works;
