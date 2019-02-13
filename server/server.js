const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
// end modulas require
const app = express();
const PORT = 5000;
const pool = pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'restaurant',
    max: 10,
    idleTimeoutMillis: 30000,
    })

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));

app.get('/restaurant', (reg, res) =>{
    pool.query('SELECT * FROM "restaurant"')
    .then((results) => {
        res.send(results.rows)//array of objects with the array being books and properties being title, author, published.
    }).catch((error) => {
        console.log('error with restaurant select: ', error);
        res.sendStatus(500);
    })
})

app.post('/restaurant', (reg, res) =>{
    console.log('in /restarant post')
    pool.query(`INSERT INTO "restaurant" ("name" , "type") VALUES ($1, $2);`, [reg.body.name, reg.body.type])
    .then(() => {
        res.sendStatus(201)
    }).catch((error) => {
        console.log('error with restaurant post: ', error);
        res.sendStatus(500);
    });
})

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});