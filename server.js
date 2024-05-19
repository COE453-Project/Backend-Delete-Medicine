const express = require('express');
const logResponse = require('./log.js');
const cors = require('cors');

const app = express();
const port = 3000;
const db = 'https://backend-database-olz2xjbmza-uc.a.run.app'

app.use(cors());

app.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  const url = `${db}/${id}`;
  const options = {method: 'DELETE'}

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        res.status(500).send(`Medicine with id ${id} deleted successfully`);
        console.log(`Medicine with id ${id} deleted successfully`);
      } else {
        res.status(response.status).send(`Failed to delete medicine ${id}`)
      }
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('Internal server error occurred');
    });
  next();
});

app.use(logResponse);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
