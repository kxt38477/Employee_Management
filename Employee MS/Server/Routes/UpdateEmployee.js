import con from "../utils/db.js";
import express from "express"

const router = express.Router();

router.put('/update_employee/:id', (req, res) => {
    const SQL = 'UPDATE employee SET name = ? , email = ? , salary = ? , category_id = ? WHERE id = ? '
    const id = req.params.id
    con.query(SQL, [req.body.name, req.body.email, req.body.salary, req.body.category_id, id], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: '更新時發生錯誤，請稍後再試' })
        }
        return res.json({ Status: true })

    })
})

export { router as UpdateEmployee }