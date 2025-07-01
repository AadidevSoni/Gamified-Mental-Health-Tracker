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
  const [loadingScreen, setLoadingScreen] = useState(true);

  const [editableUserId,setEditableUseId] = useState(null);
  const [editableUsername,setEditableUsername] = useState('');
  const [editableUserEmail,setEditableUserEmail] = useState('');

  useEffect(() => {
    refetch()
  }, [refetch]);

  useEffect(() => {
      const timer = setTimeout(() => {
        setLoadingScreen(false);
      }, 1000);
  
      return () => clearTimeout(timer);
    }, []);

    const deleteHandler = async(id) => {
      if(window.confirm("Are you sure you want to delete the USER?")){
        try {
          await deleteUser(id);
        } catch (error) {
          toast.error(error.data.message || error.error);
        }
      }
    }

    const toggleEdit = (id,username,email) => {
      setEditableUseId(id);
      setEditableUsername(username);
      setEditableUserEmail(email);
    }

    const updateHandler = async(id) => {
      try {

        await updateUser({
          userId: id,
          username: editableUsername,
          email: editableUserEmail
        })

        setEditableUseId(null);
        refetch()

      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    }

  return <div className='userlistContainer'>
    {loadingScreen && (
      <div className="initial-loading-screen">
        <div className="loader-circle"></div>
        <p className="loading-text">Loading User List...</p>
      </div>
    )}    

    <div className="video-wrapper">
      <video
        autoPlay
        muted
        loop
        className="video-background"
        playsInline
      >
        <source src="/videos/frog7.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay"></div>
    </div>

    <h1>
      {isLoading ? (<Loader />):error ? (
        <Message variant={danger}>
          {error?.data.message || error.message}
        </Message>) : (
        <div className='userTableContainer'>
          <table className='userlistTable'>
            <thead>
              <tr>
                <th className='thStyle'>USER ID</th>
                <th className='thStyle'>USERNAME</th>
                <th className='thStyle'>EMAIL ID</th>
                <th className='thStyle'>ADMIN</th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td className='tdStyle'>
                    {user._id}
                  </td>

                    <td className='tdStyle'>
                      {editableUserId === user._id ? (
                        <div className='userlistEditableId'>
                          <input type="text" value={editableUsername} onChange={e => setEditableUsername(e.target.value)} className='inputEditUsername'/>
                          <button onClick={() => updateHandler(user._id)} className='userlistButton'>
                            <FaCheck />
                          </button>
                        </div>
                      ):(
                        <div className="userlistEditableId">
                          {user.username} {" "}
                          <button className="editButton" onClick={() => toggleEdit(user._id,user.username,user.email)}>
                            <FaEdit className='listEdit' />
                          </button>
                        </div>
                      )}
                  </td>

                  <td className="tdStyle">
                    {editableUserId === user._id ? (
                      <div className="userlistEditableId">
                        <input type="text" value={editableUserEmail} onChange={e => setEditableUserEmail(e.target.value)} className='inputEditUsername' />
                        <button onClick={() => updateHandler(user._id)} className='userlistButton'>
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="userlistEditableId">
                        <p>
                          {user.email}
                        </p>
                        <button className="editButton" onClick={() => toggleEdit(user._id,user.username,user.email)}>
                          <FaEdit className='listEdit' />
                        </button>
                      </div>
                    )}
                  </td>
                    
                  <td className="tdStyle">
                    {user.isAdmin ? (
                      <FaCheck style={{color: "green"}} />
                    ) : (
                      <FaTimes style={{color: "red"}} />
                    )}
                  </td>

                  <td className="tdStyle">
                    {!user.isAdmin && (
                      <div className="userlistEditableId">
                        <button onClick={() => deleteHandler(user._id)} className="deleteButton">
                          <FaTrash />
                        </button>
                      </div>
                    )}
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