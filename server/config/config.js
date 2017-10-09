//Heroku environment variable only
var env = process.env.NODE_ENV || 'development';
//console.log('env *****', env);

if(env === 'development') {
	process.env.PORT = 3000; //locally
	process.env.MONGOLAB_URI = 'mongodb://localhost:27017/TodoApp';
} else if(env === 'test') {
	process.env.PORT = 3000; //test environment
	process.env.MONGOLAB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
