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
  res.sendStatus(200);
});
app.get('/:db', (req, res) => {
	API.query(req.params.db)
	res.sendStatus(200);
	//send back result
	//...object binary encoding/decoding or json
});
app.get('/:db/:item', (req, res) => {
	API.query(req.params.db, req.params.item)
	res.sendStatus(200);
	//send back result
});


//DELETE endpoints 






//SUBSCRIPTION SERVICE
app.post('/subscribe/:evt', (req, res) => {
	subscribe(req.params.evt);
	res.sendStatus(200);
});


const port = 5000;
app.listen(`${port}`, () => {
  console.log("listening on port ", port);
});



