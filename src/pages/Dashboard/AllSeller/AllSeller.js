import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import toast from 'react-hot-toast';

const AllSeller = () => {


    const [deletingSeller, setDeletingSeller] = useState(null)

    const closeModal = () => {
        setDeletingSeller(null)
    }

    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['users', 'Seller'],
        queryFn: async () => {
            const res = await fetch('https://sis-buy-sell-server-side.vercel.app/users?role=Seller');
            const data = await res.json();
            return data;
        }
    });

    const handleDeleteSeller = (seller) => {
        fetch(`https://sis-buy-sell-server-side.vercel.app/users/${seller._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success('Seller Deleted Successfully')
                }
            })
    }


    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-3'>All Seller</h1>
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
                            sellers.map((seller, i) =>
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{seller.name}</td>
                                    <td>{seller.email}</td>
                                    <td><button className='btn btn-xs btn-success'>{seller.role}</button></td>
                                    <td>
                                        <label onClick={() => setDeletingSeller(seller)} htmlFor="confirmation-modal" className="btn btn-xs btn-error">Delete</label>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingSeller && <ConfirmationModal
                    title={`You Want to Delete ${deletingSeller?.name}?`}
                    message={`If You Want to Delete ${deletingSeller?.name}. It Will Delete Forever `}
                    successAction={handleDeleteSeller}
                    modalData={deletingSeller}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default AllSeller;