import React from "react";
import { Link } from "react-router-dom";
import ButtonAddToCard from "../../ShoppingCard/AddToCard";
import numeral from "numeral";
import { API_URL } from "../../../../constants/URLS";
function index(props) {
  const product = props.product;
  return (
    <div>
      <div className="product mb-9 mx-2 border" key={index}>
        <div className="product-image relative">
          <Link to={`/shop/${product.categoryId}/${product._id}`}>
            <img src={`${API_URL}${product.imageProduct}`} alt="" />
            <div className="baner-holder absolute top-0 right-0">
              <div className={!product.discount ? "" : "sale-banner"}>
                {!product.discount ? "" : "Sale"}
              </div>
            </div>
          </Link>
          <div className="thumbnail-overlay">
            <span>
              <div className="info">
                <button type="button" onClick={() => props.openModal(product)}>
                  Xem nhanh
                </button>
              </div>
            </span>
          </div>
        </div>
        <Link
          className="text-center"
          to={`/shop/${product.categoryId}/${product._id}`}
        >
          <div className="content-price">
            <span className="title text-primary text-[18px] font-bold">
              {product.name}
            </span>
            <span className="price block">
              {/* giá khuyến mãi */}
              <span
                className={product.discount ? "text-red-600 pr-3" : "hidden"}
              >
                {numeral(product.total).format("0,0")}
              </span>
              {/* giá gốc */}
              <span className={product.discount ? "price-old" : "list-none"}>
                {numeral(product.price).format("0,0")}
              </span>
            </span>
          </div>
        </Link>
        <div className="w-[100%]">
          <ButtonAddToCard product={{ product: product, quantity: 1 }} />
        </div>
      </div>
    </div>
  );
}

export default index;
