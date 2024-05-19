const express = require('express');
const logResponse = require('./log.js');
const cors = require('cors');

const app = express();
const port = 3000;
const db = 'https://backend-database-olz2xjbmza-uc.a.run.app'

app.use(cors());

app.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  const url = `${db}/${id}`;
  const options = {method: 'DELETE'}

  let status = 0;
  let content = '';
  console.log(`Before fetch to ${url}`);
  await fetch(url, options)
    .then(async response => {
      if (response.status === 204) {
        status = 204
        console.log(`Medicine with id ${id} deleted successfully`);
      } else {
        status = response.status
        content = await response.json()
      }
    })
    .catch(error => {
      status = 500
      content = 'Internal server error occurred'
      console.error('Error:', error);
    });

    if (content === '') {
      res.status(status).send();
    } else {
      res.status(status).send(content);
    
    }
  next();
});

app.use(logResponse);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
