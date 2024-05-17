const express = require('express');
const logResponse = require('./log.js');

const app = express();
const port = 3000;

app.use(express.json());

app.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    // TODO delete the item from the database
    console.log(`Deleting item with id ${id}`);
    
    res.status(204).send();
    next();
});

app.use(logResponse);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});