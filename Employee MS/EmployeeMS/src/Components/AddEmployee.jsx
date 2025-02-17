import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
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
      .catch(err => console.log('err')
      )
  }, [])

  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData() //有檔案上傳時使用
    formData.append("name", employee.name)
    formData.append("email", employee.email)
    formData.append("password", employee.password)
    formData.append("salary", employee.salary)
    formData.append("category_id", employee.category_id)
    formData.append("image", employee.image)
    
    if (Object.values(employee).some(value => !value)) {
      alert('欄位不能為空！');
      return
    }
    axios.defaults.withCredentials = true ;
    //axios.post(url, data, config)
    axios.post('http://localhost:3000/auth/add_employee', formData)
      .then(result => {
        if (result.data.Status) {
          alert('新增成功')
          navigate('/dashboard/employee')
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>新增雇用員工</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label for="inputName" className="form-label">
            名稱
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder='Enter Name'
            autoComplete='off'
            onChange={e => setEmployee({ ...employee, name: e.target.value })} />
        </div>
        <div className="col-12">
          <label for="inputEmail4" className="form-label">
            信箱
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder='Enter Email'
            autoComplete='off'
            onChange={e => setEmployee({ ...employee, email: e.target.value })} />
        </div>
        <div className="col-12">
          <label for="inputPassword4" className="form-label">
            密碼
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            placeholder='Enter Password'
            onChange={e => setEmployee({ ...employee, password: e.target.value })} />
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
        <div className="col-12 mb-3">
          <label className="form-label" for="inputGroupFile01">
            選擇圖片
          </label>
          <input
            type="file"
            className="form-control"
            name='image'
            id="inputGroupFile01"
            onChange={e => setEmployee({ ...employee, image: e.target.files[0] })} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  )
}

export default AddEmployee