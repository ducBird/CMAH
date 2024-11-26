import React from "react";
// import BtnAccounts from "../BtnAccounts/btnAccounts";
import styles from "./register.module.css";
import { Button, Form, Input, message, ConfigProvider } from "antd";
import {
  CloseOutlined,
  FacebookOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { axiosClient } from "../../../../libraries/axiosClient";
import { API_URL } from "../../../../constants/URLS";

const Register = () => {
  const [registerForm] = Form.useForm();
  const onFinish = (values) => {
    axiosClient
      .post("/customers", values)
      .then((response) => {
        // console.log(response);
        message.success(
          "Tạo tài khoản thành công. Hãy tiếp tục với việc đăng nhập!"
        );
        registerForm.resetFields();
      })
      .catch((errors) => {
        console.log(errors);
        if (errors.response.status === 406)
          message.error(errors.response.data.msg);
        else
          message.error(
            "Tạo tài khoản không thành công!\nXin lỗi bạn chúng tôi sẽ cố khắc phục"
          );
      });
  };
  const onFinishFailed = () => {};
  const googleLogin = () => {
    window.open(API_URL + "/customers/auth/google", "_self");
  };
  return (
    <div>
      <div className=" bg-white mx-auto">
        <div className="w-[80%] p-4 mx-auto">
          {/* <CloseOutlined
            style={{ color: "red", fontSize: "25px", cursor: "pointer" }}
          /> */}
          <div className="text-left text-[45px]">Đăng ký tài khoản</div>
          <hr className="my-4 text-gray-300" />
          <div className="max-w-[500px] mx-auto">
            <button
              onClick={googleLogin}
              className="cursor-pointer w-[100%] text-[#fff] bg-[#dd4b39] hover:opacity-90 flex items-center justify-between"
            >
              <span className=" px-3 text-[20px] ">
                Đăng nhập với tài khoản Google
              </span>
              <i className="h-[50px] w-[50px] text-[25px] text-center bg-[#ffffff19] flex items-center justify-center">
                <GoogleOutlined />
              </i>
            </button>
            <div className="my-5 relative">
              <hr className="text-[#beadad]" />
            </div>
            <Form
              form={registerForm} //2.1
              name="register-form"
              // autoComplete="on"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              {/* <BtnAccounts />
              <BtnAccounts color="#dd4b39" icon="google" text="Google" /> */}
              <div className="mb-4 mt-4">
                {/* Input FirstName */}
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Hãy cho chúng tôi biết họ của bạn!",
                    },
                  ]}
                  hasFeedback
                  className="pb-3 "
                >
                  <Input
                    className="outline-none border border-gray-400"
                    placeholder="Họ của bạn là gì?"
                    style={{
                      width: "100%",
                      padding: "10px 5px",
                      fontSize: "18px",
                    }}
                  />
                </Form.Item>

                {/* Input LastName */}
                <Form.Item
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Hãy cho chúng tôi biết tên của bạn!",
                    },
                  ]}
                  hasFeedback
                  className="pb-3 "
                >
                  <Input
                    className="outline-none border border-gray-400"
                    placeholder="Tên của bạn là gì?"
                    style={{
                      width: "100%",
                      padding: "10px 5px",
                      fontSize: "18px",
                    }}
                  />
                </Form.Item>

                {/* Input Email */}
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Email không được để trống!" },
                    { type: "email", message: "Thư điện tử không đúng" },
                  ]}
                  hasFeedback
                  className="pb-3 "
                >
                  <Input
                    className="outline-none border border-gray-400"
                    placeholder="Email"
                    type="email"
                    style={{
                      width: "100%",
                      padding: "10px 5px",
                      fontSize: "18px",
                    }}
                  />
                </Form.Item>

                {/* Input Password */}
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập mật khẩu cho tài khoản của bạn!",
                    },
                    {
                      min: 5,
                      max: 50,
                      message: "Độ dài mật khẩu từ 5-50 kí tự",
                    },
                  ]}
                  hasFeedback
                  className="pb-3 "
                >
                  <Input.Password
                    className="outline-none border border-gray-400"
                    placeholder="Password"
                    style={{
                      width: "100%",
                      padding: "10px 5px",
                      fontSize: "18px",
                    }}
                  />
                </Form.Item>

                {/* Confirm Password */}
                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Hãy xác nhận lại mật khẩu!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Mật khẩu xác nhận không đúng!")
                        );
                      },
                    }),
                  ]}
                  className="pb-3 "
                >
                  <Input.Password
                    className="outline-none border border-gray-400"
                    placeholder="Confirm password"
                    style={{
                      width: "100%",
                      padding: "10px 5px",
                      fontSize: "18px",
                    }}
                  />
                </Form.Item>
                {/* Is Active */}
                {/* <Form.Item name="active" initialValue={true}></Form.Item> */}

                {/* Roles */}
                {/* <Form.Item name="roles" initialValue={["customer"]}></Form.Item> */}

                {/* Create Account */}
                <div className="flex items-center justify-between mt-4">
                  {/* Button Create Account */}
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#005745",
                        },
                      }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        className={`li-nav bg-primary text-lg px-8 py-5`}
                      >
                        Tạo tài khoản
                      </Button>
                    </ConfigProvider>
                  </Form.Item>

                  {/* Already Have an Account? Login! */}
                  <div className="flex justify-end">
                    <Link
                      to={"/accounts/login"}
                      className="text-primary font-medium px-3 py-1 transition-all ease-in duration-300 hover:bg-primary hover:li-nav hover:text-white hover:font-normal hover:px-6 hover:py-1"
                    >
                      <div href="#" className="ml-2">
                        Bạn đã có tài khoản? Hãy đăng nhập!
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
