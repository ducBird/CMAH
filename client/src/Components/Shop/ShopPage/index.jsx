/* eslint-disable jsx-a11y/anchor-is-valid */
import { API_URL } from "../../../constants/URLS";
import React from "react";
import { Link } from "react-router-dom";
import { axiosClient } from "../../../libraries/axiosClient";
function ShopPage() {
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    axiosClient.get("/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);
  return (
    <div className="shop-page">
      <div className="container">
        <div className=" text-primary text-xs breadcrumb-collection">
          <span>
            <a href="/">Trang chủ</a>
          </span>
          <span className="mx-2">/</span>
          <span>
            <a href="/shop">Sản phẩm</a>
          </span>
          <span className="mx-2">/</span>
          <span className="text-black">Trang 1 của 1</span>
          <p className="border-b border-primary my-5"></p>
        </div>
        <div className="list-collection-wrapper">
          <div className="grid grid-cols-3">
            {categories.map((category, index) => {
              return (
                <div className="one-third mx-2 my-3" key={index}>
                  <Link to={`/shop/${category._id}`}>
                    <div className="one-third-image">
                      <img src={`${API_URL}${category.imageURL}`} alt="" />
                    </div>
                    <div className="one-third-title">
                      <p className="text-primary text-center font-bold mt-3">
                        {category.name}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
