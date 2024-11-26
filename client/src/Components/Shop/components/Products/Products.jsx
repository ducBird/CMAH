/* eslint-disable jsx-a11y/anchor-is-valid */
import PopupModalContent from "../../Modal/PopupModalContent";
import React from "react";
import Modal from "../../Modal/Modal";
import Product from "../Product";

function Products(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [body, setBody] = React.useState("");
  const openModal = (body) => {
    setBody(body);
    setShowModal(true);
  };
  const closeModal = (isShow) => {
    setShowModal(isShow);
  };
  if (!Array.isArray(props.products)) {
    return <div>Invalid data</div>;
  }
  if (Array.isArray(props.products) && props.products.length === 0) {
    return <div>Không có sản phẩm</div>;
  }
  return (
    <div className="container flex-1 mt-[-15px]">
      <div className="grid grid-cols-4">
        {props.products &&
          props.products.map((product) => {
            return (
              <Product
                key={product._id}
                openModal={openModal}
                product={product}
              />
            );
          })}
        <Modal closeModal={closeModal} showModal={showModal}>
          <PopupModalContent body={body} />
        </Modal>
      </div>
    </div>
  );
}

export default Products;
