import React from "react";
import { useSearchParams } from "react-router-dom";
import { axiosClient } from "../../../libraries/axiosClient";
import Products from "../components/Products/Products";
import ShopSideBar from "../components/SideBar/ShopSideBar";

function SearchProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    if (name) {
      axiosClient
        .post("/products/tim-kiem-san-pham", { name: name })
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
        });
    }
  }, [name]);

  return (
    <div className="container flex">
      <ShopSideBar />
      {products == null ? (
        <div>
          <p>Không tìm thấy sản phẩm nào</p>
        </div>
      ) : (
        <Products products={products} />
      )}
    </div>
  );
}

export default SearchProducts;
