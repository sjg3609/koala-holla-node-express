const express = require('express');
const koalaRouter = express.Router();

let koalaList = [
    {
        id: 1,
        name: 'Scotty',
        gender: 'M',
        age: 4,
        ready_to_transfer: 'Y',
        notes: 'Born in Guatamala'
    },
    {
        id: 2,
        name: 'Jean',
        gender: 'F',
        age: 5,
        ready_to_transfer: 'Y',
        notes: 'Allergic to lots of lava'
    },
    {
        id: 3,
        name: 'Ororo',
        gender: 'F',
        age: 7,
        ready_to_transfer: 'N',
        notes: 'Loves listening to Paula (Abdul)'
    },
    {
        id: 4,
        name: 'Logan',
        gender: 'M',
        age: 15,
        ready_to_transfer: 'N',
        notes: 'Loves the sauna'
    },
    {
        id: 5,
        name: 'Charlie',
        gender: 'M',
        age: 9,
        ready_to_transfer: 'Y',
        notes: 'Favorite band is Nirvana'
    },
    {
        id: 6,
        name: 'Betsy',
        gender: 'F',
        age: 4,
        ready_to_transfer: 'Y',
        notes: 'Has a pet iguana'
    }
]

// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
    console.log('GET request made to /koalas');
    res.send(koalaList);
});

// POST
koalaRouter.post('/', (req, res) => {
   console.log('POST Request for /koalas') ;
   let newKoala = req.body;
   koalaList.push(newKoala);
   res.sendStatus(201);
});

// PUT


// DELETE
koalaRouter.delete('/:id', (req, res) => {
    const deleteId = Number(req.params.id);
    koalaList = koalaList.filter((koala) => koala.id !== deleteId);
    console.log(koalaList);
    res.sendStatus(200);
});
module.exports = koalaRouter;