import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query'

const MyBooking = () => {
    const { user } = useContext(AuthContext)

    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    const { data: bookings = [] } = useQuery({
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
            <h1 className='text-3xl mb-6'>My Booking</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            bookings.map((booking, i) =>
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-16 rounded">
                                                <img src={booking?.img} alt="Tailwind-CSS-Avatar-component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{booking?.phoneName}</td>
                                    <td>{booking?.resalePrice}</td>
                                    <td>Pay</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBooking;