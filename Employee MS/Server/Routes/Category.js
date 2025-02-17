import con from "../utils/db.js";
import express from 'express'

const router = express.Router()

router.get('/category', (req, res) => {
    const sql = 'SELECT * FROM category'
    con.query(sql, (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: '查詢有誤，請稍後再試' })
        }
        return res.json({ Status: true, Result: result })
    })
})


export { router as Category }