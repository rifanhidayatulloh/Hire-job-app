import React from "react";
import Navbar from "../components/navbar/index";
import Footer from "../components/footer/index";

export default function Layout(props) {
  const { children } = props;
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
