/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./ShopSideBar.css";
import { Link, useParams } from "react-router-dom";
import { axiosClient } from "../../../../libraries/axiosClient";
import { API_URL } from "../../../../constants/URLS";
function ShopSideBar() {
  const { categoryId } = useParams();
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    axiosClient.get("/categories").then((response) => {
      setCategories(response.data);
    });
    // axiosClient.get("/categories/" + categoryId).then((response) => {
    //   setCategory(response.data);
    // });
  }, []);
  return (
    <div className="side-bar mr-[20px]">
      <div className="side-bar-block pr-[40px] border-r border-primary">
        <h4 className="toggle text-primary text-[20px] font-bold">
          Sản phẩm của chúng tôi
        </h4>
        <ul className="toggle_list">
          {categories.map((category, index) => {
            return (
              <li className="h-[30px]" key={index}>
                <Link to={`/shop/${category._id}`}>
                  <div
                    className={`flex ${
                      categoryId === category._id ? "bg-slate-400" : ""
                    } `}
                  >
                    <img
                      className="w-[20px] mr-[10px]"
                      src={`${API_URL}${category.imageURL}`}
                      alt=""
                    />
                    <p>{category.name}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ShopSideBar;
