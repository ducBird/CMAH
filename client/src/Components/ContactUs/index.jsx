import React from "react";
import { Button, Form, Input, message, ConfigProvider } from "antd";
import FormItem from "antd/es/form/FormItem";
import { axiosClient } from "../../libraries/axiosClient";

export default function ContactUs() {
  const [guestServiceForm] = Form.useForm();
  const onFinish = (values) => {
    axiosClient
      .post("/guestServices", values)
      .then((response) => {
        console.log(response.data);
        message.success("Gửi phản hồi thành công!");
        guestServiceForm.resetFields();
      })
      .catch((errors) => {
        message.error("Gửi phản hồi thất bại!");
        // console.log(errors);
      });
  };
  const onFinishFailed = () => {};

  return (
    <div>
      <h1 className="text-[45px] text-primary font-medium ml-[5%]">Liên hệ</h1>
      <hr />
      <h3 className="text-[18px] text-primary font-medium text-center mb-[3%] mt-[3%]">
        Hãy gửi câu hỏi hoặc những thắc mắc đến chúng tôi và bạn sẽ có được phản
        hồi nhanh nhất 😉
      </h3>
      <Form
        form={guestServiceForm}
        name="guestService-form"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="w-[60%] mx-auto mb-4 mt-4">
          {/* Input FullName */}
          <Form.Item
            name="fullName"
            label="Tên"
            rules={[
              {
                required: true,
                message: "Hãy cho chúng tôi biết tên hoặc biệt danh của bạn!",
              },
            ]}
            hasFeedback
            className="pb-3"
          >
            <Input placeholder="Tên của bạn là gì?" />
          </Form.Item>

          {/* Input Email */}
          <FormItem
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email không được để trống!" },
              { type: "email", message: "Thư điện tử không đúng" },
            ]}
            hasFeedback
            className="pb-3"
          >
            <Input placeholder="Email" type="email" />
          </FormItem>

          {/* Input PhoneNumber */}
          <Form.Item
            hasFeedback
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { min: 10, message: "Số điện thoại không ít hơn 10 chữ số!" },
              { max: 10, message: "Số điện thoại không quá 10 chữ số!" },
            ]}
            className="pb-3"
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>

          {/* Input Message */}
          <Form.Item
            name="message"
            label="Lời nhắn"
            hasFeedback
            rules={[
              { min: 20, message: "Lời nhắn phải có ít nhất 20 ký tự" },
              { max: 200, message: "Lời nhắn không quá 200 ký tự" },
            ]}
            className="pb-3"
          >
            <Input placeholder="Lời nhắn hoặc câu hỏi của bạn" />
          </Form.Item>

          <Form.Item name="isRequest" initialValue={false} />

          {/* Submit Form */}
          <div className="flex justify-center mt-4">
            {/* Button Create Account */}
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
                  className="text-primary text-[16px] font-medium px-10 py-5 transition-all ease-in duration-300 hover:bg-primary hover:text-white hover:font-bold hover:px-20"
                >
                  Gửi
                </Button>
              </ConfigProvider>
            </Form.Item>
          </div>
        </div>
      </Form>
      <hr className="mt-[2%]" />
      <p className="text-center text-sm mt-[2%]">
        Bạn có thể liên hệ với chúng tôi qua số điện thoại{" "}
        <span className="text-primary font-medium">0329567796</span>
      </p>
      <p className="text-center text-sm">
        hoặc Liên hệ qua Email của chúng tôi{" "}
        <span className="text-primary font-medium">cmah@gmail.com</span>
      </p>
    </div>
  );
}
