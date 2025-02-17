import mysql from 'mysql'

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeems'
})

con.connect((err) => {
    if (err) {
        console.log('連線失敗');
    } else {
        console.log('已成功連接資料庫!')
    }
})

export default con;

