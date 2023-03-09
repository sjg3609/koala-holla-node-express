const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool.js');

// DB CONNECTION

// GET
koalaRouter.get('/', (req, res) => {
    console.log('GET request made to /koalas');
    let queryText = `SELECT * FROM "koalas"`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error trying to GET ${error}`);
        res.sendStatus(500);
    })
});

// POST
koalaRouter.post('/', (req, res) => {
   console.log('POST Request for /koalas');
   let newKoala = req.body;
   let queryText = `INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
                    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.ready_to_transfer, newKoala.notes]).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error trying to POST ${error}`);
    })
    
});

// PUT
koalaRouter.put('/:id', (req, res) => {
    console.log(`In PUT request /koalas`);
    let koalaId = Number(req.params.id);
    let koalaToEdit = req.params.body;
    let queryText = `UPDATE "koalas" SET ("ready_to_transfer") VALUES ('Y') WHERE "id" = $1`;
    pool.query(queryText, [koalaId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error trying to PUT ${error}`);
        res.sendStatus(500);
    })
})

// DELETE
koalaRouter.delete('/:id', (req, res) => {
    const deleteId = Number(req.params.id);
    let queryText = `DELETE FROM "koalas" WHERE "id" = $1;`;
    pool.query(queryText, [deleteId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in DELETE ${error}`);
        res.sendStatus(500);
    });
});
module.exports = koalaRouter;