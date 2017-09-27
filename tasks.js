// Require things
const pg = require('pg');
const add = require('./commands/add.js');
const complete = require('./commands/complete.js');
const del = require('./commands/delete.js');
const list = require('./commands/list.js');

const command = process.argv[2];
const string = process.argv[3];
const connectionString = process.env.DATABASE_URL || 'postgresql://NeoJax@localhost:5432/todo';
const client = new pg.Client(connectionString);

// Connect to DB
client.connect();

// If not initialized then make the table for tasks

// Read DB
function checkData() {
  return new Promise((resolve, reject) => {
    client.query('SELECT * FROM tasks WHERE completed = false', (err, res) => {
      client.end();
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

// Write DB || List DB
function writeData() {
  return new Promise((resolve, reject) => {
    client.query('INSERT INTO tasks (task) VALUES($1)', [string], (err, res) => {
      client.end();
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

function completeData() {
  return new Promise((resolve, reject) => {
    client.query('UPDATE tasks SET completed = 1 WHERE id = $1', [string], (err, res) => {
      client.end();
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

function deleteData() {
  return new Promise((resolve, reject) => {
    client.query('DELETE FROM tasks WHERE id = $1', [string], (err, res) => {
      client.end();
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

function resetData() {
  return new Promise((resolve, reject) => {
    client.query('DROP TABLE tasks', [string], (err, res) => {
      client.end();
      if (err) {
        reject(err);
      }
      resolve(res);
    });
    client.query('CREATE TABLE tasks(ID INT NOT NULL, TASK CHAR, COMPLETE BOOLEAN, PRIMARY KEY(ID))', [string], (err, res) => {
      client.end();
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

// Check command
if (command === 'add') {
  writeData();
} else if (command === 'list') {
  checkData().then((data) => {
    console.log(data.rows);
  });
} else if (command === 'complete') {
  completeData();
} else if (command === 'delete') {
  deleteData();
} else if (command === 'reset') {
  resetData();
} else {
  console.log('Wrong command silly');
}
