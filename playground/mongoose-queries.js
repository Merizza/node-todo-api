const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


var id = "59d33e46398b2a0560c1ea9e";

User.findById(id).then((user) => {

	if(!user) {
		return console.log("User not found");
	}
	
	console.log(JSON.stringify(user, undefined, 2));
}, (e) => console.log(e));
//var id = "59d4481ac70cfc23182ed78611";
//
//if(!ObjectID.isValid(id)) {
//	console.log('ID is not valid');
//}

//Todo.find({
//	_id: id //with mongoose doesn't need to use new ObjectId
//}).then((todos) => {
//	console.log('Todos', todos);
//}); //result in array
//
//Todo.findOne({
//	_id: id
//}).then((todo) => {
//	console.log('Todo', todo)
//}); //result in object

//Todo.findById(id).then((todo) => {
//	if(!todo) {
//		return console.log('Id not found');
//	}
//	console.log('Todo by Id', todo);
//}).catch((e) => console.log(e));