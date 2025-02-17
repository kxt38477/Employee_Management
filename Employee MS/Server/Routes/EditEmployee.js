import con from "../utils/db.js";
import express from "express"

const router = express.Router();

router.get('/employee/:id', (req, res) => {
    const SQL = 'SELECT * FROM employee WHERE id = ? '
    const id = req.params.id
    con.query(SQL, [id], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: '查詢有誤，請稍後再試' })
        }
        if (result.length > 0) {           
            return res.json({ Status: true, Result: result })
        }

    })
})

export {router as EditEmployee}