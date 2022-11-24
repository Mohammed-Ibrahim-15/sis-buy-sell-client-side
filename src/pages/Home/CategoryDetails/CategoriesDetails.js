import React from 'react';

const CategoriesDetails = ({ cat }) => {
    const { name, img, location, condition, description, mobile, month_of_use, original_price, purchase_year, resale_price, seller_name, post_time } = cat
    console.log(cat)
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={img} alt="Mobile" className="rounded-xl w-60 h-60" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>Description: {description} </p>
                    <p>Condition: {condition} </p>
                    <p>Location {location} </p>
                    <p>Month of Use: {month_of_use} /month </p>
                    <p>Purchase Year: {purchase_year}</p>
                    <p>Selling Price: ${resale_price} </p>
                    <p>Buying Price: ${original_price} </p>
                    <p>Seller Name: {seller_name} </p>
                    <p>Contact No: {mobile} </p>
                    <p>Post On: {post_time} </p>
                    <div className="card-actions">
                        <button className="btn btn-primary">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesDetails;