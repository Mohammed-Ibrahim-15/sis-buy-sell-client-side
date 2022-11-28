import React, { useContext } from 'react';
import { FaDollyFlatbed } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch(err => console.error(err))
    }


    const menuList = <>
        <li className='font-bold'><Link to='/blog'>Blog</Link></li>
        {
            user?.uid ?
                <>
                    <li className='font-bold'><Link to='/dashboard'>Dashboard</Link></li>
                    <li className='font-bold'><button onClick={handleLogout}>Logout</button>  </li>
                    <li><span className='text-xs italic text-gray-500'>{user?.email}</span> </li>

                </>
                :
                <li className='font-bold'><Link className='' to='/login'>Login</Link></li>

        }

    </>
    return (
        <div>
            <div className="navbar bg-sky-300 flex justify-between">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuList}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl"> <FaDollyFlatbed /> <span className='ml-2 font-bold'>SIS Buy-Sell</span></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuList}
                    </ul>
                </div>
                <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>

            </div>
        </div>
    );
};

export default Navbar;