import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';

const User = () => {
    const [user, setUser]= useState([])

useEffect(() => {
    axios.get('http://localhost:5000/user')
    .then(res => setUser(res.data))
    .catch(err => console.log(err))
}, [])

    const handleDelete = async (id) => {
        try{
            await axios.delete('http://localhost:5000/user/'+id)
            //after successful deletion
            window.location.reload()
            //else catch the error
        }catch(err){
            console.log(err)
        }

    }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
        <div className='p-3 w-75 rounded bg-white'>
            <p>The table below is a list of all our registered users. WE appreciate your interest in registering with us and we are very delighted to have you as aour clients. </p>
            <h2>REACT CRUD APP</h2>
            <Link to={`/register`} className='btn btn-success'>ADD +</Link>
            <Table response="md">
                <thead>
                    <tr>
                       <th>Name</th>
                       <th>Phone</th>
                       <th>Email</th>
                       <th>Password</th>
                       <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((data, i) => (
                            <tr key={i}>
                               <td>{data.name}</td>
                               <td>{data.phone}</td>
                               <td>{data.email}</td>
                               <td>{data.password}</td>
                               <td>
                                <Link to={`update/${data.id}`} className='btn btn-primary' style={{marginRight:20}}>Update</Link>
                                <button className='btn btn-danger' onClick={ e => handleDelete(data.id)}>Delete</button>
                               </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    </div>
  )
}

export default User