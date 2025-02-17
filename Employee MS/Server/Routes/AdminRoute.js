import express from 'express'
import con from '../utils/db.js';
import jwt from 'jsonwebtoken'

const router = express.Router()

// 登入
router.post('/adminlogin', (req, res) => {
    const sql = 'SELECT * FROM admin WHERE email = ? AND password = ? ';
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) {
            return res.json({
                loginStatus: false,
                error: '登入失敗'
            })
        }
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "admin", email: email, id: result[0].id },
                "secret_key_is_kxt38477",
                { expiresIn: "1d" }
            );
            res.cookie('token', token) //token儲存至cookie
            return res.json({ loginStatus: true })
        } else {
            return res.json({ loginStatus: false, error: '帳號或者密碼錯誤' })
        }

    })
})
// 登出
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})



export { router as adminRouter }
