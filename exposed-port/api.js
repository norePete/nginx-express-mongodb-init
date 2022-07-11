//these are the bindings that correspond to CRUD operations on 
//the mongoDB database that we are using for the persistence layer
const MongoClient = require('mongodb').MongoClient;

class api {
  constructor(url){
    this.defaultUrl = url;
    // url = 'mongodb://localhost:27017/';
  }

  // CREATE NEW DATABASE
  create(dbname){ this.private_create(dbname); }
  private_create(dbname, client=MongoClient, url=this.defaultUrl){
    client.connect(url, function(err, db) {
      if (err) throw err;
      console.log("database created!");
      db.close();
    });
  }

  // CREATE NEW COLLECTION 
  createCollection(dbname, collection) {
    this.private_createCollection(dbname, collection);
  }
  private_createCollection(dbname, collection, client=MongoClient, url=this.defaultUrl) {
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

  // CREATE NEW DOCUMENT 
  insert(dbname, collection, insertJson) {
    this.private_insert(dbname, collection, insertJson);
  }
  private_insert(dbname, collection, insertJson, client=MongoClient, url=this.defaultUrl){
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


  //ACTIVE REQUESTS PUBLIC
  active_requests(dbname, collection) {
    let arrayOfRequests = this.private_active_requests(
      dbname, 
      collection);
    return arrayOfRequests;
  }
  //ACTIVE REQUESTS this.private
  private_active_requests(
    dbname, 
    collection, 
    client=MongoClient, 
    url=this.defaultUrl)
  {
    let arrayOfRequests = [];
    client.connect(url, function(err, db) {
      if (err) throw err;
      let current_db = db.db(dbname);
      //iterate over the entire collection
      //and append each document onto
      //the array which we will return
      current_db
        .collection(collection)
        //ignore closed requests
        .find({ urgency: { $not: "closed" } })
        .forEach(function(myDoc) {
          arrayOfRequests.push(myDoc);
        });
      db.close();
    });
    return arrayOfRequests;
  }

  //INACTIVE REQUESTS this.private
  active_requests(dbname, collection) {
    let arrayOfRequests = this.private_inactive_requests(
      dbname, 
      collection);
    return arrayOfRequests;
  }
  //INACTIVE REQUESTS this.private
  private_inactive_requests(
    dbname, 
    collection, 
    client=MongoClient, 
    url=this.defaultUrl)
  {
    let arrayOfRequests = [];
    client.connect(url, function(err, db) {
      if (err) throw err;
      let current_db = db.db(dbname);
      //iterate over the entire collection
      //and append each document onto
      //the array which we will return
      current_db
        .collection(collection)
        //ignore closed requests
        .find({ urgency: "closed" })
        .forEach(function(myDoc) {
          arrayOfRequests.push(myDoc);
        });
      db.close();
    });
    return arrayOfRequests;
  }
  //update status 
  //increment status
  //add update event to array, reset status

  //UPDATE
  update(dbname, collection, uuid, updateList, urgency){
    this.private_append_update(dbname, collection, uuid, updateList, urgency);
  }

  private_append_update(
    dbname, 
    collection, 
    uuid, 
    updateList, 
    urgency,
    client=MongoClient, 
    url=this.defaultUrl)
  {
    client.connect(url, function(err, db) {
      if (err) throw err;
      let current_db = db.db(dbname);
      //modify the updates stored in the database
      current_db.collection(collection).updateOne(
        { id: `${uuid}` }, 
        { $set: { updates: `${updateList}` }}
      );
      //modify the urgency
      current_db.collection(collection).updateOne(
        {id: `${uuid}` }, 
        { $set: { urgency: `${urgency}` }} 
      );
      db.close();
    });
  }


  //CHANGE STATUS
  change_status(dbname, collection, uuid, new_status) {
    this.private_change_status(dbname, collection, uuid, newStatus);
  }

  private_change_status(
    dbname, 
    collection, 
    uuid, 
    newStatus,
    client=MongoClient, 
    url=this.defaultUrl)
  {
    client.connect(url, function(err, db) {
      if (err) throw err;
      let current_db = db.db(dbname);
      //set new status
        current_db.collection(collection).updateOne(
          { id: `${uuid}` },
          { $set: { urgency: `${newStatus}` }}
        );
      db.close();
    });
  }

  // INCREMENT STATUS AUTOMATICALLY 
  increment_status() {
    this.private_increment_status(dbname, collection, uuid);
  }

  private_increment_status(
    dbname, 
    collection, 
    uuid, 
    client=MongoClient, 
    url=this.defaultUrl)
  {
    client.connect(url, function(err, db) {
      if (err) throw err;
      let current_db = db.db(dbname);
      //query status of uuid
      let data = current_db.collection(collection).find({ id: uuid });
      let current_status = data.urgency;
      if (current_status === "low"){
        change_status(uuid, "medium");
      } else if (current_status === "medium") {
        change_status(uuid, "high");
      } else if (current_status === "high") {
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
}

module.exports = { api }
