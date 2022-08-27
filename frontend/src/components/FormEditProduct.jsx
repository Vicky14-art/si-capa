import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FormEditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();

    useEffect(() => {
        const getProductById = async() => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                setName(response.data.name)
                setPrice(response.data.price)
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data)
                }
            }
        }
        getProductById();
    }, [id]);


  const updateProduct = async(e) =>{

    if (price === '') {
        setMsg("Jangan Dikosongkan")
    }else{
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/products/${id}`,{
                name:name,
                price:price
            })
            navigate("/products")
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data)
            }
        }
    }
  }



  return (
    <div>
      <h1 className="title">Product</h1>
      <h2 className="subtitle">Edit Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form>
            {msg === '' ? '' : 
            <div className="notification is-danger">
                <button onClick={e => {setMsg("")}} className="delete"></button>
                <p className="has-text-centered">{msg}</p>
            </div>
            }
              <div className="field">
                <label className="label">Product Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Product Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
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
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    value={price}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="button" onClick={updateProduct} className="button is-success">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduct;
