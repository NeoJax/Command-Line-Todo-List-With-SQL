// Require things
const pg = require('pg');
const add = require('./commands/add.js');
const complete = require('./commands/complete.js');
const del = require('./commands/delete.js');
const list = require('./commands/list.js');

const command = process.argv[2];
const string = process.argv[3];
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
const client = new pg.Client(connectionString);

// Connect to DB
const connect = client.connect();

// If not initialized then make the table for tasks
connect.query(() => {

});

// Check command
if (command === 'add') {
  console.log('blahadd');
} else if (command === 'list') {
  console.log('blahlist');
} else if (command === 'complete') {
  console.log('blahcomplete');
} else if (command === 'delete') {
  console.log('blahdelete');
} else if (command === 'reset') {
  console.log('reste');
} else {
  console.log('Wrong command silly');
}


// Read DB

// Write DB || List DB
