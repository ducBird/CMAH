import React from "react";
import { axiosClient } from "../../../libraries/axiosClient";
import Products from "../components/Products/Products";
import ShopSideBar from "../components/SideBar/ShopSideBar";
function SearchProductsByPrice() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    axiosClient.post("/products/gia-ban").then((response) => {
      setProducts(response.data);
    });
  }, []);
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

export default SearchProductsByPrice;
