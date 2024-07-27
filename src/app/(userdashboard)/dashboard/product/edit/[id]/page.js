
"use client"
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';
import { createProduct, showProduct } from '../../../../../../redux/features/productDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'next/navigation';

const UpdateProduct = () => {

    const [product, setProduct] = useState({});
    const dropzoneRef = useRef(null);
    const [productImage, setProductImage] = useState([]);
    const dispatch = useDispatch();

    const temUser = localStorage.getItem('user');
    const userid = JSON.parse(temUser)
    const params = useParams()

    const {products} = useSelector((state) => state.products);

    const singleProduct = products.filter(item => item.id == params.id ? item : "")[0]
    console.log(singleProduct)

    useEffect(() => {
        dispatch(showProduct(userid.id))
    }, [])



    useEffect(() => {
        // Initialize Dropzone
        const dz = new Dropzone(dropzoneRef.current, {
            url: 'http://127.0.0.1:8000/api/upload-images', // Change this to your upload endpoint
            maxFilesize: 10, // MB
            acceptedFiles: 'image/*',
            autoProcessQueue: true,
            uploadMultiple: true,
            addRemoveLinks: true,
            parallelUploads: 10,
            init: function () {
                this.on("success", function (file, response) {
                    console.log("File uploaded successfully");
                    setProductImage(prevImages => {
                        const newImages = response.name.filter(item => !prevImages.includes(item));
                        return [...prevImages, ...newImages];
                    });
                    // console.log(ProductImage)
                });
                this.on("error", function (file, response) {
                    console.log("File upload error");
                });
            }
        });

        // Cleanup Dropzone on component unmount
        return () => {
            dz.destroy();
        };
    }, []);

    const getProduct = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        product.images = productImage
        product.thumbnail = productImage.slice(1)[0]
        product.vendor_id = userid.id
        dispatch(createProduct(product))
        console.log(product)
    }

    return (
        <div className='container-fluid'>
            <ToastContainer />
            <div className="d-flex justify-content-between py-4">
                <h2>Create Product</h2>
                <Link href='/dashboard/product'>
                    <button className='btn btn-warning'>Manage Product</button>
                </Link>
            </div>

            <div className='row'>

                <div className='col-lg-12'>
                    <form onSubmit={handleSubmit}>
                        <div className="row pb-3">

                            <div class="col-lg-6 py-2">
                                <label>Product Name</label>
                                <input required type="text" class="form-control" name="name" placeholder="Product Name" value={singleProduct?.name} onChange={getProduct} />
                            </div>

                            <div class="col-lg-3 py-2">
                                <label>Category</label>
                                <input required type="text" class="form-control" name="category" placeholder="Category" value={singleProduct?.Category} onChange={getProduct} />
                            </div>

                            <div class="col-lg-3 py-2">
                                <label>Sub Category</label>
                                <input required type="text" class="form-control" name="subcategory" placeholder="Subcategory" value={singleProduct?.subcategory} onChange={getProduct} />
                            </div>

                            <div class="col-lg-3 py-2">
                                <label>Product Code </label>
                                <input required type="text" class="form-control" name="code" placeholder="Product Code" value={singleProduct?.code} onChange={getProduct} />
                            </div>

                            <div class="col-lg-3 py-2">
                                <label>Product Tags </label>
                                <input required type="text" class="form-control" name="tags" placeholder="Product Tags" value={singleProduct?.tags} onChange={getProduct} />
                            </div>
                            <div class="col-lg-3 py-2">
                                <label>Purchase Price</label>
                                <input required type="text" class="form-control" name="purchase_price" placeholder="Purchase Price" value={singleProduct?.purchase_price} onChange={getProduct} />
                            </div>

                            <div class="col-lg-3 py-2">
                                <label>Selling Price</label>
                                <input required type="text" class="form-control" name="selling_price" placeholder="Selling Price" value={singleProduct?.selling_price} onChange={getProduct} />
                            </div>

                            <div class="col-lg-3 py-2">
                                <label>Discount Price</label>
                                <input required type="text" class="form-control" name="discount_price" placeholder="Discount Price" value={singleProduct?.discount_price} onChange={getProduct} />
                            </div>

                            <div class="col-lg-3 py-2">
                                <label>Stock Quantity</label>
                                <input required type="text" class="form-control" name="stock_quantity" placeholder="Stock Quantity" value={singleProduct?.stock_quantity} onChange={getProduct} />
                            </div>

                            <div class="col-lg-12 py-2">
                                <label>Description</label>
                                <textarea name="description" class="form-control" onChange={getProduct} value={singleProduct?.description}></textarea>
                            </div>

                            <div class="col-lg-12 py-2">
                                <label>Thumbnail</label>
                                <div ref={dropzoneRef} className="dropzone"></div>
                            </div>


                        </div>

                        <button type="submit" class="btn btn-warning">
                            Submit
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;