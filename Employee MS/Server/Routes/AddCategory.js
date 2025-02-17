import express from 'express'
import con from '../utils/db.js';

const router = express.Router()

router.post('/add_category', (req, res) => {
    const sql = 'INSERT INTO category (`name`) VALUES ( ? )'
    con.query(sql, [req.body.category], (err,result)=> {
        if (err) {
            return res.json({Status:false,message:'新增職務失敗'})
        }
        return res.json({Status:true, message:'新增職務成功'})
    })
})



export { router as AddCategory }