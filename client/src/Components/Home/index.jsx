import React, { useEffect } from "react";

import IntroductionHomePage from "../Home/IntroductionHomePage";
import Categories from "./Categories";
import Testumonials from "./Testimonials/Testimonials";
import AsSeemOn from "./AsSeenOn/asseemon";
import { useUser } from "../../hooks/useUser";
import { API_URL, FRONTLINE_URL } from "../../constants/URLS";
function HomePage() {
  const { addUser } = useUser((state) => state);
  useEffect(() => {
    const getUser = () => {
      fetch(API_URL + "/customers/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": FRONTLINE_URL,
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error("authentication failed!");
        })
        .then((resObject) => {
          // console.log(resObject.user);
          // console.log(resObject.cookie.session_google_account);
          window.localStorage.setItem(
            "cookie-google",
            resObject.cookie.session_google_account
          );
          addUser(resObject.user);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUser();
    // const getCookies = window.Cookies.get({ abc: "def" });
    // console.log("getCookies ", getCookies);
  }, []);
  return (
    <div className="container home">
      <IntroductionHomePage />
      <Categories />
      <Testumonials />
      <AsSeemOn />
    </div>
  );
}

export default HomePage;
