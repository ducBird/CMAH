/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./FeatureProduct.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { axiosClient } from "../../../../libraries/axiosClient";
import { useParams } from "react-router-dom";
import Product from "../../../Shop/components/Product";
import Modal from "../../../Shop/Modal/Modal";
import PopupModalContent from "../../../Shop/Modal/PopupModalContent";

function FeaturedProductSlider() {
  var settings = {
    dots: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  const { categoryId } = useParams();
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    if (categoryId) {
      axiosClient.get("/products/").then((response) => {
        setProducts(response.data);
      });
    } else {
      axiosClient.get("/products").then((response) => {
        let listHotDeal = response.data.filter((product) => {
          return product.discount;
        });

        setProducts(listHotDeal);
      });
    }
  }, [categoryId]);
  const [showModal, setShowModal] = React.useState(false);
  const [body, setBody] = React.useState("");
  const openModal = (body) => {
    setBody(body);
    setShowModal(true);
  };
  const closeModal = (isShow) => {
    setShowModal(isShow);
  };
  return (
    <div className="container">
      <Slider {...settings}>
        {products &&
          products.map((product) => {
            return (
              <Product
                key={product._id}
                openModal={openModal}
                product={product}
              />
            );
          })}
      </Slider>
      <Modal closeModal={closeModal} showModal={showModal}>
        <PopupModalContent body={body} />
      </Modal>
    </div>
  );
}

export default FeaturedProductSlider;
