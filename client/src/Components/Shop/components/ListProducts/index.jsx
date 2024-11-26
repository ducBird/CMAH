/* eslint-disable jsx-a11y/anchor-has-content */
import { useState, Fragment, useEffect } from "react";
import ShopSideBar from "../SideBar/ShopSideBar";
import { Link, useParams } from "react-router-dom";
import Products from "../Products/Products";
import { axiosClient } from "../../../../libraries/axiosClient";
import { Select } from "antd";
function Categories() {
  const prices = [
    { id: "price_1", name: "Dưới 10.000 đ", value: { min: 0, max: 10000 } },
    {
      id: "price_2",
      name: "Từ 10.000 đ - 50.000 đ",
      value: { min: 10000, max: 50000 },
    },
    {
      id: "price_3",
      name: "Từ 50.000 đ - 100.000 đ",
      value: { min: 50000, max: 100000 },
    },
    {
      id: "price_4",
      name: "Từ 100.000 đ - 150.000 đ",
      value: { min: 100000, max: 150000 },
    },
    { id: "price_5", name: "Trên 150.000 đ", value: { min: 150000 } },
  ];
  const { categoryId } = useParams();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState();
  useEffect(() => {
    if (categoryId) {
      axiosClient.get("/categories/" + categoryId).then((response) => {
        setCategory(response.data);
      });
    }
  }, [categoryId]);

  // get dữ liệu products
  useEffect(() => {
    if (categoryId) {
      axiosClient.get("/products/" + categoryId).then((response) => {
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

  useEffect(() => {
    if (selectedPrice) {
      const price = prices.find((item) => item.id === selectedPrice);
      const url =
        (price.value.min ? "min=" + price.value.min : "") +
        (price.value.min ? "&" : "") +
        (price.value.max ? "max=" + price.value.max : "");

      if (categoryId) {
        axiosClient
          .get("/products/" + categoryId + "?" + url)
          .then((response) => {
            setProducts(response.data);
          });
      } else {
        axiosClient.get("/products/?" + url).then((response) => {
          let listHotDeal = response.data.filter((product) => {
            return product.discount;
          });

          setProducts(listHotDeal);
        });
      }
    }
  }, [selectedPrice]);

  return (
    <div className="shop-hot-deal">
      <div className="container">
        <div className=" text-primary text-xs breadcrumb-collection">
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
          <span className="text-black">Trang 1 của 1</span>
          <div className="mt-[20px] font-bold text-2xl">
            <h1>{category.name}</h1>
          </div>
          <div className="mt-3 text-black text-[13px] font-bold flex">
            <p className="mr-5 pt-[8px]">Bộ lọc</p>
            <div className="w-[230px]">
              {/* <DropDowns /> */}
              <div className="">
                Giá:
                <Select
                  className="ml-2 w-[190px]"
                  value={selectedPrice}
                  onChange={function (e) {
                    setSelectedPrice(e);
                  }}
                >
                  {prices.map((option) => (
                    <Select.Option key={option.name} value={option.id}>
                      {/* <Link to={"/shop/products/search-price"}> */}
                      <p>{option.name}</p>
                      {/* </Link> */}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <p className="border-b border-primary my-5"></p>
        </div>

        <div className="flex">
          <>
            <ShopSideBar />
          </>
          <>
            <Products products={products} />
          </>
        </div>
      </div>
    </div>
  );
}

export default Categories;
