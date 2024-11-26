import React, { useEffect, useState } from "react";
import { axiosClient } from "../../../libraries/axiosClient";
import {
  Table,
  Button,
  Popconfirm,
  Form,
  Input,
  Modal,
  message,
  Upload,
} from "antd";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineUpload,
  AiOutlinePlus,
  AiFillQuestionCircle,
} from "react-icons/ai";
import "./categories.css";
import axios from "axios";
import { API_URL } from "../../../constants/URLS";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "imageURL",
      key: "imageURL",
      width: "20%",
      render: (text, record) => {
        return (
          <div className="text-center">
            {text && (
              <img
                className="max-w-[150px] w-[30%] min-w-[70px]"
                src={`${API_URL}${text}`}
                alt=""
              />
            )}
          </div>
        );
      },
    },
    {
      title: "Tên Danh Mục",
      dataIndex: "name",
      key: "name",
      width: "60%",
    },
    {
      title: "",
      key: "actions",
      render: (text, record) => {
        return (
          <div className="flex gap-5 items-center">
            {/* Button Upload Image */}
            <Upload
              showUploadList={false}
              name="Image"
              data={{ name: "uploads file image category" }}
              action={`${API_URL}/category/upload-image/${record.id}`}
              headers={{ authorization: "authorization-text" }}
              onChange={(info) => {
                console.log(record);

                if (info.file.status !== "uploading") {
                  console.log(info.file, info.fileList);
                }
                if (info.file.status === "done") {
                  message.success(`${info.file.name} file tải lên thành công`);
                  setRefresh((f) => f + 1);
                } else if (info.file.status === "error") {
                  message.error(`${info.file.name} file tải lên thất bại.`);
                }
              }}
            >
              <Button
                className="py-5 flex justify-center items-center"
                icon={<AiOutlineUpload size={"20px"} />}
              >
                Thêm hình ảnh
              </Button>
            </Upload>

            {/* Button Edit */}
            <Button
              className="py-5 flex items-center"
              onClick={() => {
                setSelectedRecord(record);
                updateForm.setFieldsValue(record);
                setEditFormVisible(true);
              }}
            >
              {<AiFillEdit size={"16px"} />}
            </Button>
            {/* Button Delete */}
            <Popconfirm
              icon={
                <AiFillQuestionCircle size={"24px"} className="text-red-600" />
              }
              title="Bạn có chắc muốn xóa danh mục này không?"
              onConfirm={() => {
                const id = record._id;
                axiosClient
                  .patch("/categories/" + id, { isDelete: true })
                  .then((response) => {
                    message.success("Xóa thành công!");
                    setRefresh((f) => f + 1);
                  })
                  .catch((err) => {
                    console.log(err);
                    message.error("Xóa thất bại!");
                  });
              }}
              onCancel={() => {}}
              okText="Có"
              cancelText="Không"
            >
              <Button danger className="py-5 flex items-center">
                {<AiFillDelete size={"16px"} />}
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    axiosClient
      .get("/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const onFinish = (values) => {
    axiosClient
      .post("/category", values)
      .then((response) => {
        createForm.resetFields();
        setRefresh((f) => f + 1);
        message.success("Thêm thành công!");
      })
      .catch((err) => {
        message.error("Thêm thất bại!");
        console.log(err);
      });
    console.log("👌👌👌", values);
  };

  const onFinishFailed = (errors) => {
    console.log("💣💣💣 ", errors);
  };

  const onUpdateFinish = (values) => {
    axiosClient
      .patch("/categories/" + selectedRecord._id, values)
      .then((response) => {
        message.success("Cập nhật thành công!");
        setRefresh((f) => f + 1);
        setEditFormVisible(false);
      })
      .catch((err) => {
        message.error("Cập nhật thất bại!");
        console.log(err);
      });
  };
  const onUpdateFinishFailed = (errors) => {
    console.log("💣💣💣 ", errors);
  };

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  return (
    <>
      <h1 className="text-center p-2 mb-5 text-xl">
        📝 Quản Lý Danh Mục Sản Phẩm 📝
      </h1>

      <Button
        className="bg-blue-500 text-white font-bold mb-5 mt-5"
        onClick={() => {
          setCreateFormVisible(true);
        }}
      >
        Thêm mới danh mục
      </Button>
      <Modal
        centered
        open={createFormVisible}
        title="Thêm mới thông tin danh mục"
        onOk={() => {
          createForm.submit();
          //setCreateFormVisible(false);
        }}
        onCancel={() => {
          setCreateFormVisible(false);
        }}
        okText="Lưu"
        cancelText="Đóng"
      >
        <Form
          form={createForm}
          name="create-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="w-[80%]">
            {/* Tên danh mục */}
            <Form.Item
              hasFeedback
              className=""
              label="Tên danh mục"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Tên danh mục không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <Table rowKey={"_id"} dataSource={categories} columns={columns} />

      <Modal
        centered
        title="Cập Nhật Danh Mục"
        open={editFormVisible}
        onOk={() => {
          updateForm.submit();
        }}
        onCancel={() => {
          setEditFormVisible(false);
        }}
        okText="Lưu thay đổi"
        cancelText="Đóng"
      >
        <Form
          form={updateForm}
          name="update-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onUpdateFinish}
          onFinishFailed={onUpdateFinishFailed}
          autoComplete="off"
        >
          {/* Tên danh mục */}
          <Form.Item
            hasFeedback
            className=""
            label="Tên danh mục"
            name="name"
            rules={[
              { required: true, message: "Tên danh mục không được để trống!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Categories;
