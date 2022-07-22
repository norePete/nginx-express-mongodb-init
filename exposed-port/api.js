//these are the bindings that correspond to CRUD operations on 
//the mongoDB database that we are using for the persistence layer
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbname = 'MAIN_DATABASE';
const collectionName = 'REQUEST_COLLECTION';

class api {
  constructor(){
  }

  // CREATE NEW DATABASE
  async create(dbname){ 
    client.connect();
    const collection = client.db(dbname).collection(collectionName);
  }

  // CREATE NEW COLLECTION 
  async createCollection() {
    client.connect();
    const collection = client.db(dbname).collection(collectionName);
  }

  // CREATE NEW DOCUMENT 
  async insert(insertJson) {
    client.connect();
    const collection = client.db(dbname).collection(collectionName);
    try {
      await collection.insertOne(insertJson);
    } catch (error) {
      throw error;
    }
  }


  //ACTIVE REQUESTS PUBLIC
  async inactive_requests(callback) {
    client.connect();
    const collection = client.db(dbname).collection(collectionName);
    const result = await collection.find({urgency : "closed"}).toArray();
    callback(result);
  }

  //INACTIVE REQUESTS this.private
  async active_requests(callback) {
    client.connect();
    const collection = client.db(dbname).collection(collectionName);
    const result = await collection.find({
      $or: [{urgency: "low"},{urgency: "medium"},{urgency: "high"}]
    }).toArray();
    callback(result);
  }

  //UPDATE
  async update(uuid, newUpdateList, newStatus){
    client.connect();
    const collection = client.db(dbname).collection(collectionName);
    await collection.updateOne(
      {id: uuid},
      { $set: 
        { updateList: newUpdateList, urgency: newStatus}
      } 
    );
  }

  //CHANGE STATUS
  async change_status(uuid, newStatus ) {
    client.connect();
    const collection = client.db(dbname).collection(collectionName);
    const result = await collection.updateOne(
      {id: uuid},
      { $set: {urgency: newStatus}}
    );
  }


  // INCREMENT STATUS AUTOMATICALLY 
  async increment_status(uuid, callback) {
    client.connect();
    const collection = client.db(dbname).collection(collectionName);
  }

}

module.exports = { api }
