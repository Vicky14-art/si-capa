import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getMe, LogOut, reset } from "../features/authSlice";
import menarini from "../image/menarini.webp";

const SlideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(getMe())
  // }, [dispatch]);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  // console.log(user);

  return (
    <div>
      {/* Slidebar New */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img
            src={menarini}
            alt="AdminLTE Logo"
            className="brand-image elevation-3"
          />
          {/* <span className="brand-text font-weight-light">E-CAPA</span> */}
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          <div className="row nav nav-pills nav-sidebar flex-column">
            <div className="card card-widget widget-user-2 mt-4">
              <div className="widget-user-image">
                <img
                  className="img-circle"
                  src={user && user.url}
                  // src="dist/img/cheria.png"
                  style={{ borderRadius: "20px" }}
                  alt="User Avatar"
                />
                <h3 className="widget-user-username">
                  {user && user.name.toUpperCase()}
                </h3>
                <h5 className="widget-user-desc">{user && user.dpt.name}</h5>
              </div>
            </div>
          </div>

          {/* Sidebar user panel (optional) */}

          {/* <div className="row justify-content-center">
            <div className="col-md-6">
              <img
                src="dist/img/cheria.png"
                style={{ width: "30%"}}
                className="card-img-top mt-3"
                alt="User Image"
              />
            </div>
            <div className="col-md-6">
              <h5 className="card-title" style={{ margin:'0px', fontSize:'11px' }}>Vicky Fadilla Yuliawan</h5>
            </div>
          </div> */}

          {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                // style={{ width: "30%" }}
                className="img-circle elevation-2"
                alt="User Image"
              />
              <div className="info">
                <NavLink to={"/dashboard"} className="d-block">
                  {user && user.name}
                </NavLink>
              </div>
            </div>
          </div> */}
          {/* Sidebar Menu */}
          <nav className="mt-1">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
            with font-awesome or any other icon font library */}
              <li className="nav-item">
                <NavLink to={"/dashboard"} className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </NavLink>
              </li>
              {user && user.role === "admin" && (
                <li className="nav-item">
                  <NavLink to={"/users"} className="nav-link">
                    <i className="nav-icon fas">
                      <IoPerson />
                    </i>
                    <p>Users</p>
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink to={"/products"} className="nav-link">
                  <i className="nav-icon fas">
                    <IoPricetag />
                  </i>
                  <p>Products</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink onClick={logout} to={"/"} className="nav-link">
                  <i className="nav-icon fas">
                    <IoLogOut />
                  </i>
                  <p>Logout</p>
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <button onClick={logout} className="nav-link">
                  <i className="nav-icon fas">
                    <IoLogOut />
                  </i>
                  <p>Logout</p>
                </button>
              </li> */}
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>

      {/* SlideBar Old */}
      {/* <aside className="menu pl-2 has-shadow">
        <p className="menu-label"> General </p>{" "}
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome /> Dashboard{" "}
            </NavLink>{" "}
          </li>{" "}
          <li>
            <NavLink to={"/products"}>
              {" "}
              <IoPricetag /> Product{" "}
            </NavLink>{" "}
          </li>{" "}
        </ul>{" "}
        {user && user.role === "admin" && (
          <div>
            <p className="menu-label"> Administration </p>{" "}
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>
                  <IoPerson /> Users{" "}
                </NavLink>{" "}
              </li>{" "}
            </ul>{" "}
          </div>
        )}
        <p className="menu-label"> Settings </p>{" "}
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Logout{" "}
            </button>{" "}
          </li>{" "}
        </ul>{" "}
      </aside>{" "} */}
    </div>
  );
};

export default SlideBar;
