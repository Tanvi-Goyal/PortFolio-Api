const express = require('express');
const app = express();
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

app.get('/:folderName', (req, res) => {

    const folderName = req.params.folderName;
    database.ref(folderName).once('value', function(snapshot) {
        var arr = [];
        snapshot.forEach(function(child) {
            console.log(JSON.stringify(child.val()));
            arr.push(child.val());
          });

        res.send(arr);

    });
})

app.get('/:folderName/:number', (req, res) => {

    const folderName = req.params.folderName;
    const number = req.params.number;
    database.ref(folderName).child(number).on('value', function(snapshot) {
        res.json(snapshot.val())
    });
})

app.get('/:folderName/:skillName', (req, res) => {

    const folderName = req.params.folderName;
    const skillName = req.params.skillName;
    database.ref(folderName).child(skillName).on('value', function(snapshot) {
        var arr = [];
        snapshot.forEach(function(child) {
            console.log(JSON.stringify(child.val()));
            arr.push(child.val());
          });

        res.send(arr);

    });
})


module.exports = app;