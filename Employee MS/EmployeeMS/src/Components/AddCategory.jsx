import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
    const [category, setCategory] = useState()
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/auth/add_category', {category})
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/category')
                } else  {
                    setMessage(result.data.message)
                }

            })
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 rounded w-25 border'>
                <h2>Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <span className='text-danger'>
                            {message ? message : null}
                        </span>
                        <br />
                        <label htmlFor="category"><strong>Category:</strong></label>
                        <input type="text" name='category' placeholder='輸入職務類別'
                            onChange={(e) => setCategory(e.target.value)} className='form-control rounded-0 mb-3' />
                    </div>
                    <button className='btn btn-success w-100 rounded-0'>新增職務</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory