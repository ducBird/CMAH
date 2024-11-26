/* eslint-disable array-callback-return */
import React from "react";
import { Link, useParams } from "react-router-dom";
import { BsFillCaretDownFill } from "react-icons/bs";
import "./navbar.css";
import { axiosClient } from "../../../libraries/axiosClient";
function Navbar() {
  const { categoryId } = useParams();
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    axiosClient.get("/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);
  return (
    <>
      <nav className="text-white rounded bg-primary">
        <ul className="flex justify-between w-[70%] mx-auto font-bold">
          <li className="li-nav">
            <Link to={"/"}>
              {/* Home */}
              Trang Chủ
            </Link>
          </li>
          <li className="relative li-nav li-nav-shop">
            <Link to={"/shop"}>
              {/* Shop */}
              Sản Phẩm
            </Link>
            <BsFillCaretDownFill />
            <ul className="sub-nav-shop">
              <li key="hotdeal">
                <Link to={"/shop/hotdeal"}>
                  <p>Khuyến mãi</p>
                </Link>
              </li>
              {categories.map((category, index) => {
                return (
                  <li key={index}>
                    <Link to={`/shop/${category._id}`}>
                      <p>{category.name}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li className="li-nav">
            <Link to={"/aboutUs"}>
              {/* About Us */}
              Về Chúng Tôi
            </Link>
          </li>
          <li className="relative li-nav li-nav-shop">
            <Link to={"/community"}>
              {/* Community */}
              Cộng Đồng
            </Link>
            <BsFillCaretDownFill />
            <ul className="sub-nav-shop">
              <li>
                <Link to={"/community/recipes"}>Recipes</Link>
              </li>
              <li>
                <Link to={"/community/vegetarian"}>Vegetarian Community</Link>
              </li>
            </ul>
          </li>
          <li className="li-nav">
            <Link to={"/contactUs"}>
              {/* Contact Us */}
              Liên Hệ
            </Link>
          </li>
          <li className="li-nav">
            <Link to={"/history-orders"}>
              {/* Check order */}
              Lịch sử đơn hàng
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
