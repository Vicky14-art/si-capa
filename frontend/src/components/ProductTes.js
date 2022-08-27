//call product via reducer

import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getProducts, reset} from '../features/productSlice' 
//useDispatch adalah menjalankan function pada redux


const ProductTes = () => {
  const dispatch = useDispatch();
  const {products} = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  console.log(products);
    return (
<div>
    <select className="form-select" aria-label="Default select example">
      <option selected>Open this select menu</option>
      {
        products.map((product) => (
          <option value="1">{product.name}</option>
        ))
      }
      <option value="3">Three</option>
    </select>
</div>
  )
}

export default ProductTes