import React from 'react';
import { useQuery } from '@tanstack/react-query'

const AllUsers = () => {
    const { data: buyers = [] } = useQuery({
        queryKey: ['users', 'Buyer'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users?role=Buyer');
            const data = await res.json();
            return data;
        }
    });

    // const handleAdmin = id => {
    //     fetch(`http://localhost:5000/users/admin/${id}`, {
    //         method: 'PUT',
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //         })
    // }

    return (
        <div>
            <h1 className='text-3xl'>All Buyer</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers?.map((buyer, i) =>
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{buyer.name}</td>
                                    <td>{buyer.email}</td>
                                    <td><button className='btn btn-xs btn-success'>{buyer.role}</button></td>
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

export default AllUsers;