// MANAGES CONNECTIONS TO THE DATABASE

// note: mongorestore --uri mongodb+srv://penguin0001:N41L5time@prototype1cluster.dxoyhux.mongodb.net 
const mongoose = require("mongoose");

// suppress warning
mongoose.set('strictQuery', true);

// create connection to DB (declare URI and pass to connect method)
// use NODE_ENV to connect to different database in prod
// !(put pw in env?)
let dbURI = 'mongodb://localhost/prototype4';
if (process.env.NODE_ENV === 'production') {
    dbURI = `mongodb+srv://penguin0001:${process.env.DB_PW}@prototype4.cdcwbcv.mongodb.net/?retryWrites=true&w=majority`;
}
mongoose.connect(dbURI, {useNewUrlParser: true});

// now...connection event
// monitors for succesful connecection through mongoose
mongoose.connection.on("connected", () => {
    console.log(`Mongoose connected to ${dbURI}`);
});
// checks for connection error
mongoose.connection.on("error", err => {
    console.log("Mongoose connection error: ", err);
});
// checks for disconnection event
mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
});


// now need to close it (listen for SIGINT/SIGUSR2)
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through ${msg}`)
        callback();
    })
}

// event node uses
process.once('SIGUS2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// main event
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

// what heroku uses...maybe others do to?
process.on('SIGTERM', () => {
    gracefulShutdown('uh, host app shutdown?', () => {
        process.exit(0);
    });
});

// bring in the schema
require('../models/users');


