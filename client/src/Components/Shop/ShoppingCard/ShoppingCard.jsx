import React from "react";
import { useCarts } from "../../../hooks/useCart";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import numeral from "numeral";
import { API_URL } from "../../../constants/URLS";
function ShoppingCard() {
  const { items, increase, decrease, remove } = useCarts((state) => state);
  const btnRef = React.useRef(null);
  const totalCart = items.reduce((total, item) => {
    return total + item.product.total * item.quantity;
  }, 0);

  // xử lý button Thanh toán
  React.useEffect(() => {
    const btn = btnRef.current;
    if (items.length === 0) {
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  }, [items]);
  return (
    <div className="shopCart">
      <div className="container">
        <div className="text-3xl text-primary">Shopping Cart</div>
        <hr className="mt-[20px]" />
        <div className="items flex">
          <div className="baner-holder w-[50px]"></div>
          <div className="w-[70%] ">
            {items &&
              items.map((productItemCart) => {
                return (
                  <div
                    className="flex mt-[20px] p-[20px] border border-black rounded-md"
                    key={productItemCart.product._id}
                  >
                    <div className="baner-holder w-[50px]">
                      <div
                        className={
                          !productItemCart.product.discount ? "" : "sale-banner"
                        }
                      >
                        {!productItemCart.product.discount ? "" : "Sale"}
                      </div>
                    </div>
                    <div>
                      <img
                        className="w-[300px] h-[300px]"
                        src={`${API_URL}${productItemCart.product.imageProduct}`}
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-primary text-2xl font-bold">
                        {productItemCart.product.name}
                      </p>
                      <div className="price block mt-[20px]">
                        {/* giá gốc */}
                        <span className="text-primary mr-4">Giá niêm yết:</span>
                        <span
                          className={
                            productItemCart.product.discount
                              ? "price-old text-black"
                              : "list-none text-black"
                          }
                        >
                          {numeral(productItemCart.product.price).format("0,0")}{" "}
                          đ
                        </span>
                        {/* giá khuyễn mãi */}
                        <br />
                        <span
                          className={
                            productItemCart.product.discount
                              ? "text-primary mr-4"
                              : "hidden"
                          }
                        >
                          Giá khuyến mãi:
                        </span>
                        <span
                          className={
                            productItemCart.product.discount
                              ? "text-red-600 pr-3"
                              : "hidden"
                          }
                        >
                          {numeral(productItemCart.product.total).format(
                            "0,0 "
                          )}{" "}
                          đ
                        </span>
                      </div>
                      <div className="purchase-details_quantity inline-block mr-[20px]">
                        <p className="mb-4">Số lượng</p>

                        <span className="product-minus border-solid border-2 border-black p-2">
                          <button
                            onClick={() => {
                              decrease(productItemCart.product._id);
                            }}
                          >
                            <MinusOutlined />
                          </button>
                        </span>
                        <div className="inline-block w-[70px] border border-solid border-black p-[7.5px] ">
                          <span>{productItemCart.quantity}</span>
                        </div>
                        <span className="product-minus border-solid border-2 border-black p-2">
                          <button
                            onClick={() => {
                              increase(productItemCart.product._id);
                            }}
                          >
                            <PlusOutlined />
                          </button>
                        </span>
                        <span>
                          <button
                            className="ml-[20px]"
                            onClick={() => {
                              remove(productItemCart.product._id);
                            }}
                          >
                            Remove
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="border border-black w-[30%] mt-[20px] ml-[20px] rounded-md">
            <div className="m-[20px]">
              <div>
                <span className="text-2xl text-primary font-bold">
                  Tổng tiền:{" "}
                </span>
                <p className="text-right mr-[20px] w-[100%] inline text-2xl text-black font-bold">
                  {numeral(totalCart).format("0,0 ")} đ
                </p>
              </div>
              <div className="mt-[20px]">
                <p className="text-2xl text-primary">Ghi Chú: </p>
                <textarea
                  className="border border-black rounded-md mt-[10px]"
                  cols="43"
                  rows="5"
                ></textarea>
              </div>
              <div className="text-center mt-[20px]">
                <Link to="/shop/order">
                  <button
                    className="border p-[10px] bg-primary text-white w-[150px] rounded-md"
                    ref={btnRef}
                  >
                    Thanh toán
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCard;
