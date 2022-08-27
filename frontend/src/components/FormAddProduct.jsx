import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/products", {
        name: name,
        price: price,
      });
      // console.log(res);
      navigate("/products", { state: { msg: res.data.msg } });
      console.log(res);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        setMsg(error.response.data);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Product</h1>
      <h2 className="subtitle">Add New Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveProduct}>
              {msg === "" ? (
                ""
              ) : (
                <div className="notification is-danger">
                  <button
                    onClick={(e) => {
                      setMsg("");
                    }}
                    className="delete"
                  ></button>
                  <p className="has-text-centered">{msg}</p>
                </div>
              )}
              <div className="field">
                <label className="label">Product Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;
