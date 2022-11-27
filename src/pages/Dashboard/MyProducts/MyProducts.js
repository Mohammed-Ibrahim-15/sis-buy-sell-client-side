import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query'


const MyProducts = () => {
    const { user } = useContext(AuthContext)
    console.log(user)

    const url = `http://localhost:5000/categories?seller_name=${user.displayName}`;

    const { data: products = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-3'>My Products</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Title</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products.map((product, i) =>
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-16 rounded">
                                                <img src={product?.img} alt="Tailwind-CSS-Avatar-component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>${product?.resale_price}</td>
                                    <td ><button className='btn btn-xs btn-success'>Available</button></td>
                                    <td><button className='btn btn-xs btn-error'>Delete</button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;