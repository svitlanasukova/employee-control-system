const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 8080;

// Allow all origins to access the API
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Read data from JSON file and store it in a variable
let data = JSON.parse(fs.readFileSync('data.json'));

// GET method to retrieve all users
app.get('/users', (req, res) => {
	res.send(data.users);
});

// GET method to retrieve a single user by ID
app.get('/users/:id', (req, res) => {
	const user = data.users.find(u => u.id == req.params.id);
	if (user) {
		res.send(user);
	} else {
		res.status(404).send('User not found');
	}
});

// POST method to create a new user
app.post('/users', (req, res) => {
	const { name, surname, sessions } = req.body;
	const id = data.users.length + 1;
	data.users.push({ id, name, surname, sessions });
	// res.send(`User ${id} created`);
	res.json({ id: id });
});

// PUT method to add a new session for a user
app.put('/users/:id/sessions', (req, res) => {
	const { date, feedback, comment } = req.body;
	const user = data.users.find(u => u.id == req.params.id);
	const id = user.sessions.length + 1;
	user.sessions.push({ id, date, feedback, comment });
	// res.send(`Session added for user ${user.id}`);
	res.json({ id: user.id });
});

// UPDATE method to update user data
app.patch('/users/:id', (req, res) => {
	const user = data.users.find(u => u.id == req.params.id);
	if (req.body.name) user.name = req.body.name;
	if (req.body.surname) user.surname = req.body.surname;
	if (req.body.sessionId && req.body.sessionData) {
		const session = user.sessions.find(s => s.id == req.body.sessionId);
		session.date = req.body.sessionData.date || session.date;
		session.feedback = req.body.sessionData.feedback || session.feedback;
		session.comment = req.body.sessionData.comment || session.comment;
	}
	res.send(`User ${user.id} updated`);
});

// UPDATE method to update user session data
app.patch('/users/:id/sessions/:sessionId', (req, res) => {
	const user = data.users.find(u => u.id == req.params.id);
	if (req.body.sessionId && req.body.sessionData) {
		const session = user.sessions.find(s => s.id == req.body.sessionId);
		session.date = req.body.sessionData.date || session.date;
		session.feedback = req.body.sessionData.feedback || session.feedback;
		session.comment = req.body.sessionData.comment || session.comment;
	}
	res.send(`User\`s ${user.id} session ${req.body.sessionId} was updated`);
});

// DELETE method to delete user data
app.delete('/users/:id', (req, res) => {
	const userIndex = data.users.findIndex(u => u.id == req.params.id);
	if (userIndex !== -1) {
		data.users.splice(userIndex, 1);
		res.send(`User ${req.params.id} deleted`);
	} else {
		res.status(404).send('User not found');
	}
});

// DELETE method to delete user session
app.delete('/users/:id/sessions/:sessionId', (req, res) => {
	const userIndex = data.users.findIndex(u => u.id == req.params.id);
	const userSessionIndex = data.users[userIndex].sessions.findIndex(
		s => s.id == req.params.sessionId,
	);
	if (userIndex !== -1) {
		data.users[userIndex].sessions.splice(userSessionIndex, 1);
		res.send(`Users ${req.params.id} session ${req.params.sessionId} deleted`);
	} else {
		res.status(404).send('User not found');
	}
});

// Save all data to JSON file
app.post('/save', (req, res) => {
	fs.writeFile('data.json', JSON.stringify(data), err => {
		if (err) {
			console.error(err);
			res.status(500).send('Error saving data');
		} else {
			res.send('Data saved');
		}
	});
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
