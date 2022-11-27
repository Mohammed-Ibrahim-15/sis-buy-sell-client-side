import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query'
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import toast from 'react-hot-toast';


const MyProducts = () => {

    const [deletingProduct, setDeletingProduct] = useState(null)

    const closeModal = () => {
        setDeletingProduct(null)
    }

    const { user } = useContext(AuthContext)

    const url = `http://localhost:5000/categories?seller_name=${user.displayName}`;

    const { data: products = [], refetch } = useQuery({
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
    });



    const handleDeleteProduct = (product) => {
        fetch(`http://localhost:5000/categories/${product._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success('Product Deleted Successfully')
                }
            })
    }


    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-3'>My Products</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Status</th>
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
                                    <td>{product?.name}</td>
                                    <td>${product?.resale_price}</td>
                                    <td ><button className='btn btn-xs btn-success'>Available</button></td>
                                    <td>
                                        <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-modal" className="btn btn-xs btn-error">Delete</label>

                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
            {
                deletingProduct && <ConfirmationModal
                    title={`You Want to Delete ${deletingProduct?.name}?`}
                    message={`If You Want to Delete ${deletingProduct?.name}. It Will Delete Forever `}
                    successAction={handleDeleteProduct}
                    modalData={deletingProduct}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }

        </div>
    );
};

export default MyProducts;