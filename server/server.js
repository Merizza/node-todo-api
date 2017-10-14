require('./config/config.js');

const _ = require('lodash');
const express = require('express'),
	  bodyParser = require('body-parser'),
	  {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js'),
	{Todo} = require('./models/todo.js'),
	{User} = require('./models/user.js'),
	{authenticate} = require('./middleware/authenticate');

var app = express();
var port = process.env.PORT; //|| 3000;=> removed, for this port refer to production environment only which is in Heroku

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

app.delete('/todos/:id', (req, res) => {
	
	//get the id
	var id = req.params.id;
	
	//validate the id ->not valid retun 404
	if(!ObjectID.isValid(id)) {
		
		res.status(404).send();
		
	}
	
	//remove todo by id
	Todo.findByIdAndRemove(id).then((todo) => {
		
		//success
			//if no doc, send 404
			if(!todo) {
				return res.status(404).send();
			} else if(null) {
				return console.log('Todo has been removed');
			}
			//if doc, send doc back with 200
			res.status(200).send({todo});
		
	}, (e) => {
		res.status(404).send();
	});
	
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

//POST /users
app.post('/users', (req, res) => {
	
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);
	
	user.save().then(() => {
		
		return user.generateAuthToken();
		//res.send(user);
		
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	});
		
});

//var authenticate = (req, res, next) => {
//	
//	var token = req.header('x-auth');
//	
//	User.findByToken(token).then((user) => {
//		
//		if(!user) {
//			return Promise.reject();
//		}
//		
//		req.user = user;
//		req.token = token;
//		next();
//		
//	}).catch((e) => {
//		res.status(401).send();
//	});
//	
//};

app.get('/users/me', authenticate, (req, res) => {
	
	res.send(req.user);
	
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