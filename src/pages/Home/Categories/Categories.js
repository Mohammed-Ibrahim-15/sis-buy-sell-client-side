import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoriesDetails from '../CategoryDetails/CategoriesDetails';

const Categories = ({ name }) => {
    const category = useLoaderData()
    // console.log(category)
    return (
        <div>
            <h1>All Phones</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
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