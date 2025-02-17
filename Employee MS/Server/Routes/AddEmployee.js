import express from 'express'
import con from '../utils/db.js';
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'

const router = express.Router();

//處理照片檔案上傳功能(上傳單檔)
const storage = multer.diskStorage({
    // 檔案位置
    destination: function (req, file, cb) {
        cb(null, 'Public/Images'); //null錯誤處理，第二個參數為儲存路徑。
    },
    // 檔案命名
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
        //null錯誤處理，第二個參數為檔案名稱。
        //file.fieldname取得input name值，path.extname(file.originalname)防止多重副檔名導致漏洞
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }
})

// router.post('path', middleware, callback func)
router.post('/add_employee',upload.single('image') , (req, res) => {
    const sql = 'INSERT INTO employee(`name`,`email`,`password`,`salary`,`category_id`,`image`) VALUES ( ? )'
    console.log(typeof req.body.password);
    
    bcrypt.hash(req.body.password, 10, (err, hash_pw) => { // 加密後儲存至資料庫
        if (err) {
            return res.json({ Status: false, Error: '格式錯誤!' })
        }
        const values = [
            req.body.name,
            req.body.email,
            hash_pw,
            req.body.salary,
            req.body.category_id,
            req.file.filename
        ]
        con.query(sql, [values], (err, result) => {
            if (err) {
                return res.json({ Status: false, Error: err })
            }
            
            return res.json({ Status: true })
        })
    })
})

export { router as AddEmployee }