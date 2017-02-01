const sequelize = require('./db/connection.js');
const User = require('./db/models/user.model.js')
const express = require('express');
const app = express();


app.get('/connect', function (req, res, next) {
  sequelize
  .authenticate()
  .then(function(err) {
    res.end('Connection has been established successfully.');
    next();
  })
  .catch(function (err) {
    res.end('Unable to connect to the database:', err);
    next();
  });
})

app.get('/create', function (req, res, next) {

	// force: true will drop the table if it already exists
	User.sync({force: false}).then(function () {
	  // Table created
	  return User.create({
	    firstName: 'Digender',
	    lastName: 'Mahara'
	  })
	}).then((result) => {
		res.json({ user: result }).end();
	}).catch((err) => {
		res.status(500).end(err);
	});
});

app.get('/bulk-create', function (req, res, next) {
	User.sync({force: true}).then(() => {
	  // Table created
	  return User.bulkCreate([
		  { firstName: 'barfooz', lastName: 'Pagal' },
		  { firstName: 'foo', lastName: 'Pagli' },
		  { firstName: 'bar', lastName: 'Daru' }
		]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
		  return User.findAll();
		}).then((users) => {
		  res.json(users) // ... in order to get the array of user objects
		});
	});
});

app.get('/update/:id', function (req, res, next) {
	const fname = 'Abhishek';
	const lname = 'Roy';
	return User
		.update({
			firstName: fname,
			lastNme: lname,
		}, 
		{
			where: { id: req.params.id},
		})
		.then((user) => {
	    	res.json(user[0]);
		});
});

app.get('/fetch', (req, res) => {
	return User.findOne().then((user) => {
    	res.json(user);
	});
});

app.get('/fetch/:id', (req, res) => {
	return User.find({ where: { id: req.params.id } }).then((user) => {
    	res.json(user);
	});
});

app.get('/remove/:id', (req, res) => {
	return User.find({ where: { id: req.params.id } }).then((user) => {
		const userDestroyed = user;
		//to forcefully delete use .destroy({ force: true })
		user.destroy();
    	res.json(userDestroyed);
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})