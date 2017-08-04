const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
admin.initializeApp(functions.config().firebase);

const app = express();

app.get('/Post', (request, response) => {
    const name = request.query.name;
    const age = request.query.age;
    admin.database().ref().push({ name: name, age: age }).then(snapshot => {
        response.send(true);
        // response.redirect(303, snapshot.ref);
    });
});

app.get('/Get', (request, response) => {
    admin.database().ref('/').once('value').then(snapshot => {
        response.send(snapshot.val());
    });
});

app.get('/Put', (request, response) => {
    const keys = request.query.keys;
    const name = request.query.name;
    const age = request.query.age;

    admin.database().ref(keys).once('value').then(snapshot => {
        var newupdatedata = {
            "name": name,
            "age": age
        };
        admin.database().ref().child(keys).update(newupdatedata);
        response.send(true);
        // response.redirect(303, snapshot.ref);
    });
});

app.get('/GetKey', (request, response) => {
    const keys = request.query.keys;
    admin.database().ref(keys).once('value').then(snapshot => {
        response.send(snapshot.val());
    });
});

app.get('/Delete', (request, response) => {
    const keys = request.query.keys;
    admin.database().ref(keys).once('value').then(snapshot => {
        admin.database().ref().child(keys).remove();
        response.send(true);
    });
});

exports.User = functions.https.onRequest(app);



