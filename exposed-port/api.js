//these are the bindings that correspond to CRUD operations on 
//the mongoDB database that we are using for the persistence layer
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbname = 'myProject';
const collectionName = 'test';

class api {
  constructor(){
  }

  // CREATE NEW DATABASE
  create(dbname){ 
    client.connect();
    const collection = client.db(dbname).collection(collectionName);
  }

  // CREATE NEW COLLECTION 
  createCollection() {
    client.connect();
    const collection = client.db(dbname).collection(collectionName);
  }

  // CREATE NEW DOCUMENT 
  insert(insertJson) {
    client.connect();
    const collection = client.db(dbname).collection(collectionName);
    try {
      await collection.insertOne(insertJson);
    } catch (error) {
      throw error;
    }
  }


  //ACTIVE REQUESTS PUBLIC
  active_requests(callback) {
    client.connect();
    const collection = client.db(dbname).collection(collectionName);

  }

  //INACTIVE REQUESTS this.private
  inactive_requests(callback) {
    client.connect();
    const collection = client.db(dbname).collection(collectionName);
  }

  //UPDATE
  async update(uuid, updateList, urgency){
    client.connect();
    const collection = client.db(dbname).collection(collectionName);
  }

  //CHANGE STATUS
  async change_status(uuid, newStatus, callback) {
    client.connect();
    const collection = client.db(dbname).collection(collectionName);
  }


  // INCREMENT STATUS AUTOMATICALLY 
  async increment_status(uuid, callback) {
    client.connect();
    const collection = client.db(dbname).collection(collectionName);
  }

}

module.exports = { api }
