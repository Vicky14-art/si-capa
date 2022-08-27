import './Login2.css'
import logo from '../image/menarini1.jpg'
import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

function Login2() {
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
    <>

        <div className='mt-5 body-login'>
        <div className="container-login bg-white" id="container">
            <div className="form-container sign-up-container">
                <h1 className='login'>Create Account</h1>
                <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f" /></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g" /></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in" /></a>
                </div>
            <form className='form-login' onSubmit={Auth}>
                <span className='login'>or use your email for registration</span>
                <input type="text" placeholder="Name" className='text-blue'/>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className='btn-login' type='submit'>{isLoading ? "Loading" : "Login"} </button>
            </form>
            </div>
            <div className="form-container sign-in-container">
            <form className='form-login' onSubmit={Auth}>
                <h1 className='login'>Sign in</h1>
                <div className="social-container">
                    {/* <a href="#" className="social"><i className="fab fa-facebook-f" /></a>
                    <a href="#" className="social"><i className="fab fa-google-plus-g" /></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in" /></a> */}
                </div>
                <span className='login'>use your account</span>
                <input className='login' type="email" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <input className='login' type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                <a href="#">Forgot your password?</a>
                <button className='btn-login' type='submit'>{isLoading ? "Loading ..." : "Sign In"}</button>
            </form>
            </div>
            <div className="overlay-container">
            <div className="overlay">
            <img src={logo} className='logo' alt="" srcset="" />
                {/* <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" id="signIn">Sign In</button>
                </div> */}
                {/* <div className="overlay-panel overlay-right">
                <h1>Welcome Back!</h1>
                <div style={{color:'black', backgroundColor: '#ffffff', borderRadius:11, opacity: 0.6 }}>
                <p>"Powerful things happen when your start putting in work to achieve your goals."</p>
                </div>
                </div> */}
            </div>  
            </div>
        </div>
        <footer>
            {/* <p>
            Created with <i className="fa fa-heart" /> by
            <a target="_blank" href="https://florin-pop.com">Florin Pop</a>
            - Read how I created this and how you can join the challenge
            <a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
            </p> */}
        </footer>
        </div>
    </>
  )
}

export default Login2


