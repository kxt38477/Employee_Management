import express from 'express'
import con from "../utils/db.js";
import jwt from 'jsonwebtoken'


const router = express.Router();


router.get('/detail/:id', (req, res) => {
    const id = req.params.id
    const SQL = 'SELECT * FROM employee where id = ?';
    con.query(SQL, [id], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: '有誤，請稍後再試' })
        }            
        return res.json({ Status: true, Result: result })
    })

})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})


export { router as EmployeeDetail }

