const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const app = express();
const dbConfig = require('./config/db');
const port = 3000;



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


//setting up mongo db
MongoClient.connect(dbConfig.url,(err,database)=>{
    if(err)return console.log(err);

   var db = database.db('todo-list');
    require('./app/routes')(app,db);

    app.listen(port, () => {
        console.log(`We are live on ${port} port`)
    });

});









