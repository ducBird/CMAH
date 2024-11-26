import numeral from "numeral";
import React from "react";

function PopupModalContent(props) {
  return (
    <div>
      <span className="text-primary font-bold">{props.body.name}</span>
      <img
        className="w-[340px] m-auto mb-[15px]"
        src={props.body.imageProduct}
        alt=""
      />
      <span className="price__product-modal ">
        {/* giá gốc */}
        <span className="block original-price">
          <span className="text-primary mr-2">Giá gốc: </span>
          <span
            className={
              props.body.discount
                ? "price-old text-black"
                : "list-none text-black"
            }
          >
            {numeral(props.body.price).format("0,0")}
          </span>
        </span>
        <span className="block promotional-price">
          <span className="text-primary mr-2">Giá khuyến mãi: </span>
          {/* giá khuyến mãi */}
          <span
            className={props.body.discount ? "text-red-600 pr-3" : "hidden"}
          >
            {numeral(props.body.total).format("0,0")}
          </span>
        </span>
      </span>
      <span className="status__product-modal">
        <span className="text-primary">Tình trạng: </span>
        <span className="text-red-500">
          {props.body.stock === 0 ? "Hết hàng" : "Còn hàng"}
        </span>
      </span>
      <span className="description__product-modal block">
        <span className=" text-primary">Mô tả sản phẩm: </span>
        <span className="text-black">{props.body.description}</span>
      </span>
    </div>
  );
}

export default PopupModalContent;
