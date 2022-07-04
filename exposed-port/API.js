//these are the bindings that correspond to CRUD operations on 
//the mongoDB database that we are using for the persistence layer
const MongoClient = require('mongodb').MongoClient;
const defaultUrl = 'mongodb://localhost:27017/';
const DBname = "panama";
const COLLECTIONname = "papers";


function create(dbname){ private_create(dbname); }

function private_create(dbname, client=MongoClient, url=defaultUrl){
	client.connect(url, function(err, db) {
		if (err) throw err;
		console.log("database created!");
		db.close();
	});
}


function createCollection(dbname, collection) {
	private_createCollection(dbname, collection);
});
function private_createCollection(dbname, collection, client=MongoClient, url=defaultUrl) {
	client.connect(url, function(err, db) {
		if (err) throw err;
		let current_db = db.db(dbname);
		current_db.createCollection(collection, function(err, res) {
			if (err) throw err;
			console.log("Collection created!");
			db.close();
		});
	});
}

function insert(dbname, collection, insertJson) {
	private_insert(dbname, collection, insertJson);
}
function private_insert(dbname, collection, insertJson, client=MongoClient, url=defaultUrl){
	client.connect(url, function(err, db) {
		if (err) throw err;
		let current_db = db.db(dbname);
		let jsonObj = insertJson;
		current_db
			.collection(collection)
			.insertOne(jsonObj, function(err, res) {
				if (err) throw err; 
				console.log("1 document inserted");
				db.close();
		});
	});
}

function active_requests(dbname, collection, insertJson) {
	let arrayOfRequests = private_active_requests(
    dbname, 
    collection, 
    insertJson);
  return arrayOfRequests;
}

function private_active_requests(
	dbname, 
	collection, 
	uuid, 
	text, 
	client=MongoClient, 
	url=defaultUrl)
{
  let arrayOfRequests = [];
	client.connect(url, function(err, db) {
		if (err) throw err;
    let today = new Date();
		let current_db = db.db(dbname);
    //iterate over the entire collection
    //and append each document onto
    //the array which we will return
    current_db
      .collection(collection)
      //ignore closed requests
      .find({ status: { $not: "closed" } })
      .forEach(function(myDoc) {
        arrayOfRequests.push(myDoc);
      });
		db.close();
  });
  return arrayOfRequests;
}

	client.connect(url, function(err, db) {
		if (err) throw err;
		db.close();
	});











  return arrayOfRequests;
}

//update status 
//increment status
//add update event to array, reset status

function append_update(){
	private_append_update(dbname, collection, other, other);
}

function private_append_update(
	dbname, 
	collection, 
	uuid, 
	text, 
	client=MongoClient, 
	url=defaultUrl)
{
	client.connect(url, function(err, db) {
		if (err) throw err;
    let today = new Date();
		let current_db = db.db(dbname);
    let data = current_db.collection(collection).find({ id: uuid });
    //read current array into 'arr'
    let arr = data.updates;
    //create object to be appended
    let obj ={ 
      notes: text,
      date: today
    };
    //create a new array that will contain
    //both the old array and the new object
    let arr_updated = new Array();
    //push old array using spread operator
    arr_updated.push(...arr);
    //append the new object onto the end
    arr_updated.push(obj);
    //update the document in the database
    current_db.collection(collection).update(
      { id: uuid }, 
      { $set: { updates: arr_updated }}
    );
    change_status(uuid, "open");
		db.close();
	});
}


function change_status(uuid, new_status) {
  private_change_status(dbname, collection, uuid, newStatus);
}

function private_change_status(
	dbname, 
	collection, 
	uuid, 
  newStatus,
	client=MongoClient, 
	url=defaultUrl)
{
	client.connect(url, function(err, db) {
		if (err) throw err;
		let current_db = db.db(dbname);
    //set new status
      current_db.collection(collection).update(
        { id: uuid },
        { $set: { status: newStatus }}
      );
		db.close();
	});
}

function increment_status() {
	private_increment_status(dbname, collection, uuid);
}

function private_increment_status(
	dbname, 
	collection, 
	uuid, 
	client=MongoClient, 
	url=defaultUrl)
{
	client.connect(url, function(err, db) {
		if (err) throw err;
		let current_db = db.db(dbname);
    //query status of uuid
    let data = current_db.collection(collection).find({ id: uuid });
    let current_status = data.status;
    if (current_status === "open"){
      change_status(uuid, "waiting");
    } else if (current_status === "waiting") {
      change_status(uuid, "urgent");
    } else if (current_status === "urgent") {
      //ignore
      return;
    } else if (current_status === "closed") {
      //ignore
      return;
    } else {
      //ignore
      return;
    }
		db.close();
	});
}
