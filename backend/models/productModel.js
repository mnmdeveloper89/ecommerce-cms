const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const { join } = require('path');

// putanja do fajla
const file = join(__dirname, '../db.json');
const adapter = new JSONFile(file);

// važno: postavljanje default vrednosti u konstruktoru
const db = new Low(adapter, { products: [] });

module.exports = db;
