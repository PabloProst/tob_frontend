import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../services/apiCalls';
import './AllUsers.css';
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';

export const AllUsers = () => {
  const rdxUserData = useSelector(userData);

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers(rdxUserData.credentials.token)
        .then((response) => {
          console.log(response.data.users);
          setUsers(response.data.users);
        })
        .catch((error) => console.log(error));
    }
  }, [users, rdxUserData.credentials.token]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="centered-container">
      <div className="users-design">
        {currentUsers.length > 0 ? (
          <>
            {currentUsers.map((user) => (
              <div className="users-div" key={user.id}>
                <div className='user-info'>ID: <span className='user-info-text'>{user.id}</span></div>
                <div className='user-info'>Name: <span className='user-info-text'>{user.name}</span></div>
                <div className='user-info'>Email: <span className='user-info-text'>{user.email}</span></div>
              </div>
            ))}
            <div className="pagination">
              {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
                (item, index) => (
                  <button
                    key={index}
                    className="pagination-button"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </>
        ) : (
          <div>Aún no han venido</div>
        )}
      </div>
    </div>
  );
};
