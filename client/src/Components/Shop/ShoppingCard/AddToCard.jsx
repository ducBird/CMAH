import React from "react";
import { useCarts } from "../../../hooks/useCart";
import "./AddToCard.css";

function ButtonAddToCard(props) {
  const { add } = useCarts((state) => state);
  // console.log(props.addToCart);
  return (
    <div
      className={`add-to-card border-2  border-black mt-4 ${
        props.product.product.stock >= 0
          ? `hover:bg-primary transition-all ease-in duration-200`
          : `cursor-not-allowed bg-slate-400/50`
      }`}
    >
      <button
        disabled={props.product.product.stock <= 0 ? true : false}
        className={`p-[9px] text-black  text-sm ${
          props.product.product.stock >= 0
            ? `hover:text-white`
            : `cursor-not-allowed`
        }`}
        onClick={() => {
          add(props.product);
        }}
      >
        {props.product.product.stock <= 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}
      </button>
    </div>
  );
}

export default ButtonAddToCard;
