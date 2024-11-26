import React from "react";
import { Form, Input, Button } from "antd";
import { axiosClient } from "../../../libraries/axiosClient";
import { Link } from "react-router-dom";
import numeral from "numeral";
import moment from "moment";
import "./CheckOrder.css";
import { API_URL } from "../../../constants/URLS";
function CheckOrder() {
  // const { categoryId } = useParams();
  // const { id } = useParams();
  const [orders, setOrders] = React.useState([]);
  const [createForm] = Form.useForm();
  const onFinish = (values) => {
    axiosClient
      .post("/orders/tim-kiem-theo-so-dien-thoai", values)
      .then((response) => {
        //console.log(response.data);
        setOrders(response.data);
        window.localStorage.setItem("phoneNumber", response.data.phoneNumber);
      });
  };
  const onFinishFailed = (errors) => {
    console.log("💣", errors);
  };
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
  // const [product, setProduct] = React.useState([]);
  // // get dữ liệu products
  // React.useEffect(() => {
  //   axiosClient.get("/products/" + categoryId + "/" + id).then((response) => {
  //     setProduct(response.data);
  //   });
  // }, [categoryId, id]);
  const phoneValidator = (rule, value, callback) => {
    const phoneNumberPattern =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (value && !phoneNumberPattern.test(value)) {
      callback("Số điện thoại không hợp lệ");
    } else {
      callback();
    }
  };
  return (
    <div className="container">
      <div>
        <Form
          form={createForm}
          name="create-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <div className="w[100%]">
            {/* Phone number */}
            <Form.Item
              hasFeedback
              className=""
              label="Nhập số điện thoại"
              name="phoneNumber"
              rules={[
                { required: true, message: "Không thể để trống" },
                {
                  validator: phoneValidator,
                },
              ]}
            >
              <Input className="w-[30%]" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                htmlType="submit"
                className="bg-primary text-white ml-[50%] mt-3"
              >
                Tiếp tục
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="mt-5 mb-10">
        {(() => {
          if (orders.length !== 0 && orders) {
            return (
              <div>
                <span>Xin chào ( Anh / Chị )</span>
                <span className="ml-4 text-primary font-bold">
                  {orders[0]?.fullName}
                </span>
                <span className="text-primary font-bold">
                  {" "}
                  - {orders[0]?.phoneNumber}
                </span>
              </div>
            );
          } else {
            return "";
          }
        })()}
      </div>
      <div className="w-[100%] mt-5 flex">
        <div className="flex-none w-[30%]">
          <div className="left">
            <Link to="/history-orders" className="active">
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
            </Link>
          </div>
        </div>
        <div className="flex-1 ml-[30px] border-solid border-2 border-black rounded-md p-3">
          {(() => {
            if (orders.length !== 0 && orders) {
              return (
                <>
                  <table className="table-auto w-[100%]">
                    <thead>
                      <tr className="text-left">
                        <th>Mã đơn hàng</th>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Ngày mua hàng</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders &&
                        orders.map((item) => {
                          return (
                            <tr key={item._id}>
                              <td className="item">
                                <Link
                                  to={"/history-orders/order-" + item._id}
                                  className="text-blue-600"
                                >
                                  {item._id}
                                </Link>
                              </td>
                              <td className="item flex">
                                <Link to={"/history-orders/order-" + item._id}>
                                  <img
                                    className="w-[80px]"
                                    src={`${API_URL}${item.orderDetails[0].product.imageProduct}`}
                                    alt=""
                                  />
                                </Link>
                                <div className="mt-auto mb-auto">
                                  <p className="text-primary">
                                    {item.orderDetails[0].product.name}
                                  </p>

                                  <Link
                                    to={"/history-orders/order-" + item._id}
                                    className="text-xs mt-1 text-blue-500"
                                  >
                                    Xem chi tiết
                                  </Link>
                                </div>
                              </td>
                              <td className="item">
                                <p className="text-red-400">
                                  {numeral(
                                    // item.orderDetails[0].product.discount
                                    //   ? item.orderDetails[0].product.total *
                                    //       item.orderDetails[0].quantity
                                    //   : item.orderDetails[0].product.price *
                                    //       item.orderDetails[0].quantity
                                    item.orderDetails.reduce((total, item) => {
                                      return (
                                        total +
                                        item.product.total * item.quantity
                                      );
                                    }, 0)
                                  ).format("0,0")}{" "}
                                </p>
                              </td>
                              <td className="item">
                                <p className="text-neutral-500">
                                  {moment(item.createdDate).format(
                                    "DD/MM/yyyy"
                                  )}
                                </p>
                              </td>
                              <td className="item">
                                <p className="text-primary">
                                  {renderStatus(item.status)}
                                </p>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </>
              );
            } else {
              return (
                <p className="text-center text-red-500">
                  Bạn chưa nhập số điện thoại / Bạn chưa mua hàng
                </p>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export default CheckOrder;
