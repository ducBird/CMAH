import React from "react";
import Data from "./Data";
import { Link } from "react-router-dom";
import "./data.css";
import { axiosClient } from "../../../libraries/axiosClient";
import { API_URL } from "../../../constants/URLS";
const List = () => {
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    axiosClient.get("/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);
  return (
    <div className="w-[80%] mx-auto">
      <div className="border-b border-primary pt-20 mb-10">
        <h2 className="text-3xl text-center font-bold pb-5 text-primary">
          Theo thể loại cửa hàng
        </h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-5">
        {categories.map((category, index) => {
          return (
            <div key={index} className="btn__hover relative ">
              <Link to={`/shop/${category._id}`}>
                <div className="btn__radius h-80 overflow-hidden rounded-md">
                  <img
                    src={`${API_URL}${category.imageURL}`}
                    alt=""
                    className="btn__product h-full w-full cursor-pointer object-cover"
                  />
                </div>
              </Link>
              <p className="text-center text-xl text-primary font-bold m-4">
                {category.name}
              </p>
              {/* <div className=""> */}
              <button className="btn__images m-auto w-[100px] border border-white border-spacing-[10px] p-[5px] text-white text-center hover:text-white hover:bg-primary absolute top-[35%] left-[35%] transition">
                <div className="font-bold">Cửa hàng</div>
              </button>
              {/* </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
