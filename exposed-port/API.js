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

//there could be ten different update functions
//unless there is a way to generalize by passing in a filtering function
//or query object 
function update_particular(){
	private_update(dbname, collection, other, other);
}
function private_update_particular(
	dbname, 
	collection, 
	other, 
	other, 
	client=MongoClient, 
	url=defaultUrl)
{

	client.connect(url, function(err, db) {
		if (err) throw err;
		let current_db = db.db(dbname);

		//somehow retrieve and append
		//each implementation of this update function will be unique
		current_db
			.collection(collection)
		//

		db.close();
	});

}
