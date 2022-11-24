import React from 'react';
import { Link } from 'react-router-dom';

const BrandName = ({ name }) => {
    return (
        <div className=''>
            <Link to={`/categories/${name}`}> <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">{name}</button></Link>
        </div>
    );
};

export default BrandName;