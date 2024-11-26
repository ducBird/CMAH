import React, { useEffect, useState } from "react";
import "./login.css";

import { Button, Form, Input, ConfigProvider, message } from "antd";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { axiosClient } from "../../../../libraries/axiosClient";
import { useUser } from "../../../../hooks/useUser";
import { API_URL } from "../../../../constants/URLS";

const Login = () => {
  const [loginForm] = Form.useForm();
  const { addUser } = useUser((state) => state);

  const onFinish = (values) => {
    const { email, password } = values;
    axiosClient
      .post("/customers/login-jwt", { email, password })
      .then((response) => {
        axiosClient
          .get(`/customers/${response.data._id}`)
          .then((res) => {
            // console.log(res.data);
            addUser(res.data);
            window.location.href = "/";
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          message.error("Đăng nhập thất bại!");
        }
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const googleLogin = () => {
    window.open(API_URL + "/customers/auth/google", "_self");
  };

  return (
    <>
      <div className=" bg-white mx-auto">
        <div className="w-[80%] p-4 mx-auto">
          <div className="text-left text-[45px]">Đăng Nhập</div>
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
              form={loginForm}
              name="login-form"
              initialValues={{ remember: true }}
              autoComplete="on"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <div className="mb-4 mt-4">
                <div className="">
                  <div className="w-[100%]">
                    <h2 className="text-xl text-primary ">Email</h2>
                    <Form.Item
                      // label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Chưa nhập thư điện tử!" },
                        { type: "email", message: "Thư điện tử không đúng" },
                      ]}
                      hasFeedback
                    >
                      <Input
                        className="outline-none border border-gray-400"
                        type="text"
                        style={{
                          width: "100%",
                          padding: "10px 5px",
                          fontSize: "18px",
                        }}
                        placeholder="Nhập email hoặc số điện thoại"
                      />
                    </Form.Item>
                  </div>

                  <div className="">
                    <h2 className="text-xl text-primary ">Password</h2>
                    <Form.Item
                      name="password"
                      rules={[
                        { required: true, message: "Chưa nhập mật khẩu!" },
                        {
                          min: 5,
                          max: 50,
                          message: "Độ dài mật khẩu từ 5-50 kí tự",
                        },
                        // { type: "password", message: "Mật khẩu không đúng" },
                      ]}
                      hasFeedback
                    >
                      <Input
                        className="outline-none border border-gray-400"
                        type="password"
                        style={{
                          width: "100%",
                          padding: "10px 5px",
                          fontSize: "18px",
                        }}
                        placeholder="Nhập mật khẩu"
                      />
                    </Form.Item>
                    <em style={{ textAlign: "right", display: "block" }}>
                      <a href="#" className="text-primary hover:text-blue-500">
                        Quên mật khẩu?
                      </a>
                    </em>
                  </div>
                  {/* </div> */}
                  <div className="flex justify-between items-center">
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
                          Đăng nhập
                        </Button>
                      </ConfigProvider>
                    </Form.Item>
                    <h2 className="flex items-center ">
                      Bạn là khách hàng mới?
                      <Link to={"/accounts/register"}>
                        <div className="ml-2 ">
                          Đăng ký
                          <ArrowRightOutlined size={""} />
                        </div>
                      </Link>
                    </h2>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
