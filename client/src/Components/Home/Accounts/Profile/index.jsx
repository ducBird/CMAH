import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Checkbox,
  Select,
  message,
  Upload,
  Button,
  ConfigProvider,
} from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { axiosClient } from "../../../../libraries/axiosClient";
import { API_URL } from "../../../../constants/URLS";
import axios from "axios";
import moment from "moment";
import { useUser } from "../../../../hooks/useUser";

const Profile = () => {
  const { users } = useUser((state) => state);
  const [file, setFile] = useState();
  const [updateForm] = Form.useForm();

  // validate phone number
  const phoneValidator = (rule, value, callback) => {
    const phoneNumberPattern =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (value && !phoneNumberPattern.test(value)) {
      callback("Số điện thoại không hợp lệ");
    } else {
      callback();
    }
  };

  // validate birth date
  const dateOfBirthValidator = (rule, value, callback) => {
    const dateFormat = "YYYY/MM/DD"; // Định dạng ngày tháng
    const currentDate = moment(); // Lấy ngày hiện tại
    const dateOfBirth = moment(value, dateFormat); // Chuyển đổi giá trị nhập vào thành kiểu moment

    // Kiểm tra tính hợp lệ của ngày sinh
    if (currentDate.diff(dateOfBirth, "days") < 0) {
      callback("Ngày sinh phải nhỏ hơn ngày hiện tại");
    } else {
      callback();
    }
  };

  const onUpdateFinish = (values) => {
    axiosClient
      .patch("/customers/" + users.id, values)
      .then((response) => {
        if (values.file !== undefined) {
          //UPLOAD FILE
          const { _id } = response.data;
          const formData = new FormData();
          formData.append("file", file);
          axios
            .post(`${API_URL}/upload-image/customers/${_id}`, formData)
            .then((response) => {
              message.success("Cập nhật thành công!");
            })
            .catch((err) => {
              message.error("Tải lên hình ảnh thất bại!");
            });
        }
        updateForm.resetFields();
      })
      .catch((err) => {
        message.error("Cập nhật thất bại!");
        console.log(err);
      });
  };

  const onUpdateFinishFailed = (errors) => {
    console.log("🐣", errors);
  };

  return (
    <div className="">
      <Form
        className="mt-10 flex justify-center"
        form={updateForm}
        name="update-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={users}
        onFinish={onUpdateFinish}
        onFinishFailed={onUpdateFinishFailed}
        autoComplete="off"
      >
        <div className="w-[60%] flex">
          {/* FirstName */}
          <div className="w-[80%]">
            <span>Họ - Tên Đệm</span>
            <Form.Item
              hasFeedback
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Họ - Tên đệm không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* LastName */}
            <span>Tên</span>
            <Form.Item
              hasFeedback
              name="lastName"
              rules={[{ required: true, message: "Tên không được để trống!" }]}
            >
              <Input />
            </Form.Item>

            {/* Email */}
            <span>Email</span>
            <Form.Item
              hasFeedback
              name="email"
              rules={[
                { required: true, message: "Email không được để trống!" },
                { type: "email", message: `Email không hợp lệ!` },
              ]}
            >
              <Input disabled={users.accountType !== "email" ? true : false} />
            </Form.Item>

            {/* Password */}
            {users.accountType !== "email" ? (
              <></>
            ) : (
              <div>
                <span>Mật khẩu</span>
                <Form.Item
                  hasFeedback
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Mật khẩu không được để trống!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </div>
            )}

            {/* Phone */}
            <span>Số điện thoại</span>
            <Form.Item
              hasFeedback
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống!",
                },
                { min: 10, message: "Số điện thoại không quá 10 chữ số!" },
                { max: 10, message: "Số điện thoại không quá 10 chữ số!" },
                {
                  validator: phoneValidator,
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Address */}
            <span>Địa chỉ</span>
            <Form.Item hasFeedback name="address">
              <Input />
            </Form.Item>

            {/* BirthDay */}
            <span>Ngày Sinh</span>
            <Form.Item
              hasFeedback
              name="birthDay"
              rules={[
                {
                  validator: dateOfBirthValidator,
                },
                { type: "date", message: "Ngày sinh không hợp lệ" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
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
                  className="text-primary text-[16px] font-medium px-10 py-1 transition-all ease-in duration-300 hover:bg-primary hover:text-white hover:font-bold hover:px-20"
                >
                  Lưu
                </Button>
              </ConfigProvider>
            </Form.Item>
          </div>

          <div className="w-[20%] text-center">
            <Form.Item name="file">
              <Upload
                showUploadList={true}
                // listType="picture-card"
                beforeUpload={(file) => {
                  setFile(file);
                  return false;
                }}
              >
                <div className="flex justify-center items-center w-[100px] h-[100px] border border-dashed rounded-lg hover:cursor-pointer hover:border-blue-400 hover:bg-white transition-all ease-in duration-150">
                  <img src={users.avatar} alt="" srcset="" />
                </div>
              </Upload>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Profile;
