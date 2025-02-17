import con from "../utils/db.js";
import express from 'express'

const router = express.Router();


router.get('/total_employee', (req, res) => {
    const SQL = 'SELECT emp.id, emp.image, emp.name as employee_name, emp.email, emp.salary, cat.name as category_name ' +
        'FROM employee emp ' +
        'INNER JOIN category cat ON cat.id = emp.category_id ';
    con.query(SQL, (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: '查詢失敗，請稍後再試' })
        }
        if (result.length > 0) {
            return res.json({ Status: true, Result: result });
        } else if (result.length == 0) {
            return res.json({ Status: true, Result: [] })
        }
    })

})



export { router as Employee }

