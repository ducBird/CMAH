import "./App.css";
import React, { useState, useEffect } from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomePage from "./Components/Home";
import ShopPage from "./Components/Shop/ShopPage";
import ListProducts from "./Components/Shop/components/ListProducts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./Components/Shop/components/ProductDetail/ProductDetail";
import AboutUs from "./Components/AboutUs";
import Community from "./Components/Community";
import Contactus from "./Components/ContactUs";
import ShoppingCard from "./Components/Shop/ShoppingCard/ShoppingCard";
import Login from "./Components/Home/Accounts/Login/login";
import Register from "./Components/Home/Accounts/Register/register";
import RecipesPage from "./Components/Community/Recipes/RecipesPage";
import VegetarianPage from "./Components/Community/VegetarianCommunity/VegetarianPage";
import ShopOrder from "./Components/Shop/ShopOrder";
import CheckOrder from "./Components/Shop/CheckOrder";
import HistoryOrder from "./Components/HistoryOrder";
import SearchProducts from "./Components/Shop/SearchProducts";
import Profile from "./Components/Home/Accounts/Profile";
import { axiosClient } from "./libraries/axiosClient";
import CloudMarketLogo from "./assets/header/logo/cloud-market.jpg";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axiosClient.get("/products").then((response) => {
      setIsLoading(false);
    });
  }, []);
  return (
    <div>
      {isLoading && (
        // <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center flex-col justify-center">
        //   <div
        //     className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        //     role="status"
        //   ></div>
        //   <span className="mt-5">
        //     Đang tải dữ liệu, hãy đợi trong vòng ít phút
        //   </span>
        // </div>
        <div class="fixed top-0 left-0 w-full h-full z-40 flex items-center flex-col justify-center bg-gradient-to-b from-primary to-white">
          <div className="animate-bounce mb-2">
            <img
              src={CloudMarketLogo}
              alt="logo Cloud Market At Home"
              style={{ display: "inline-block", width: "60px" }}
            />
            <span className="font-bold title-logo text-white text-[18px]">
              Cloud Market AH
            </span>
          </div>

          <div>
            <span className="animate-pulse text-primary font-semibold">
              Đang tải dữ liệu, hãy đợi trong ít phút ...
            </span>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="App">
          <BrowserRouter>
            <header className="w-[100%]">
              <Header />
            </header>
            <section className="relative w-[90%] top-[130px] mx-auto">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/:categoryId" element={<ListProducts />} />
                <Route path="/shop/hotdeal" element={<ListProducts />} />
                <Route
                  path="/shop/:categoryId/:id"
                  element={<ProductDetail />}
                />
                <Route path="/shop/card" element={<ShoppingCard />} />
                <Route path="/shop/order" element={<ShopOrder />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/community" element={<Community />} />
                <Route path="/contactUs" element={<Contactus />} />
                <Route path="/history-orders" element={<CheckOrder />} />
                <Route path="/search-products" element={<SearchProducts />} />
                <Route
                  path="/history-orders/order-:id"
                  element={<HistoryOrder />}
                />
                <Route path="/accounts/login" element={<Login />} />
                <Route path="/accounts/register" element={<Register />} />
                <Route path="/accounts/profile" element={<Profile />} />
                <Route path="/community/recipes" element={<RecipesPage />} />
                <Route
                  path="/community/vegetarian"
                  element={<VegetarianPage />}
                />

                <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>404 Page not found 😂😂😂</p>
                    </main>
                  }
                />
              </Routes>
            </section>
            <footer>
              {/* <footer> */}
              <Footer />
              {/* </footer> */}
            </footer>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
