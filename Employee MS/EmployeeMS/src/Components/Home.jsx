import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Home = () => {

  const [admin, setAdmin] = useState()
  const [empcount, setEmpcount] = useState()
  const [totalsalary,setTotalsalary] = useState()

  useEffect(() => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdmin(result.data.Result[0].count);         
        }
      })
      .catch(err => console.log(err))


    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        setEmpcount(result.data.Result[0].count)
        setTotalsalary(result.data.Result[0].salary)
      })
      .catch(err => console.log(err))
  }, [])



  return (
    <div>
      <div className='p-3 d-flex justify-content-between mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {admin}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {empcount} </h5>
          </div>
        </div>        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {totalsalary}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home