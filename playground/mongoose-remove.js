const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


//Todo.remove => remove multiple docs
//Todo.remove({}).then((result) => {
//	
//	console.log(result);
//	
//});

//Todo.findOneAndRemove ==> remove and print the object back
Todo.findOneAndRemove({_id: "59d680e5d37158cafd4a637c"}).then((todo) => {
	
	console.log(todo);
	
});

//Todo.findByIdAndRemove 
//Todo.findByIdAndRemove('59d67fd9d37158cafd4a6320').then((todo) => {
//	
//	console.log(todo);
//	
//});