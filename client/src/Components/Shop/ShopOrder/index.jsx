import React, { useEffect } from "react";
import CloudMarketLogo from "../../../assets/header/logo/cloud-market.jpg";
import { useCarts } from "../../../hooks/useCart";
import { Button, Radio, Form, Input, Space, message } from "antd";
import { Link } from "react-router-dom";
import numeral from "numeral";
import { axiosClient } from "../../../libraries/axiosClient";
import { API_URL } from "../../../constants/URLS";
import { useUser } from "../../../hooks/useUser";

function ShopOrder() {
  const { users } = useUser((state) => state);
  const initialValueOrder = {
    employeeId: null,
    createdDate: new Date(),
    shippedDate: null,
    shippingAddress: null,
    customerId: users.id,
  };
  const [refresh, setRefresh] = React.useState(0);
  const { items, remove } = useCarts((state) => state);
  const totalOrder = items.reduce((total, item) => {
    return total + item.product.total * item.quantity;
  }, 0);
  const [value, setValue] = React.useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const [createForm] = Form.useForm();
  // xử lý thêm mới
  const onFinish = async (values) => {
    values.orderDetails = [];
    //value.createdDate = new Date();
    items.forEach((item) => {
      const orderDetail = {
        productId: item.product._id,
        quantity: item.quantity,
      };
      values.orderDetails.push(orderDetail);
    });

    //console.log(values.orderDetails);
    console.log("❤", values);
    await axiosClient
      .post("/orders", values, initialValueOrder)
      .then((response) => {
        message.success("thanh toán thành công ❤");
        setRefresh((pre) => pre + 1);
        createForm.resetFields();
        window.localStorage.removeItem("cart-storage");
        setTimeout(() => {
          window.location = "/shop/order";
        }, 2000);
      })
      .catch((err) => {
        message.error("Thanh toán thất bại 😥");
        console.log({ message: err.message });
      });
    console.log("❤", values);
  };
  const onFinishFailed = (errors) => {
    console.log("💣", errors);
  };
  const payWithAccount = () => {
    console.log("pay");
  };
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
      <div className="logo">
        <a href="/">
          <img
            src={CloudMarketLogo}
            alt="logo Cloud Market At Home"
            style={{ display: "inline-block", width: "60px" }}
          />
          <span className="font-bold title-logo">Cloud Market AH</span>
          <span className="m-[20px]">|</span>
          <span className="font-bold text-primary">Thanh toán</span>
        </a>
      </div>

      <div className="order-content w-[100%] border border-solid border-black rounded-md">
        <div className="mt-5 text-center w-[100%]">
          <div className="m-auto">
            <p className="mb-5 text-primary font-bold text-2xl">
              Thông tin giao hàng
            </p>
          </div>
          <div className="m-auto mb-3">
            <span className="mb-5 text-black">Bạn đã có tài khoản chưa</span>
            <span> / </span>
            <Link to="/accounts/login">
              <span className="text-primary">Đăng nhập</span>
            </Link>
          </div>
          {/* FORM */}
          <Form
            form={createForm}
            name="create-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={users}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
          >
            <div className="w-[100%]">
              <div className="w-[40%] m-auto">
                {/* Tên khách hàng */}
                <Form.Item
                  hasFeedback
                  className="pb-3 "
                  label="Họ và tên"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập tên",
                    },
                  ]}
                >
                  <Input placeholder="Hãy nhập họ và tên" />
                </Form.Item>

                {/* số điện thoại */}
                <Form.Item
                  hasFeedback
                  className="pb-3"
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập số điện thoại",
                    },
                    {
                      validator: phoneValidator,
                    },
                  ]}
                >
                  <Input placeholder="Hãy nhập số điện thoại" />
                </Form.Item>

                {/* Địa chỉ */}
                <Form.Item
                  hasFeedback
                  className="pb-3"
                  label="Địa chỉ"
                  name="shippingAddress"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập địa chỉ",
                    },
                  ]}
                >
                  <Input placeholder="Hãy nhập địa chỉ" />
                </Form.Item>

                {/* Phương thức thanh toán */}
                <Form.Item
                  hasFeedback
                  className="pb-3"
                  label="Phương thức thanh toán"
                  name="payments"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa chọn hình thức thanh toán",
                    },
                  ]}
                >
                  <Radio.Group
                    onChange={onChange}
                    value={value}
                    className="text-left pt-2"
                  >
                    <Space direction="vertical">
                      <Radio value={1}>Thanh toán khi nhận hàng</Radio>
                      <Radio value={2}>Thanh toán qua thẻ ngân hàng</Radio>
                      <Radio value={3}>Ví MoMo</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-blue-500"
                  >
                    Thanh toán
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
        <div className="mt-5 ml-5 text-primary font-bold">
          Danh sách sản phẩm
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Sản phẩm
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Đơn giá
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Số lượng
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Thành tiền
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"></tr>
                    {items &&
                      items.map((item) => {
                        return (
                          <tr className="bg-white" key={item.product._id}>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <div className="flex">
                                <div className="baner-holder w-[50px]">
                                  <div
                                    className={
                                      !item.product.discount
                                        ? ""
                                        : "sale-banner"
                                    }
                                  >
                                    {!item.product.discount ? "" : "Sale"}
                                  </div>
                                </div>
                                <div className="w-[100px] h-[100px]">
                                  <img
                                    src={`${API_URL}${item.product.imageProduct}`}
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <p className="pt-[40px] pl-[20px] text-primary">
                                    {item.product.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <div className="inline">
                                <p
                                  className={
                                    item.product.discount
                                      ? "text-red-500 pr-3"
                                      : "text-black pr-3"
                                  }
                                >
                                  {item.product.discount
                                    ? `${item.product.total}`
                                    : `${item.product.price}`}
                                </p>
                              </div>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <div className="inline">
                                <p>{item.quantity}</p>
                              </div>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <div className="inline">
                                <p>
                                  {item.product.discount
                                    ? `${item.product.total * item.quantity}`
                                    : `${item.product.price * item.quantity}`}
                                </p>
                              </div>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <div className="inline">
                                <button
                                  className="text-red-600"
                                  onClick={() => {
                                    remove(item.product._id);
                                  }}
                                >
                                  remove
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right text-primary font-bold mr-5 mb-5">
          <span>Tổng tiền: </span>
          <span>{numeral(totalOrder).format("0,0")} đ</span>
        </div>
      </div>
    </div>
  );
}

export default ShopOrder;
