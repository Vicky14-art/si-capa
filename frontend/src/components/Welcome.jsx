import React, { Fragment } from "react";
import { IoToday } from "react-icons/io5";
import { useSelector } from "react-redux";
import Fullcalender from "./Fullcalender";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let today = new Date();
  let month = monthNames[today.getMonth()];

  return (
    <Fragment>

      {/* <h1 className="title">Dashboard</h1> */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2 justify-content-center">
            <div className="col-sm-5 mt-6">
            {/* START USER CARD */}
            <div className="card card-widget widget-user mt-4">
              <div className="widget-user-header text-white" style={{background: 'url("../dist/img/photo1.png") center center'}}>
                <h3 className="widget-user-username text-right">{user && user.name.toUpperCase()}</h3>
                <h5 className="widget-user-desc text-right">{user && user.dpt.name} </h5>
              </div>
              <div className="widget-user-image">
                {/* <img className="img-circle" src="../dist/img/user3-128x128.jpg" alt="User Avatar" /> */}
                <img className="img-circle" style={{ height:'90px' }} src={user && user.url} alt="User Avatar" />
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-sm-4 border-right">
                    <div className="description-block">
                      <h5 className="description-header">3,200</h5>
                      <span className="description-text">TASK</span>
                    </div>
                  </div>
                  <div className="col-sm-4 border-right">
                    <div className="description-block">
                      <h5 className="description-header">13,000</h5>
                      <span className="description-text">DONE</span>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="description-block">
                      <h5 className="description-header">86%</h5>
                      <span className="description-text">PERCENTAGE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END USER CARD */}
              {/* <h1 className="mt-3">Dashboard</h1>
              <h1 className="">Welcome Back {user && user.name}</h1> */}
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box">
                <span className="info-box-icon bg-success elevation-1">
                  <i className="fas fa-tasks"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Production</span>
                  <span className="info-box-number">
                    60
                    <small>%</small>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box">
                <span className="info-box-icon bg-warning elevation-1">
                  <i className="fas fa-tasks"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Supply Chain</span>
                  <span className="info-box-number">
                    54
                    <small>%</small>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box">
                <span className="info-box-icon bg-primary elevation-1">
                  <i className="fas fa-tasks"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Quallity Control</span>
                  <span className="info-box-number">
                    98
                    <small>%</small>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box">
                <span className="info-box-icon bg-teal elevation-1">
                  <i className="fas fa-tasks"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Engineering</span>
                  <span className="info-box-number">
                    87
                    <small>%</small>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box">
                <span className="info-box-icon bg-white elevation-1">
                  <i className="fas fa-tasks"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Finnance</span>
                  <span className="info-box-number">
                    75
                    <small>%</small>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box">
                <span className="info-box-icon bg-cyan elevation-1">
                  <i className="fas fa-tasks"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Product Development</span>
                  <span className="info-box-number">
                    87
                    <small>%</small>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box">
                <span className="info-box-icon bg-secondary elevation-1">
                  <i className="fas fa-tasks"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Regulatory</span>
                  <span className="info-box-number">
                    94
                    <small>%</small>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box">
                <span className="info-box-icon bg-red elevation-1">
                  <i className="fas fa-tasks"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Quallity Assurance</span>
                  <span className="info-box-number">
                    93
                    <small>%</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* monthly recap */}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-0">Monthly Recap Report</h5>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="remove"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <div className="row">
                    {/* /.col */}
                    <div className="col-md-12">
                      <p className="text-center">
                        <strong>Goal Completion of CAPA</strong>
                      </p>
                      <div className="progress-group">
                        Production
                        <span className="float-right">
                          <b>160</b>/200
                        </span>
                        <div className="progress progress-sm">
                          <div
                            className="progress-bar bg-success"
                            style={{ width: "80%" }}
                          />
                        </div>
                      </div>
                      {/* /.progress-group */}
                      <div className="progress-group">
                        Suplly Chain
                        <span className="float-right">
                          <b>310</b>/400
                        </span>
                        <div className="progress progress-sm">
                          <div
                            className="progress-bar bg-warning"
                            style={{ width: "75%" }}
                          />
                        </div>
                      </div>
                      {/* /.progress-group */}
                      <div className="progress-group">
                        <span className="progress-text">Quallity Control</span>
                        <span className="float-right">
                          <b>480</b>/800
                        </span>
                        <div className="progress progress-sm">
                          <div
                            className="progress-bar bg-blue"
                            style={{ width: "60%" }}
                          />
                        </div>
                      </div>
                      {/* /.progress-group */}
                      <div className="progress-group">
                        Engineering
                        <span className="float-right">
                          <b>250</b>/500
                        </span>
                        <div className="progress progress-sm">
                          <div
                            className="progress-bar bg-teal"
                            style={{ width: "33%" }}
                          />
                        </div>
                      </div>
                      {/* /.progress-group */}
                      {/* /.progress-group */}
                      <div className="progress-group">
                        Finnance
                        <span className="float-right">
                          <b>250</b>/500
                        </span>
                        <div className="progress progress-sm">
                          <div
                            className="progress-bar bg-white"
                            style={{ width: "80%" }}
                          />
                        </div>
                      </div>
                      {/* /.progress-group */}
                      {/* /.progress-group */}
                      <div className="progress-group">
                        Product Development
                        <span className="float-right">
                          <b>250</b>/500
                        </span>
                        <div className="progress progress-sm">
                          <div
                            className="progress-bar bg-info"
                            style={{ width: "65%" }}
                          />
                        </div>
                      </div>
                      {/* /.progress-group */}
                      <div className="progress-group">
                        Regulatory
                        <span className="float-right">
                          <b>250</b>/500
                        </span>
                        <div className="progress progress-sm">
                          <div
                            className="progress-bar bg-secondary"
                            style={{ width: "75%" }}
                          />
                        </div>
                      </div>
                      {/* /.progress-group */}
                      <div className="progress-group">
                        Quallity Assurance
                        <span className="float-right">
                          <b>250</b>/500
                        </span>
                        <div className="progress progress-sm">
                          <div
                            className="progress-bar bg-red"
                            style={{ width: "45%" }}
                          />
                        </div>
                      </div>
                      {/* /.progress-group */}
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                </div>
                {/* ./card-body */}
                <div className="card-footer">
                  <div className="row">
                    <div className="col-sm-3 col-6">
                      <div className="description-block border-right">
                        <span className="description-percentage text-success">
                          <i className="fas fa-caret-up" /> 17%
                        </span>
                        <h5 className="description-header">$35,210.43</h5>
                        <span className="description-text">TOTAL REVENUE</span>
                      </div>
                      {/* /.description-block */}
                    </div>
                    {/* /.col */}
                    <div className="col-sm-3 col-6">
                      <div className="description-block border-right">
                        <span className="description-percentage text-warning">
                          <i className="fas fa-caret-left" /> 0%
                        </span>
                        <h5 className="description-header">$10,390.90</h5>
                        <span className="description-text">TOTAL COST</span>
                      </div>
                      {/* /.description-block */}
                    </div>
                    {/* /.col */}
                    <div className="col-sm-3 col-6">
                      <div className="description-block border-right">
                        <span className="description-percentage text-success">
                          <i className="fas fa-caret-up" /> 20%
                        </span>
                        <h5 className="description-header">$24,813.53</h5>
                        <span className="description-text">TOTAL PROFIT</span>
                      </div>
                      {/* /.description-block */}
                    </div>
                    {/* /.col */}
                    <div className="col-sm-3 col-6">
                      <div className="description-block">
                        <span className="description-percentage text-danger">
                          <i className="fas fa-caret-down" /> 18%
                        </span>
                        <h5 className="description-header">1200</h5>
                        <span className="description-text">
                          GOAL COMPLETIONS
                        </span>
                      </div>
                      {/* /.description-block */}
                    </div>
                  </div>
                  {/* /.row */}
                </div>
                {/* /.card-footer */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>

          <div className="row center">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="card bg-white">
                <div className="card-header">
                  <h5 className="card-title m-0">
                    CAPA Deadline In The End Of This Month
                  </h5>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="remove"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <div className="row">
                    {/* /.col */}
                    <div className="col-md-12">
                      <h2 className="text-center">
                        {/* <strong>{month}</strong> */}
                      </h2>
                      <div style={{ backgroundColor: "#F8F8FF" }}>
                        {/* FULLCALENDER */}
                        <Fullcalender />
                        {/* FULLCALENDER */}
                      </div>

                      {/* /.progress-group */}
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                </div>
                {/* ./card-body */}
                <div className="card-footer">
                  <div className="row">
                    <div className="col-sm-3 col-6">
                      <div className="description-block border-right">
                        <span className="description-percentage text-success">
                          <i className="fas fa-caret-up" /> 17%
                        </span>
                        <h5 className="description-header">$35,210.43</h5>
                        <span className="description-text">TOTAL REVENUE</span>
                      </div>
                      {/* /.description-block */}
                    </div>
                    {/* /.col */}
                    <div className="col-sm-3 col-6">
                      <div className="description-block border-right">
                        <span className="description-percentage text-warning">
                          <i className="fas fa-caret-left" /> 0%
                        </span>
                        <h5 className="description-header">$10,390.90</h5>
                        <span className="description-text">TOTAL COST</span>
                      </div>
                      {/* /.description-block */}
                    </div>
                    {/* /.col */}
                    <div className="col-sm-3 col-6">
                      <div className="description-block border-right">
                        <span className="description-percentage text-success">
                          <i className="fas fa-caret-up" /> 20%
                        </span>
                        <h5 className="description-header">$24,813.53</h5>
                        <span className="description-text">TOTAL PROFIT</span>
                      </div>
                      {/* /.description-block */}
                    </div>
                    {/* /.col */}
                    <div className="col-sm-3 col-6">
                      <div className="description-block">
                        <span className="description-percentage text-danger">
                          <i className="fas fa-caret-down" /> 18%
                        </span>
                        <h5 className="description-header">1200</h5>
                        <span className="description-text">
                          GOAL COMPLETIONS
                        </span>
                      </div>
                      {/* /.description-block */}
                    </div>
                  </div>
                  {/* /.row */}
                </div>
                {/* /.card-footer */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
            <div className="col-md-1"></div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Welcome;
