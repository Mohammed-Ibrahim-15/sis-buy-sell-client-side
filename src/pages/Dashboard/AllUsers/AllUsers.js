import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import toast from 'react-hot-toast';

const AllUsers = () => {


    const [deletingBuyer, setDeletingBuyer] = useState(null)

    const closeModal = () => {
        setDeletingBuyer(null)
    }

    const { data: buyers = [], refetch } = useQuery({
        queryKey: ['users', 'Buyer'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users?role=Buyer');
            const data = await res.json();
            return data;
        }
    });


    const handleDeleteBuyer = (buyer) => {
        fetch(`http://localhost:5000/users/${buyer._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success('Buyer Deleted Successfully')
                }
            })
    }

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
            <h1 className='text-3xl font-bold text-center my-3'>All Buyer</h1>
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
                                    <td>
                                        <label onClick={() => setDeletingBuyer(buyer)} htmlFor="confirmation-modal" className="btn btn-xs btn-error">Delete</label>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingBuyer && <ConfirmationModal
                    title={`You Want to Delete ${deletingBuyer?.name}?`}
                    message={`If You Want to Delete ${deletingBuyer?.name}. It Will Delete Forever `}
                    successAction={handleDeleteBuyer}
                    modalData={deletingBuyer}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default AllUsers;