const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const { api } = require('./api');

const app = express();
app.use(cors())
app.use(express.json());

const dbname = "panama";
const collection = "papers";
const API = new api('mongodb://localhost:27017/'); 

//POST endpoints 
app.post('/new', (req, res) => {
  console.log("new request created!")
  API.insert(dbname, collection, req.body)
  console.log(req.body.id)
  console.log(req.body.quote)
  console.log(req.body.source)
  console.log(req.body.author)
  console.log(req.body.year)
  console.log(req.body.updateList)
  console.log(req.body.urgency)
  res.sendStatus(200);
});
app.post('/status', (req, res) => {
  console.log("status changed manually")
  console.log(req.body)
  res.sendStatus(200);
});
app.post('/close', (req, res) => {
  API.private_change_status(
    dbname, 
    collection, 
    req.body.id, 
    req.body.urgency
  );

  console.log(req.body)
  console.log("closed a request")
  res.sendStatus(200);
});
app.post('/update', (req, res) => {

  API.update(
    dbname, 
    collection,
    req.body.id, 
    req.body.updateList, 
    req.body.urgency)

  console.log("update added")
  console.log(req.body)
  res.sendStatus(200);
});
app.get('/active', (req, res) => {
  arrayOfJson = API.active_requests(dbname, collection);
  res.body = JSON.stringify(arrayOfJson);
  res.send();
});
app.get('/inactive', (req, res) => {
  arrayOfJson = API.inactive_requests(dbname, collection);
  res.body = JSON.stringify(arrayOfJson);
  res.send();
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



