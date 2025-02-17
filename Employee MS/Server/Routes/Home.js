import con from "../utils/db.js";
import express from "express"

const router = express.Router();

router.get('/admin_count', (req, res) => {
    const SQL = 'SELECT COUNT(*) as count FROM admin'
    con.query(SQL, (err, result) => {
        if (err) return res.json({ Status: false, Error: '資料查詢有誤' })
   
        return res.json({ Status: true, Result: result })
    })
})


router.get('/employee_count', (req, res) => {
    const SQL1 = 'SELECT COUNT(*) as count , SUM(salary) as salary FROM employee'
    con.query(SQL1, (err, result) => {
        if (err) return res.json({ Status: false, Error: '資料查詢有誤' })
        return res.json({ Status: true, Result: result })
    })
})

export { router as Home }