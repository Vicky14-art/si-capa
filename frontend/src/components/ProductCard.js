import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'

const ProductCard = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async() => {
        const response = await axios.get("http://localhost:5000/products")
        setProducts(response.data)
    }

    useEffect(() => {
        getAllProducts()
    }, []);

    console.log(products);

  return (
    <Fragment>
    <div className="row justify-content-center">
    <div className="col-md-11">
        <div className="card mt-5 ms-1 me-1">
            <div className="card-header">
                <h1 className="card-title">List Our Product</h1>
            </div>
            <div className="row">
                <div className="card-body">
                    <div className="row">
                    {/* loop */}
                    {
                        products.map((product) => (
                        <div className="col-md-12 col-lg-6 col-xl-4">
                            <div className="card mb-2 bg-gradient-dark">
                                <img className="card-img-top" src={product.url} style={{width:'auto', height:'215px'  }} alt="Dist Photo 1" />
                                <div className="card-img-overlay d-flex flex-column justify-content-end">
                                    <h5 className="card-title text-primary text-white">Card Title</h5>
                                    <p className="card-text text-white pb-2 pt-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor.</p>
                                    <a href="#" className="text-white">Last update 2 mins ago</a>
                                </div>
                            </div>
                        </div>
                        ))
                    }
                        <div className="col-md-12 col-lg-6 col-xl-4">
                            <div className="card mb-2 bg-gradient-dark">
                                <img className="card-img-top" src="../dist/img/photo1.png" alt="Dist Photo 1" />
                                <div className="card-img-overlay d-flex flex-column justify-content-end">
                                    <h5 className="card-title text-primary text-white">Card Title</h5>
                                    <p className="card-text text-white pb-2 pt-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor.</p>
                                    <a href="#" className="text-white">Last update 2 mins ago</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-4">
                            <div className="card mb-2 bg-gradient-dark">
                                <img className="card-img-top" src="../dist/img/photo1.png" alt="Dist Photo 1" />
                                <div className="card-img-overlay d-flex flex-column justify-content-end">
                                    <h5 className="card-title text-primary text-white">Card Title</h5>
                                    <p className="card-text text-white pb-2 pt-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor.</p>
                                    <a href="#" className="text-white">Last update 2 mins ago</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </Fragment>
  )
}

export default ProductCard