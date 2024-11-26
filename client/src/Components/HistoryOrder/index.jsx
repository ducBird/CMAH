import React from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../libraries/axiosClient";
import numeral from "numeral";
import { API_URL } from "../../constants/URLS";
function HistoryOrder() {
  const { id } = useParams();
  const [order, setOrder] = React.useState();
  // get dữ liệu order
  React.useEffect(() => {
    if (id) {
      axiosClient.get("/orders/" + id).then((response) => {
        setOrder(response.data);
      });
    }
  }, [id]);
  // const totalHistoryOrder = order?.reduce((total, item) => {
  //   return (
  //     total +
  //     item.order.orderDetails.product.total * item.order.orderDetails.quantity
  //   );
  // }, 0);
  const renderStatus = (result) => {
    return (
      <div>
        {result && result === "WAITING CONFIRMATION ORDER"
          ? "Đang Chờ Xác Nhận"
          : result === "CONFIRMED ORDER"
          ? "Đã Xác Nhận Đơn Hàng"
          : result === "SHIPPING CONFIRMATION"
          ? "Xác Nhận Vận Chuyển"
          : result === "DELIVERY IN PROGRESS"
          ? "Đang Giao Hàng"
          : result === "DELIVERY SUCCESS"
          ? "Giao Hàng Thành Công"
          : result === "RECEIVED ORDER"
          ? "Đã Nhận Hàng"
          : "Đã Hủy Đơn Hàng"}
      </div>
    );
  };
  return (
    <div className="container">
      <div>
        <span>Chào Anh / Chị</span>
        <span className="ml-4 text-primary font-bold">{order?.fullName}</span>
        <span className="text-primary font-bold"> - {order?.phoneNumber}</span>
      </div>

      <div className="w-[100%] mt-5 flex">
        <div className="flex-none w-[30%]">
          <div className="left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <p className="inline-block ml-2">Danh sách đơn hàng đã mua</p>
          </div>
        </div>
        <div className="flex-1 ml-[30px] border-solid border-2 border-black rounded-md p-3">
          <div className="flex">
            <p className="text-primary font-bold flex-1">
              Chi tiết đơn hàng - {order?._id}
            </p>
            <div className="font-bold">
              Trạng thái:
              <span className="text-primary">
                {" "}
                {renderStatus(order?.status)}
              </span>
            </div>
          </div>
          {order &&
            order.orderDetails.map((orderDetail) => {
              return (
                <div key={orderDetail._id} className="flex mt-3">
                  <div className="flex flex-1">
                    <img
                      className="w-[100px]"
                      src={`${API_URL}${orderDetail.product.imageProduct}`}
                      alt=""
                    />
                    <div>
                      <p key={orderDetail._id} className="mt-auto mb-auto">
                        {orderDetail.product.name}
                      </p>
                      <p>Trọng lượng: {orderDetail.product.dram}</p>
                      <p>Số lượng: {orderDetail.quantity}</p>
                    </div>
                  </div>
                  <div className="price">
                    <p
                      className={
                        orderDetail.product.discount ? "text-red-500" : "hidden"
                      }
                    >
                      Giá giảm:{" "}
                      {numeral(
                        orderDetail.product.discount
                          ? orderDetail.product.total
                          : orderDetail.product.price
                      ).format("0,0")}{" "}
                      đ
                    </p>
                    <p
                      className={
                        orderDetail.product.discount
                          ? "price-old text-black"
                          : "list-none text-black"
                      }
                    >
                      Giá niêm yết:{" "}
                      {numeral(orderDetail.product.price).format("0,0")} đ
                    </p>
                    <p className={"text-primary font-bold"}>
                      Tổng tiền:{" "}
                      {numeral(
                        orderDetail.product.discount
                          ? orderDetail.product.total * orderDetail.quantity
                          : orderDetail.product.price * orderDetail.quantity
                      ).format("0,0")}{" "}
                      đ
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default HistoryOrder;
