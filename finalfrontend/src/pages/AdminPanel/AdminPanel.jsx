import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPanel.css';

export const AdminPanel = () => {
    return (
        <div className='home-design'>
            <div className='ingame-container-admin'>
                <Link to='/newachievement'>
                    <div className='text-admin-panel'>Create new Achievement</div>
                </Link>
                <Link to='/editachievement'>
                    <div className='text-admin-panel'>Edit achievement</div>
                </Link>
                <Link to='/deleteachievement'>
                    <div className='text-admin-panel'>Delete achievement</div>
                </Link>
                <Link to="/users">
                    <div className='text-admin-panel' href='/users'>List all users</div>
                </Link>
            </div>
        </div>
    );
}