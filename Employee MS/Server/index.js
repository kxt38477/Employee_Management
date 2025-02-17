import express from "express"
import cors from 'cors'
import { adminRouter } from "./Routes/AdminRoute.js";
import { AddCategory } from "./Routes/AddCategory.js";
import { Category } from "./Routes/Category.js";
import { AddEmployee } from "./Routes/AddEmployee.js";
import { Employee } from "./Routes/Employee.js";
import { EditEmployee } from "./Routes/EditEmployee.js";
import { UpdateEmployee } from "./Routes/UpdateEmployee.js";
import { DeleteEmployee } from "./Routes/DeleteEmployee.js";
import { Home } from "./Routes/Home.js";
import { EmployeeLogin } from "./Routes/EmployeeLogin.js";
import { EmployeeDetail } from "./Routes/EmployeeDetail.js";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken'

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser());
app.use('/auth', Home)
app.use('/auth', adminRouter)
app.use('/auth', Category)
app.use('/auth', Employee)
app.use('/auth', AddCategory)
app.use('/auth', AddEmployee)
app.use('/auth', EditEmployee)
app.use('/auth', UpdateEmployee)
app.use('/auth', DeleteEmployee)
app.use('/employee', EmployeeLogin)
app.use('/employee', EmployeeDetail)
app.use(express.static('Public')) //提供靜態資源，存取文件

//驗證token
const verify = (req, res, next) => {
    const token = req.cookies.token
    if (token) {
        jwt.verify(token, 'secret_key_is_kxt38477', (err, decoded) => {
            if (err) {
                return res.json({ Status: false, Error: '錯誤的token' })
            }
            req.id = decoded.id
            req.role = decoded.role
            next();
        })
    } else {
        return res.json({ Status: false, Error: '使用者驗證錯誤' })
    }
}

app.get('/verify', verify, (req, res) => {
    return res.json({ Status: true, role: req.role, id: req.id })
})


app.listen(3000, () => {
    console.log("Server is running");
})