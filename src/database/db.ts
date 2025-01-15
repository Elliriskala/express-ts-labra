import Database from 'better-sqlite3';
import {checkData, exampleData, filename, tables} from './db-config';

const db = new Database(filename);
db.pragma('journal_mode = WAL');

// init tables, use exec only for CREATE TABLE
db.exec(tables);

// Check if the articles table is empty
const rowCount = (db.prepare(checkData).get() as {count: number}).count;
// If the table is empty, insert example data
if (rowCount === 0) {
  db.exec(exampleData);
  console.log('Inserted example data.');
} else {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Table already populated.');
  }
}

export default db;
