import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import './Login.css'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(
      LoginUser({
        email,
        password,
      })
    );
  };

  return (
    <Fragment>
    <body>
      <div className="signin">
        <div className="back-img">
          <div className="sign-in-text">
            <h2 className="active">Sign In</h2>
          </div>{/*/.sign-in-text*/}
          <div className="layer">
          </div>{/*/.layer*/}
          <p className="point">▲</p>
        </div>{/*/.back-img*/}
        <div className="form-section">
          <form onSubmit={Auth}>
            {/*Email*/}
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input 
              type="email" 
              className="form-control" 
              id="exampleInputEmail1" 
              placeholder="Enter email" 
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
              />
            </div>
            <br />
            {/*Password*/}
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input 
              type="password" 
              name="password" 
              className="form-control" 
              id="exampleInputPassword1" 
              placeholder="Password" 
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              />
            </div>
            <br />
            {/*CheckBox*/}
           <div className="form-group mb-0">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" name="terms" className="custom-control-input" id="exampleCheck1" />
              <label className="custom-control-label" htmlFor="exampleCheck1">I agree to the <a href="#">terms of service</a>.</label>
            </div>
          </div>
          <div className="d-grid gap-2">
          <button type="submit" className="sign-in-btn btn btn-primary mt-5">{isLoading ? "Loading" : "Login"} </button>
          </div>
          </form>
        </div>{/*/.form-section*/}
      </div>{/*/.signin*/}
    </body>
    </Fragment>
    
  );
};

export default Login;
