import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Main.css';

const Main = () => {
    return (
        <div className=''>
            <nav className='nav-bar'>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;