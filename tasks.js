#!/usr/bin/env node
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

function dropData() {
  return new Promise((resolve, reject) => {
    client.query('DROP TABLE tasks', (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

function createData() {
  return new Promise((resolve, reject) => {
    client.query('CREATE TABLE tasks(ID SERIAL, TASK VARCHAR(255), COMPLETED BOOLEAN, PRIMARY KEY(ID))', (err, res) => {
      client.end();
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

// If not initialized then make the table for tasks
// try {
//   checkData();
// } catch (error) {
//   console.log();
// }

// Check command
if (command === 'add') {
  add.add(client, string);
} else if (command === 'list') {
  list.list(client).then((data) => {
    console.log(data.rows);
  });
} else if (command === 'complete') {
  complete.complete(client, string);
} else if (command === 'delete') {
  del.del(client, string);
} else if (command === 'reset') {
  dropData();
  createData();
} else {
  console.log('Wrong command silly');
}
