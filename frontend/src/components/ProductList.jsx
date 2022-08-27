import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoBrush, IoTrashSharp, IoAddOutline } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");
  const location = useLocation();

  useEffect(() => {
    getProduct();
    if (location.state === null) {
      setMsg("");
    } else {
      setMsg(location.state.msg);
    }
  }, []);

  // console.log(location);
  const getProduct = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/products/${productId}`);
        Swal.fire("Deleted!", "Your Product has been deleted.", "success");
      }
      getProduct();
    });
  };

  return (
    <div>
      {msg ? (
        <div className="notification is-success">
          <button
            onClick={() => {
              setMsg("");
            }}
            className="delete"
          ></button>
          {msg}
        </div>
      ) : (
        ""
      )}
      <h1 className="title">Products</h1>
      <h2 className="subtitle">List of Products</h2>
      <Link className="button is-primary mb-2" to="/products/add">
        Add New <IoAddOutline />
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => {
            return (
              <tr key={product.uuid}>
                <td>{i + 1}</td>
                <td>{product.name} </td>
                <td>USD {product.price} </td>
                <td>{product.name}</td>
                <td>
                  <Link
                    to={`/products/edit/${product.uuid}`}
                    className="button is-small is-success is-light"
                  >
                    <span className="is-">
                      <IoBrush />
                    </span>{" "}
                    Edit
                  </Link>
                  <button
                    onClick={(e) => deleteProduct(product.uuid)}
                    className="button is-small is-warning is-light"
                  >
                    <IoTrashSharp />
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
