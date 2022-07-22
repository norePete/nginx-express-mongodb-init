//these are the bindings that correspond to CRUD operations on 
//the mongoDB database that we are using for the persistence layer
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'myProject';

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
          
      });
    });
  }


  //ACTIVE REQUESTS PUBLIC
  active_requests(dbname, collection, callback) {
      this.private_active_requests(
      dbname, 
      collection, 
      callback);
  }
  //ACTIVE REQUESTS this.private
  private_active_requests(
    dbname, 
    collection, 
    callback,
    client=MongoClient, 
    url=this.defaultUrl)
  {
    client.connect(url, async function(err, db) {
      let arrayOfRequests = []
      if (err) throw err;
      let current_db = db.db(dbname);
      //iterate over the entire collection
      //and append each document onto
      //the array which we will return
      await current_db
        .collection(collection)
        //ignore closed requests
        .find({ urgency: { $not: { $regex: "closed"}}})
        .forEach(function(myDoc) {
          arrayOfRequests.push({
              "quote": myDoc.quote
            , "source": myDoc.source
            , "author": myDoc.author
            , "year": myDoc.year
            , "updateDialog": myDoc.updateDialog
            , "updateBuffer": myDoc.updateBuffer
            , "changeStatusDialog": myDoc.changeStatusDialog
            , "updateList": myDoc.updateList
            , "urgency": myDoc.urgency
            , "id": myDoc.id 
            });
        });
      callback(arrayOfRequests);
    });
  }

  //INACTIVE REQUESTS this.private
  inactive_requests(dbname, collection) {
    let arrayOfRequests = this.private_inactive_requests(
      dbname, 
      collection,
      callback);
    return arrayOfRequests;
  }
  //INACTIVE REQUESTS this.private
  private_inactive_requests(
    dbname, 
    collection, 
    client=MongoClient, 
    url=this.defaultUrl)
  {
    client.connect(url, async function(err, db) {
      let arrayOfRequests = [];
      if (err) throw err;
      let current_db = db.db(dbname);
      //iterate over the entire collection
      //and append each document onto
      //the array which we will return
      await current_db
        .collection(collection)
        //ignore closed requests
        .find({ urgency: "closed" })
        .forEach(function(myDoc) {
          arrayOfRequests.push(myDoc);
        });
      callback(arrayOfRequests);
    });
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

    });
  }


  //CHANGE STATUS
  change_status(dbname, collection, uuid, newStatus) {
    return this.private_change_status(dbname, collection, uuid, newStatus);
  }

  private_change_status(
    dbname, 
    collection, 
    uuid, 
    newStatus,
    client=MongoClient, 
    url=this.defaultUrl)
  {
    client.connect(url, async function(err, db) {
      if (err) throw err;
      let current_db = db.db(dbname);
      //set new status
        await current_db.collection(collection).updateOne(
          { id: `${uuid}` },
          { $set: { urgency: `${newStatus}` }}
          )
        let data = await current_db
        .collection(collection).find({ id: uuid });
        console.log(`${uuid}`)
        console.log(`${collection}`)
        console.log(`${db}`)
        console.log(`${JSON.stringify(data)}`);
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
      
    });
  }
}

module.exports = { api }
