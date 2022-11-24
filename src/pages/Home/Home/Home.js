import React from 'react';
import Banner from '../Banner/Banner';
import Banner2 from '../Banner2/Banner2';
import BrandName from '../BrandName/BrandName';

const Home = () => {
    const brandName = [
        { id: 1, bName: 'Apple' },
        { id: 2, bName: 'Samsung' },
        { id: 3, bName: 'Oneplus' }
    ]

    return (
        <div className='max-w-screen-xl mx-auto'>
            <Banner></Banner>
            <h1 className='text-4xl font-bold text-center'>Category</h1>
            <div className='flex justify-evenly my-8'>
                {
                    brandName.map(b => <BrandName
                        key={b.id}
                        name={b.bName}
                    ></BrandName>)
                }
            </div>
            <Banner2></Banner2>
        </div>
    );
};

export default Home;