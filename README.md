# offline_storage
This project helps you to understand offline feature in ionic cordova based application.

For offline here I have used SQLite database.

In www/app.js in $ionicPlatform.ready() function, I have created a database name 'testDb'

Once you will declare the below mentioned line, Then check in your browser resources opotion in Web sql this 'testDb' will be available

      var db = window.openDatabse(Database name, Version number, Text description, Estimated size of database);
      
      db.transaction(openDatabase,successDb,errorDb);
      
      //create the table
      function openDatabase(tx){
      	tx.executeSql("create table login(userId integer, username text, password text)");
      }
      
      //on successful table creation
      function successDb(){
      	console.log("Success table creation");
      }
      
      //on error of table creation
      function errorDb(){
      	console.log("Error tabel creation");
      }
      
