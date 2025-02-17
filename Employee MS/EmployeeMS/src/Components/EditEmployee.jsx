import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    password: '',
    salary: '',
    category_id: '',
    image: ''
  })
  const [category, setCategory] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        setCategory(result.data.Result)
      })
      .catch(err => console.log(err)
      )
    axios.get('http://localhost:3000/auth/employee/' + id)
      .then(result => {
        setEmployee({
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          salary: result.data.Result[0].salary,
          category_id: result.data.Result[0].category_id
        });
      })
      .catch(err => console.log(err)
      )
  }, [])

  const form_submit = (event) => {
    event.preventDefault();
    axios.put('http://localhost:3000/auth/update_employee/' + id, employee)
      .then(result => {
        if (result.data.Status) {
          alert('編輯員工資料完成')
          navigate('/dashboard/employee')
        } else {
          alert('更新資料發生錯誤，請稍後再試')
        }
       
      })
      .catch(err => console.log(err)
      )

  }
return (
  <div className='d-flex flex-column align-items-center pt-4'>
    <h2>編輯雇用員工資料</h2>
    <form className="row g-3 w-50" onSubmit={form_submit}>
      <div className="col-12">
        <label for="inputName" className="form-label">
          名稱：
        </label>
        <input
          type="text"
          className="form-control"
          id="inputName"
          placeholder='欲修改名稱'
          value={employee.name}
          autoComplete='off'
          onChange={e => setEmployee({ ...employee, name: e.target.value })} />
      </div>
      <div className="col-12">
        <label for="inputEmail4" className="form-label">
          信箱：
        </label>
        <input
          type="email"
          className="form-control"
          id="inputEmail4"
          placeholder='Enter Email'
          value={employee.email}
          autoComplete='off'
          onChange={e => setEmployee({ ...employee, email: e.target.value })} />
      </div>
      <div className="col-12">
        <label for="inputSalary" className="form-label">
          薪資
        </label>
        <input
          type="text"
          className="form-control"
          id="inputSalary"
          placeholder="Enter Salary"
          value={employee.salary}
          autoComplete='off'
          onChange={e => setEmployee({ ...employee, salary: e.target.value })} />
      </div>
      <div className="col-12">
        <label for="category" className="form-label">
          職級
        </label>
        <select
          onChange={e => setEmployee({ ...employee, category_id: e.target.value })}
          name="category"
          className='form-select'
          id="category">
          <option value="">請選擇</option>
          {category.map(cate => (
            <option value={cate.id}>{cate.name}</option>
          ))}
        </select>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">編輯員工</button>
      </div>
    </form>
  </div>
)
}

export default EditEmployee