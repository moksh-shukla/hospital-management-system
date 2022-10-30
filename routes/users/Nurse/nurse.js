const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const patient = express.Router();

const db = require('../../../utils/db');

process.env.SECRET_KEY = 'Arijit';

nurse.post('/nurse_register', (req, res) => {

    const nurseData = {
        nurse_id  : req.body.nurse_id,
        name   : req.body.name,
        position       : req.body.position,
        status    : req.body.status,
    }

    let create = `INSERT INTO nurse (nurse_id, name, position, status)
                  VALUES ("${nurseData.nurse_id}",
                          "${nurseData.name}",
                          "${nurseData.position}",
                          "${nurseData.status}"
                          )`;

    db.query(create, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("database created")
        res.send(result)
    });
    
});

nurse.post('/nurse_delete', (req, res) => {

    const nurseData = {
        nurse_id  : req.body.nurse_id,
    }

    let create = `DELETE FROM nurse WHERE nurse_id = "${nurseData.nurse_id}"`;

    db.query(create, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("Deleted!")
        res.send(result)
    });
    
});


module.exports = nurse;