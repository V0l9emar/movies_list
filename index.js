const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'sql7.freemysqlhosting.net',
    user: 'sql7384261',
    password: '7aLfVnSQd3',
    database: 'sql7384261',
    port: 3306
})

// app.get('/', (req, res) => {
//     // const sqlInsert = 'INSERT INTO movie_reviews (movieName, movieReview) VALUES ("inception", "good movie")'
//     // db.query(sqlInsert, (err, result) => {
//     //     res.send('hello')
//     // })
    
// })
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect,(err, data) => {
        if(!err){
            // console.log(data)'
            res.send(data)
        }else{
            console.log(err)
        }
    });
});
app.post("/api/insert", (req, res) => {
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, data) => {
        if(!err){
            console.log(data)
        }else{
            console.log(err)
        }
    });
});
app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName;
    const id = req.params.id;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";

    db.query(sqlDelete, name, id, (err, res) => {
        if(!err){
            console.log(res);
        }else{
            console.log(err)
        }
    })
})
app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

    db.query(sqlUpdate, [review, name], (err, res) => {
        if(!err){
            console.log(res);
        }else{
            console.log(err)
        }
    })
})

app.listen(5000, () => {
    console.log('Run on port 5000')
})