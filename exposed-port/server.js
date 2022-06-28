const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())

//POST endpoints 
app.post('/:db', (req, res) => {
  API.create(req.params.db);
  res.sendStatus(200);
});

app.post('/:db/:col', (req, res) => {
  API.createCollection(req.params.db, req.params.col);
  res.sendStatus(200);
});

app.post('/:db/:col/:key', (req, res) => {
  let record = JSON.parse(`{
	  id: ${req.params.key},
	  data: "somehow get data from post body"
  }`)
  API.insert(req.params.db, req.params.col, record);
  res.sendStatus(200);
});

//GET endpoints
app.get('/', (req, res) => {
  console.log("get endpoint hit");
  res.send(200);
});

//DELETE endpoints 

const port = 5000;
app.listen(`${port}`, () => {
  console.log("listening on port ", port);
});



