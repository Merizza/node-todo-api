//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	
	if(err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	
	//deleteMany
//	db.collection('Todos').deleteMany({text: "Eat lunch"}).then((res) => {
//		
//		console.log(res);
//		
//	});
	
	//deleteOne
//	db.collection('Todos').deleteOne({text: "Eat lunch"}).then((res) => {
//		
//		console.log(res);
//		
//	});
	
	//findOneAndDelete
//	db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
//		console.log(res);
//	});
	
	//Challenge
	//deleteMany
//	db.collection('Users').deleteMany({name: "Momo"}).then((res) => {
//		
//		console.log(res);
//		
//	});
	
	//findOneAndDelete
	db.collection('Users').findOneAndDelete({
		_id : new ObjectID('59d1462d35415c1d04505cc8')
	}).then((res) => {
		console.log(JSON.stringify(res, undefined, 2));
	});
	
	//db.close();
	
});