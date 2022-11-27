import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext)

    const { register, formState: { errors }, handleSubmit } = useForm()
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate()


    const handleAddProduct = (data) => {

        const img = data.img[0];
        const formData = new FormData();
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(imgData.data.url)

                    const product = {
                        seller_name: data.seller_name,
                        mobile: data.mobile,
                        name: data.name,
                        category: data.category,
                        condition: data.condition,
                        img: imgData.data.url,
                        location: data.location,
                        resale_price: data.resale_price,
                        original_price: data.original_price,
                        month_of_use: data.month_of_use,
                        purchase_year: data.purchase_year,
                        description: data.description
                    }

                    //    store to database
                    fetch('http://localhost:5000/categories', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.acknowledged) {
                                toast.success('Product Added Successfully')
                                navigate('/dashboard/myProduct')
                            }
                        })
                }
            })



    }

    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-3'>Add Product</h1>
            <div>
                <div className='flex justify-center items-center  my-6'>
                    <form onSubmit={handleSubmit(handleAddProduct)} className='border-2 border-sky-300 rounded-xl px-24 py-4'>

                        <div className="form-control w-full max-w-xs ">
                            <label className="label">
                                <span className="label-text">Seller Name</span>
                            </label>
                            <input type="text" defaultValue={user?.displayName} disabled className="input input-bordered input-primary w-full max-w-lg"  {...register("seller_name", { required: 'Seller Name is required' })} placeholder="Write seller name" />
                            {errors.seller_name && <p role='alert' className='text-red-600'>*{errors.seller_name?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Seller Phone No</span>
                            </label>
                            <input type="text" className="input input-bordered input-primary w-full max-w-xs"  {...register("mobile", { required: 'Seller Phone is required' })} placeholder="Write mobile number" />
                            {errors.mobile && <p role='alert' className='text-red-600'>*{errors.mobile?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Device Name</span>
                            </label>
                            <input type="text" className="input input-bordered input-primary w-full max-w-xs"  {...register("name", { required: 'Device Name is required' })} placeholder="Write device name" />
                            {errors.name && <p role='alert' className='text-red-600'>*{errors.name?.message}</p>}
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select {...register("category", { required: 'Category is required' })} name='category' className="select select-primary w-full max-w-xs">
                                <option>Apple</option>
                                <option>Oneplus</option>
                                <option>Samsung</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Condition</span>
                            </label>
                            <select {...register("condition", { required: 'Condition is required' })} name='condition' className="select select-primary w-full max-w-xs">
                                <option>Excellent</option>
                                <option>Good</option>
                                <option>Fair</option>
                            </select>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>
                            <input type="file" className="input input-bordered input-primary w-full max-w-xs"  {...register("img", { required: 'Image is required' })} placeholder="Image" />
                            {errors.img && <p role='alert' className='text-red-600'>*{errors.img?.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input type="text" className="input input-bordered input-primary w-full max-w-xs"  {...register("location", { required: 'Location is required' })} placeholder="Location" />
                            {errors.location && <p role='alert' className='text-red-600'>*{errors.location?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Resale Price</span>
                            </label>
                            <input type="text" className="input input-bordered input-primary w-full max-w-xs"  {...register("resale_price", { required: 'Resale Price is required' })} placeholder="Write your Resale Price" />
                            {errors.resale_price && <p role='alert' className='text-red-600'>*{errors.resale_price?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Buying Price</span>
                            </label>
                            <input type="text" className="input input-bordered input-primary w-full max-w-xs"  {...register("original_price", { required: 'Buying Price is required' })} placeholder="Write your Buying Price" />
                            {errors.original_price && <p role='alert' className='text-red-600'>*{errors.original_price?.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Month of Use</span>
                            </label>
                            <input type="text" className="input input-bordered input-primary w-full max-w-xs"  {...register("month_of_use", { required: 'Month of use is required' })} placeholder="Write your Month of Use" />
                            {errors.month_of_use && <p role='alert' className='text-red-600'>*{errors.month_of_use?.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Purchase Year</span>
                            </label>
                            <input type="text" className="input input-bordered input-primary w-full max-w-xs"  {...register("purchase_year", { required: 'Purchase year is required' })} placeholder="Write your Purchase Year" />
                            {errors.purchase_year && <p role='alert' className='text-red-600'>*{errors.purchase_year?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input type="text" className="input input-bordered input-primary w-full max-w-xs"  {...register("description", { required: 'Description is required' })} placeholder="Write your Description" />
                            {errors.description && <p role='alert' className='text-red-600'>*{errors.description?.message}</p>}
                        </div>


                        <input className='btn btn-primary w-full max-w-xs mt-4' value='Add Product' type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;