import React from 'react';
import { FaDollyFlatbed } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {

    const menuList = <>
        <li><Link to='/'>Item 1</Link></li>
        <li><Link to='/blog'>Blog</Link></li>
    </>
    return (
        <div>
            <div className="navbar bg-sky-300">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuList}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl"> <FaDollyFlatbed /> <span className='ml-2'>SIS Buy-Sell</span></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuList}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link className="btn">Get started</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;