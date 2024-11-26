import React from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../../../libraries/axiosClient";
import BreadcrumbProductDetail from "./BreadcrumbProductDetail";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonAddToCard from "../../ShoppingCard/AddToCard";
import numeral from "numeral";
import { API_URL } from "../../../../constants/URLS";
function ProductDetail() {
  const { categoryId } = useParams();
  const { id } = useParams();
  const [product, setProduct] = React.useState([]);
  const [category, setCategory] = React.useState({});
  let [quantity, setQuantity] = React.useState(1);
  // get dữ liệu products
  React.useEffect(() => {
    axiosClient.get("/products/" + categoryId + "/" + id).then((response) => {
      setProduct(response.data);
    });
  }, [categoryId, id]);

  React.useEffect(() => {
    if (categoryId) {
      axiosClient.get("/categories/" + categoryId).then((response) => {
        setCategory(response.data);
      });
    }
  }, [categoryId]);

  const minusClick = () => {
    setQuantity((quantity) => {
      if (--quantity > 1) {
        return --quantity;
      } else {
        return 1;
      }
    });
  };
  const plusClick = () => {
    setQuantity(++quantity);
  };
  const handleChange = (e) => {
    setQuantity(e.target.value);
  };
  return (
    <div className="product-detail">
      <div className="container">
        <div className="w-[100%]">
          <BreadcrumbProductDetail />
        </div>
        <div className="baner-holder w-[50px]">
          <div className={!product.discount ? "" : "sale-banner"}>
            {!product.discount ? "" : "Sale"}
          </div>
        </div>
        <div className="product clearfix flex ">
          <div className="product_detail-image flex-1">
            <img
              className="w-[100%]"
              src={`${API_URL}${product.imageProduct}`}
              alt=""
            />
          </div>
          <div className="content-product_detail flex-1">
            <div className="title-product_detail text-primary font-bold text-2xl ">
              {product.name}
              <p className="border-solid border-b border-primary mt-[10px] mb-[10px]"></p>
            </div>
            <div className="price-product_detail mb-[10px]">
              <div className="price block">
                {/* giá gốc */}
                <span className="text-primary mr-4">Giá niêm yết:</span>
                <span
                  className={
                    product.discount
                      ? "price-old text-black"
                      : "list-none text-black"
                  }
                >
                  {numeral(product.price).format("0,0")}
                </span>
                {/* giá khuyễn mãi */}
                <br />
                <span
                  className={product.discount ? "text-primary mr-4" : "hidden"}
                >
                  Giá khuyến mãi:
                </span>
                <span
                  className={product.discount ? "text-red-600 pr-3" : "hidden"}
                >
                  {numeral(product.total).format("0,0")}
                </span>
                <p className="border-solid border-b border-primary mb-1 mt-1"></p>
                <div>
                  <span className="text-primary">Tình trạng: </span>
                  <span className="text-red-500">
                    {product.stock <= 0 ? "Hết hàng" : "Còn hàng"}
                  </span>
                </div>
              </div>
            </div>
            <div className="description-product_detail">
              <p className="underline text-primary">Mô tả</p>
              {product.description}
            </div>
            <div className="purchase-details mt-5 text-primary">
              <div className="purchase-details_quantity inline-block mr-[20px]">
                <p className="mb-4">Số lượng</p>
                <div className="h-[40px]">
                  <span className="product-minus border-solid border-2 border-black p-2">
                    <button
                      disabled={product.stock <= 0 ? true : false}
                      onClick={minusClick}
                    >
                      <MinusOutlined />
                    </button>
                  </span>
                  <input
                    disabled={product.stock <= 0 ? true : false}
                    className="border border-black h-[100%] text-center"
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={handleChange}
                  />
                  <span className="product-minus border-solid border-2 border-black p-2">
                    <button
                      disabled={product.stock <= 0 ? true : false}
                      onClick={plusClick}
                    >
                      <PlusOutlined />
                    </button>
                  </span>
                </div>
              </div>
              <div className="purchase-details_button inline-block w-[250px]">
                {/* <button className="border p-2 bg-primary text-white">
                  Add to card
                </button> */}
                <ButtonAddToCard
                  product={{ product: product, quantity: parseInt(quantity) }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
