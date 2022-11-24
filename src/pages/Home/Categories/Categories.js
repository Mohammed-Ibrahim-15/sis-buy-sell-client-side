import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoriesDetails from '../CategoryDetails/CategoriesDetails';

const Categories = () => {
    const category = useLoaderData()
    // console.log(category)
    return (
        <div className='max-w-screen-xl mx-auto'>
            <h1 className='text-center text-4xl font-bold mt-4'>All Phones</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12'>
                {
                    category.map(cat => <CategoriesDetails
                        key={cat._id}
                        cat={cat}
                    ></CategoriesDetails>)
                }
            </div>
        </div>
    );
};

export default Categories;