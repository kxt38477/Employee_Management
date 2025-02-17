import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
  const [category, setCategory] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        setCategory(result.data.Result)       
      })
      .catch(err => console.log(err)
      )
  }, [])
  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
        <h3>職級名稱</h3>
      </div>
      <Link to='/dashboard/add_category' className='btn btn-success'>新增類別</Link>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>編號</th>
              <th>職級</th>
            </tr>
          </thead>
          <tbody>
            {
              category.map(cate => (
                <tr>
                  <td>{cate.id}</td>
                  <td>{cate.name}</td>
                </tr>
              ))

            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category