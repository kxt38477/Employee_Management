import con from "../utils/db.js"
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router();

// 登入
router.post('/login', (req, res) => {
    const SQL = 'SELECT * FROM employee WHERE email = ? '
    con.query(SQL, [req.body.email], (err, result) => {
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, resp) => {
                if (err) {
                    return res.json({ Status: false, Error: '登入錯誤，請稍後再試' })
                }
                if (resp) {                    
                    const email = result[0].email
                    const token = jwt.sign({ role: 'employee', email: email, id: result[0].id },
                        'secret_key_is_kxt38477',
                        { expiresIn: '1d' }
                    )
                    
                    res.cookie('token', token)
                    return res.json({ Status: true, id: result[0].id })
                } else {
                    return res.json({ Status: false, Error: '密碼錯誤' })
                }

            })
        }
    })

})
// 登出
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})



export { router as EmployeeLogin }

