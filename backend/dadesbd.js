const mongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/'; // connecta a la base de dades 'othello' dins d'una bd MongoDB local al port 27017
const bd = 'othello';
const jugadorsCollection = 'jugadors';

exports.mongoClient = mongoClient;
exports.bd = bd;
exports.url = url;
exports.jugadorsCollection = jugadorsCollection;
