const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const app = express();

const app = express();
app.use(cors())
app.use(express.json());

//POST endpoints 
app.post('/:db', (req, res) => {
  API.create(req.params.db);
  res.sendStatus(200);
});

app.post('/:db/:col', (req, res) => {
  API.createCollection(req.params.db, req.params.col);
  res.sendStatus(200);
});

app.post('/:db/:col/addRequest', (req, res) => {
  let today = new Date();
  let data = req.body;
  let key = data.uuid;
  let desc = data.description;
  let author = data.author;
  let record = JSON.parse(`{
	  id: ${key},
    creation_date: ${today},
    author: ${author},
    description: ${desc},
    status: "open",
    updates: [{
      text: "creation",
      date: ${today}
      }]
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



