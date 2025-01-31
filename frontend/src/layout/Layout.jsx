import React from "react";
import Routers from "../routes/Routers";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
const Layout = () => {
  return (
    <>
      <Header></Header>
      <main className="">
        <Routers></Routers>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Layout;
