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
                <div className='text-admin-panel'>Edit achievement</div>
                <div className='text-admin-panel'>Delete achievement</div>
                <Link to="/users">
                    <div className='text-admin-panel' href='/users'>List all users</div>
                </Link>
            </div>
        </div>
    );
}