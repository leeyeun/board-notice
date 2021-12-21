const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect(); 

const multer = require('multer');
const upload = multer({dest: './upload'})

app.get('/api/lists', (req, res) => {
    connection.query(
        "SELECT * FROM LIST ORDER BY listID DESC",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.use('/image', express.static('./upload'));

app.post('/api/lists', upload.single('image'), (req, res) => {
    let sql ='INSERT INTO LIST VALUES (null, ?, ?, ?, ?)';
    let title = req.body.title;
    let userID = req.body.userID;
    let content = req.body.content;
    let image = 'http://localhost:5000/image/' + req.file.filename;
    let params = [title, userID, content, image];
    connection.query(sql,params, 
        (err, rows, fields) =>{
            res.send(rows);
        }
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));