import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Employee = () => {

  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/total_employee')
      .then(result => {
        setEmployee(result.data.Result)
      })
      .catch(err => console.log(err)
      )
  }, [])

  const delete_employee = (id) => {
    axios.delete('http://localhost:3000/auth/delete_employee/' + id)
      .then(result => {
        if (result.data.Status) {
          alert('刪除成功');
          window.location.reload();
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log('出現錯誤'))
  }

  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
        <h3>類別名稱</h3>
      </div>
      <Link to='/dashboard/add_employee' className='btn btn-success'>新增雇員</Link>
      <div className='mt-3'>
        <table className='table profile_table'>
          <thead>
            <tr>
              {/* <th>編號</th> */}
              <th>大頭貼</th>
              <th>姓名</th>
              <th>電子郵件</th>
              <th>薪資</th>
              <th>職級</th>
              <th>調整</th>
            </tr>
          </thead>
          <tbody>
            {employee.length > 0 ? (employee.map(emp => (
              <tr>
                {/* <td>{emp.id}</td> */}
                <td><img src={`http://localhost:3000/Images/` + emp.image} className='employee_image' alt="" srcset="" /> </td>
                <td>{emp.employee_name}</td>
                <td>{emp.email}</td>
                <td>${emp.salary}</td>
                <td>{emp.category_name}</td>
                <td>
                  <Link to={'/dashboard/edit_employee/' + emp.id} className='btn btn-info mx-1'>編輯</Link>
                  <button className='btn btn-dark mx-1' onClick={() => delete_employee(emp.id)}>刪除</button>
                </td>
              </tr>
            ))) : (
              <tr>
                <td colSpan="6" className="text-center">目前沒有員工資料</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee