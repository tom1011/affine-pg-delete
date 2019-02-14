const express = require('express');

//note body parser is not needed becuse its already definded,
// on the server side.

const pool = require ('../modules/pool');

const router = express.Router();// this is new


// app is changed to router.
router.get('/', (reg, res) =>{
    // set an order by for table stuff.
    pool.query('SELECT * FROM "restaurant" ORDER BY "id";')
    .then((results) => {
        res.send(results.rows)//array of objects with the array being books and properties being title, author, published.
    }).catch((error) => {
        console.log('error with restaurant select: ', error);
        res.sendStatus(500);
    })
})

router.post('/', (reg, res) =>{
    console.log('in /restarant post')
    pool.query(`INSERT INTO "restaurant" ("name" , "type", "rating") VALUES ($1, $2, $3);`, [reg.body.name, reg.body.type, reg.body.rating])
    .then(() => {
        res.sendStatus(201)
    }).catch((error) => {
        console.log('error with restaurant post: ', error);
        res.sendStatus(500);
    });
})

router.delete('/:id', (reg, res) =>{
    //: is caught all and then id is another verable
    console.log('in /restarant delete')
    // req.params is an object with one peramater id
    console.log('reg.params', reg.params);
    pool.query(`DELETE FROM "restaurant" 
    WHERE "id" = $1;`, [reg.params.id])
    .then(() => {
        res.sendStatus(204)
        // 204 is delete.
    }).catch((error) => {
        console.log('error with restaurant delete: ', error);
        res.sendStatus(500);
    });
})

// you need to ordered by id
router.put('/:id', (reg, res) =>{
    //console.log('in /restarant PUT');
    //console.log(reg.params.id);

        pool.query(`UPDATE "restaurant"
    SET "rating" = '5'
    WHERE "id" = $1;`, [reg.params.id])
    .then(() => {
        res.sendStatus(204)
    }).catch((error) => {
        console.log('error with restaurant update: ', error);
        res.sendStatus(500);
    });
})
module.exports = router;