import React from 'react'
import {useState,useEffect} from 'react';
import {FaTrash,FaEdit,FaCheck,FaTimes} from 'react-icons/fa';
import Loader from '../../components/Loader';
import {toast} from 'react-toastify';
import {useGetUsersQuery,useDeleteUserMutation,useUpdateUserMutation} from '../../pages/redux/api/userApiSlice';
import './UserList.css';
import Message from '../../components/Message'

const UserList = () => {

  const {data: users,refetch,isLoading,error} = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId,setEditableUseId] = useState(null);
  const [editableUsername,setEditableUsername] = useState('');
  const [editableUserEmail,setEditableUserEmail] = useState('');

  useEffect(() => {
    refetch()
  }, [refetch]);

  return <div className='userlistContainer'>
    <h1>
      {isLoading ? (<Loader />):error ? (
        <Message variant={danger}>
          {error?.data.message || error.message}
        </Message>) : (
        <div className='userTableContainer'>
          <table className='userlistTable'>
            <thead>
              <tr>
                <th className='thStyle'>ID</th>
                <th className='thStyle'>NAME</th>
                <th className='thStyle'>EMAIL</th>
                <th className='thStyle'>ADMIN</th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td className='tdStyle'>
                    {user._id}

                    <td className='tdStyle'>
                      {editableUserId === user._id ? (
                        <div className='userlistEditableId'>
                          <input type="text" value={editableUsername} onChange={e => setEditableUsername(e.target.value)} className='inputEditUsername'/>
                          <button onClick={() => updateHandler(user._id)} className='userlistButton'></button>
                        </div>
                      )}
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </h1>
  </div>
  
}

export default UserList