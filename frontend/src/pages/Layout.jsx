import React from "react";
import Navbar from "../components/Navbar";
import SlideBar from "../components/SlideBar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      {/* <div className="columns mt-6" style={{ minHeight:"100vh" }}> */}
      {/* <div className="column is-2"> */}
      <SlideBar />
      {/* </div> */}
      <div className="content-wrapper">
        <main>{children}</main>
      </div>
      {/* </div> */}
      {/* <div className="column has-background-light"> */}
      {/* </div> */}
      {/* </div> */}
    </React.Fragment>
  );
};

export default Layout;
