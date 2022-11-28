import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useSeller from '../../hooks/useSeller';
import Navbar from '../Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email)

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">

                    <Outlet></Outlet>

                </div>
                <div className="drawer-side border-2">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">


                        {
                            isAdmin &&
                            <>
                                <li className='font-bold'><Link to='/dashboard/allUsers'>All Buyer</Link></li>
                                <li className='font-bold'><Link to='/dashboard/allSeller'>All Seller</Link></li>
                                <li className='font-bold'><Link to='/dashboard/reportedItems'>Reported Items</Link></li>
                            </>


                        }
                        {
                            isSeller &&
                            <>
                                <li className='font-bold'><Link to='/dashboard/addProduct'>Add Product</Link></li>
                                <li className='font-bold'><Link to='/dashboard/myProduct'>My Products</Link></li>
                                <li className='font-bold'><Link to='/dashboard/myBuyers'>My Buyers</Link></li>
                            </>
                        }
                        {
                            !isAdmin && !isSeller && <li className='font-bold'><Link to='/dashboard/myBooking'>My Booking</Link></li>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;