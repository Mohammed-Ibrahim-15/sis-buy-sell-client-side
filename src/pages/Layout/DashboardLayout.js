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
    console.log(user)
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">

                        {
                            !isAdmin && !isSeller && <li><Link to='/dashboard'>My Booking</Link></li>
                        }
                        {
                            isAdmin &&
                            <>
                                <li><Link to='/dashboard/allUsers'>All Buyer</Link></li>
                                <li><Link to='/dashboard/allSeller'>All Seller</Link></li>
                                <li><Link to='/dashboard/reportedItems'>Reported Items</Link></li>
                            </>


                        }
                        {
                            isSeller &&
                            <>
                                <li><Link to='/dashboard/addProduct'>Add Product</Link></li>
                                <li><Link to='/dashboard/myProduct'>My Products</Link></li>
                                <li><Link to='/dashboard/myBuyers'>My Buyers</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;