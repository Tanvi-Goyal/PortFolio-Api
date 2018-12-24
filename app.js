const express = require('express');
const app = express();

// const myRoutes = require('./api/routes/data');

// app.use('/data' , myRoutes);

const body = require('body-parser');

var admin = require("firebase-admin");

var serviceAccount = require("./security-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://myportfolio-7155f.firebaseio.com"
});

var database = admin.database();

app.use(body.urlencoded({
    extended: true
}));
app.use(body.json());

app.get('/', (req, res) => {
    database.ref().on('value', function(snapshot) {
        res.json(snapshot.val())
    })
})

module.exports = app;