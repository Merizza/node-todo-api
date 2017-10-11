const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
/*
Setting up the user model

{
	email: 'momo@example.com',
	password: 'dbfsskskfnsddbdsfsk',
	tokens: [{
		acces: 'auth',
		token: 'sdbfskfbkjfsjkbkjhwkk'
	}]

}

*/

var UserSchema = new mongoose.Schema({
	
	email: {
		type: String,
		required: true,
		minLength: 1,
		trim: true,
		unique: true,	//prevent a duplicated email
		validate: {
//			validator: (value) => {
//				return validator.isEmail(value);
//			},
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email',
			required: [true, 'User email required']
		}
	}, 
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		}
	}, {
		token: {
			type: String,
			required: true
		}
	}]
	
});

UserSchema.methods.toJSON = function() {
	
	var user = this;
	var userObject = user.toObject();
	
	return _.pick(userObject, ['_id', 'email']);
	
}

UserSchema.methods.generateAuthToken = function () {
	
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
	//var token = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123').toString();
	user.tokens.push({access, token});
	//user.tokens.push({access: access, token: token});
	
	return user.save().then(() => {
		return token;
	});
	
//	user.save().then(() => {
//		return token;
//	}).then((token) => {
//		
//	});
	
};

var User = mongoose.model('Users', UserSchema);

module.exports = {User};



//var User = mongoose.model('Users', {
//	
//	email: {
//		type: String,
//		required: true,
//		minLength: 1,
//		trim: true,
//		unique: true,	//prevent a duplicated email
//		validate: {
////			validator: (value) => {
////				return validator.isEmail(value);
////			},
//			validator: validator.isEmail,
//			message: '{VALUE} is not a valid email'
//		}
//	}, 
//	password: {
//		type: String,
//		required: true,
//		minlength: 6
//	},
//	tokens: [{
//		access: {
//			type: String,
//			required: true
//		}
//	}, {
//		token: {
//			type: String,
//			required: true
//		}
//	}]
//	
//});

//module.exports = {
//	User: User
//};



















