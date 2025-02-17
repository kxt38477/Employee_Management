import con from "../utils/db.js";
import express from "express"

const router = express.Router();

router.delete('/delete_employee/:id', (req, res) => {
    const SQL = 'DELETE FROM employee WHERE id = ? '
    const id = req.params.id
    con.query(SQL, [id], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: '操作有誤，請稍後再試' })
        }                
        return res.json({ Status: true })
    })
})

export {router as DeleteEmployee}