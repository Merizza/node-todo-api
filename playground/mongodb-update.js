//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	
	if(err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	
//findOneAndUpdate
	//	db.collection('Todos').findOneAndUpdate({
	//		_id: new ObjectID("59d20dd120c1a03db992835f")
	//	}, {
	//		$set: {
	//			completed: true
	//		}
	//	}, {
	//		returnOriginal: false
	//	}).then((result) => {
	//		
	//		console.log(result);
	//		
	//	});

//Challenge
	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('59d2014020c1a03db99280c1')
	}, {
		$set : {
			name: "Momo"
		},
		$inc : {
			age : 1
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		
		console.log(result);
		
	});
	

	
	//db.close();
	
});