// MANAGES CONNECTIONS TO THE DATABASE

const mongoose = require("mongoose");

// suppress warning
mongoose.set('strictQuery', true);

// create connection to DB (declare URI and pass to connect method)
// use NODE_ENV to connect to different database in prod
let dbURI = 'mongodb://localhost/prototype4';
if (process.env.NODE_ENV === 'production') {
    dbURI = `mongodb+srv://penguin0001:${process.env.DB_PW}@prototype4.cdcwbcv.mongodb.net/?retryWrites=true&w=majority`;
}
mongoose.connect(dbURI, {useNewUrlParser: true});

// monitors for succesful connection through mongoose
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


// bring in the schema
require('../models/users');