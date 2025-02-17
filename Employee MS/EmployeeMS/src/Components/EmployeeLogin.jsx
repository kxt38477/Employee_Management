import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
    const [employee_login, setEmployeelogin] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/employee/login', employee_login)
            .then((result) => {
                if (result.data.Status) {
                    navigate('/employee_detail/' + result.data.id)
                }
            })
            .catch((err) => console.log(err))
    }


    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-danger'>
                    {error ? error : null}
                </div>
                <h2>Employee Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name='email' autoComplete='off' placeholder='輸入郵件'
                            onChange={(e) => setEmployeelogin({ ...employee_login, email: e.target.value })} className='form-control rounded-0 mb-3' />
                        <p>{employee_login.email === '' ? '請填寫帳號' : ''}</p>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name='password' autoComplete='off' placeholder='輸入密碼'
                            onChange={(e) => setEmployeelogin({ ...employee_login, password: e.target.value })} className='form-control rounded-0 mb-3' />
                        <p>{employee_login.password === '' ? '請填寫密碼' : ''}</p>
                    </div>
                    <button className='btn btn-success w-100 rounded-0'>登入</button>
                </form>
            </div>
        </div>
    )
}

export default EmployeeLogin