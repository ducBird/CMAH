/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, useParams } from "react-router-dom";
import { axiosClient } from "../../../../libraries/axiosClient";
function BreadcrumbProductDetail() {
  const { categoryId } = useParams();
  const { id } = useParams();
  const [category, setCategory] = React.useState({});
  const [product, setProduct] = React.useState([]);
  React.useEffect(() => {
    if (categoryId) {
      axiosClient.get("/categories/" + categoryId).then((response) => {
        setCategory(response.data);
      });
    }
  }, [categoryId]);
  // get dữ liệu products
  React.useEffect(() => {
    axiosClient.get("/products/" + categoryId + "/" + id).then((response) => {
      setProduct(response.data);
    });
  }, [categoryId, id]);
  return (
    <>
      <div className="w-[90%] inline-block">
        <span>
          <a href="/">Trang chủ</a>
        </span>
        <span className="mx-2">/</span>
        <span>
          <Link to={`/shop/${categoryId ? categoryId : "hotdeal"}`}>
            {categoryId ? category.name : "Hot deal"}
          </Link>
        </span>
        <span className="mx-2">/</span>
        <span className="text-black">
          <Link to={`/shop/${categoryId}/${id}`}>{product.name}</Link>
        </span>
      </div>
      <div className="inline-block">
        <a href="#">
          <span>Previous</span>
        </a>
        <span className="ml-1 mr-1">|</span>
        <a href="#">
          <span>Next</span>
        </a>
      </div>
      <p className="border-b border-primary my-5"></p>
    </>
  );
}

export default BreadcrumbProductDetail;
