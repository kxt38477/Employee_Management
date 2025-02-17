import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Start = () => {
  const navigate = useNavigate();
  // 使用者驗證
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('http://localhost:3000/verify')
      .then(result => {
        if (result.data.Status) {
          if (result.data.role == 'admin') {
            navigate('/dashboard')
          } else {
            console.log(result.data.role );
            
            navigate('/employee_detail/' + result.data.id)
          }
        }
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded w-25 border loginForm'>
        <h2>Login As</h2>
        <div className='d-flex justify-content-between mt-5 mb-2'>
          <Link to='/employee_login' className='btn btn-primary'>Employee</Link>
          <Link to='/adminlogin' className='btn btn-success'>Admin</Link>
        </div>
      </div>
    </div>
  )
}

export default Start