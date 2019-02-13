const express = require('express');

//note body parser is not needed becuse its already definded,
// on the server side.

const pool = require ('../modules/pool');

const router = express.Router();// this is new


// app is changed to router.
router.get('/restaurant', (reg, res) =>{
    pool.query('SELECT * FROM "restaurant"')
    .then((results) => {
        res.send(results.rows)//array of objects with the array being books and properties being title, author, published.
    }).catch((error) => {
        console.log('error with restaurant select: ', error);
        res.sendStatus(500);
    })
})

router.post('/restaurant', (reg, res) =>{
    console.log('in /restarant post')
    pool.query(`INSERT INTO "restaurant" ("name" , "type") VALUES ($1, $2);`, [reg.body.name, reg.body.type])
    .then(() => {
        res.sendStatus(201)
    }).catch((error) => {
        console.log('error with restaurant post: ', error);
        res.sendStatus(500);
    });
})

module.exports = router;