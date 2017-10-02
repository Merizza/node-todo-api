//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//Object destructuring in ES6
	//var user = {name:'Momo', age: 28};
	//var {name} = user;
	//console.log(name);

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	
	if(err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	
	// Todos collection
//	db.collection('Todos').insertOne({
//		
//		text: 'Something to do',
//		completed: false
//		
//	}, (err, result) => {
//		
//		if(err) {
//			return console.log('Unable to insert todo', err);
//		}
//		
//		console.log(JSON.stringify(result.ops, undefined, 2));
//		
//	});
	
	//Users collection
//	db.collection('Users').insertOne({
//		
//		name: 'Momo',
//		age: '28',
//		location: 'UK'
//		
//	}, (err, result) => {
//		
//		if(err){
//			return console.log('Unable to insert user', err);
//		}
//		
//		console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
//		
//	});
	
	db.close();
	
});