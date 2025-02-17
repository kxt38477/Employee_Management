import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeDetail = () => {
  const [detail, setDetail] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()

  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('http://localhost:3000/employee/detail/' + id)
      .then(result => {
        setDetail(result.data.Result[0])
      })
      .catch(err => console.log(err))
  }, [])
  const log_out = () => {
    axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if (result.data.Status) {
          alert('登出成功')
          navigate('/')
        }
      })
      .catch(err => console.log(err))
  }



  return (
    <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
      <img src={'http://localhost:3000/Images/' + detail.image} alt=""/>
      <h3>Name:{detail.name}</h3>
      <h3>Email:{detail.email}</h3>
      <h3>Salary:{detail.salary}</h3>
      <div>
        <button className='btn btn-danger mx-1' onClick={log_out}>Log Out</button>
      </div>
    </div>
  )
}

export default EmployeeDetail