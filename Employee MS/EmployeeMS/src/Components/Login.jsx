import React, { useState } from 'react'
import "./style.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        tick: false
    });
    axios.defaults.withCredentials = true
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/auth/adminlogin', values)
            .then(result => {
                if (result.data.loginStatus) {
                    navigate('/dashboard')
                } else {
                    setError(result.data.error);
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-danger'>
                    {error ? error : null}
                </div>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name='email' autoComplete='off' placeholder='輸入郵件'
                            onChange={(e) => setValues({ ...values, email: e.target.value })} className='form-control rounded-0 mb-3' />
                        <p>{values.email === '' ? '請填寫帳號' : ''}</p>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name='password' autoComplete='off' placeholder='輸入密碼'
                            onChange={(e) => setValues({ ...values, password: e.target.value })} className='form-control rounded-0 mb-3' />
                        <p>{values.password === '' ? '請填寫密碼' : ''}</p>
                    </div>
                    <div className='mb-3'>
                        <input type="checkbox" name="tick" id="tick" checked={values.tick} onChange={(e) => setValues({ ...values, tick: e.target.checked })} />
                        <label htmlFor="tick">您同意條款</label>
                        <p>{values.tick === true ? '您有勾選' : '您無勾選'}</p>
                    </div>
                    <button className='btn btn-success w-100 rounded-0'>登入</button>
                </form>
            </div>
        </div>
    )
}

export default Login