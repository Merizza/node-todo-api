var express = require('express'),
	bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js'),
	{ObjectID} = require('mongodb'),
	{Todo} = require('./models/todo.js'),
	{User} = require('./models/user.js');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	
	var todo = new Todo({
		
		text: req.body.text
		
	});
	
	todo.save().then((doc) => {
		
		res.send(doc);
		
	}, (e) => {
		
		res.status(400).send(e);
		
	});
	
});

app.get('/todos', (req, res) => {
	
	Todo.find().then((todos) => {
		
		res.send({todos});
		
	}, (e) => {
		
		res.status(400).send(e);
		
	});
	
});

//GET /todos/id
app.get('/todos/:id', (req, res) => {
	
	var id = req.params.id;
	
	if(!ObjectID.isValid(id)) {
		return res.status(404).send();
	}
	
	Todo.findById(id).then((todo) => {
		
		if(!todo) {	
			return res.status(404).send();
		}
		
		res.send({todo});
		
	}, (e) => {
		
		res.status(400).send();
		
	});
	
});

app.listen(port, () => {
	
	console.log(`Started on port ${port}`);
	
})


module.exports = {
	app: app
};
//Moved to mongoose.js
//var mongoose = require('mongoose');
//
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp');


//Moved to todo.js
//var Todo = mongoose.model('Todo', {
//	text: {
//		type: String, 
//		required: true,
//		minLength: 1,
//		trim: true
//	},
//	completed: {
//		type: Boolean,
//		default: false
//	},
//	completedAt: {
//		type: Number,
//		default: null
//	}
//});

//var newTodo = new Todo({
//	
//	text: "  Cook dinner  "
//	
//});
//
//newTodo.save().then((res) => {
//	console.log('Saved todo', res);
//}, (e) => {
//	console.log('Unable to save todo');
//});

//var newTodo2 = new Todo({
//	
//	text: "Wash the dishes",
//	completed: false,
//	completedAt: 123
//	
//});
//
//newTodo2.save().then((res) => {
//	console.log(JSON.stringify(res, undefined, 2));
//}, (e) => {
//	console.log('Unable to save todo');
//});

//Moved to user.js
//var User = mongoose.model('Users', {
//	
//	email: {
//		type: String,
//		required: true,
//		minLength: 1,
//		trim: true
//	}
//	
//});
//
//var newUser = new User({
//	
//	email: 'merizza.azwir@gmail.com   '
//	
//});
//
//newUser.save().then((res) => {
//	
//	console.log('User saved', JSON.stringify(res, undefined, 2));
//	
//}, (e) => {
//	
//	console.log('Unable to save todo', e);
//	
//});