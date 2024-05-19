const express = require('express');
const logResponse = require('./log.js');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.delete('/:id', (req, res, next) => {
  const db = 'https://backend-database-olz2xjbmza-uc.a.run.app'
  const id = req.params.id;
  const url = `${db}/${id}`;
  const options = {method: 'DELETE'}

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        console.log(`Medicine with id ${id} deleted successfully`);
      } else {
        throw new Error(`Failed to delete medicine ${id}`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  next();
});

app.use(logResponse);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
