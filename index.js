// Require things
const express = require('express');
const pg = require('pg');
const pgClient = new pg.Client(connectionString);
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
pgClient.connect();

// Connect to DB

// Make a promise

// If not initialized then make the table for tasks

CREATE TABLE tasks{

}

// Check command

// Read DB

// Write DB || List DB
