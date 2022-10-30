const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const patient = express.Router();

const db = require('../../../utils/db');

process.env.SECRET_KEY = 'Arijit';

patient.post('/patAppointments', (req,res) => {
    const patData = {
        "patient_id" : req.body.patient_id,
    }
    let query = `SELECT distinct 
                appointments.app_no,
                appointments.slot,
                appointments.problem,
                doctor.name as doctor_name,
                doctor.charge,
                patient.name as patient_name,
                appointments.nurse_id,
                nurse.name as nurse_name,
                appointments.procedure_id,
                procedures.type,
                procedures.cost,
                appointments.room_no,
            operating_rooms.room_type
            FROM appointments 
            inner join doctor on appointments.doctor_id = doctor.doctor_id 
            inner join patient on appointments.patient_id = "${patData.patient_id}" and patient.patient_id  = "${patData.patient_id}"
            inner join nurse on appointments.nurse_id = nurse.nurse_id
            inner join procedures on appointments.procedure_id = procedures.procedure_id
            inner join operating_rooms on appointments.room_no = operating_rooms.room_no;`
    
            db.query(query, (err, result) => {
                if(err){
                    console.log("error seens in a query")
                    throw(err)
                }
                console.log(result)
                res.send(result)
            });

});

patient.put('/patient_paid', (req, res) => {

    const patData = {
        "patient_id": req.body.patient_id,
    }

    let query = `UPDATE appointments SET paid = "Y" WHERE patient_id = "${patData.patient_id}";`;

    db.query(query, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("database created")
        res.send(result)
    });
    
});

patient.put('/stay_paid', (req, res) => {

    const patData = {
        "stay_no": req.body.stay_no,
    }

    let query = `UPDATE stay SET paid = "Y" WHERE stay_no = "${patData.stay_no}";`;

    db.query(query, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("database created")
        res.send(result)
    });
    
});


patient.post('/patprescription', (req, res) => {

    const patientData = {
        "patient_id" : req.body.patient_id,
    }

    let query = `SELECT prescription.prescription_no, 
    prescription.patient_id, patient.name,
    prescription.doctor_id, doctor.name, 
    prescription.med_code, medicines.name, medicines.brand, medicines.cost, prescription.date
    FROM prescription
    inner join medicines on prescription.med_code = medicines.code 
    inner join doctor on prescription.doctor_id = doctor.doctor_id
    inner join patient on prescription.patient_id = "${patientData.patient_id}" and patient.patient_id = "${patientData.patient_id}"`;

    db.query(query, (err, result) => {
        if(err){
            console.log("error seens in a query")
            throw(err)
        }
        console.log(result)
        res.send(result)
    });
});

patient.post('/deletePresc', (res,req) => {
    const presData = {
        "precription_no" : req.body.precription_no
    }
    let query = `DELETE FROM prescription WHERE prescription_no="${presData.precription_no}";`
    db.query(query, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("Deleted")
        res.send(result)
    });
});

patient.post('/appBill', (res,req) => {
    const patData = {
        "patient_id" : req.body.patient_id
    }
    let query = `SELECT appointments.app_no, appointments.date, appointments.slot, patient.name, doctor.name, nurse.name,
                appointments.problem, procedures.type, appointments.room_no, doctor.charge, procedures.cost,
                (doctor.charge + procedures.cost) as total_amt
                FROM appointments
                INNER JOIN patient ON appointments.patient_id = "${patData.patient_id}" and patient.patient_id = "${patData.patient_id}"
                INNER JOIN doctor ON appointments.doctor_id = doctor.doctor_id
                INNER JOIN procedures ON appointments.procedure_id = procedures.procedure_id
                INNER JOIN nurse ON appointments.nurse_id = nurse.nurse_id
                INNER JOIN room ON appointments.room_no = room.room_no`;


    db.query(query, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("Deleted")
        res.send(result)
    });
});

patient.post('/prescBill', (res,req) => {
    const patData = {
        "patient_id" : req.body.patient_id
    }
    let query = `SELECT prescription.prescription_no, prescription.date, doctor.name, medicines.name, medicines.brand, medicines.description,
                prescription.count, prescription.comments, medicines.cost, 
                (medicines.cost*prescription.count) as total_amt
                FROM prescription
                INNER JOIN patient ON prescription.patient_id = "${patData.patient_id}" and patient.patient_id = "${patData.patient_id}"
                INNER JOIN doctor ON prescription.doctor_id = doctor.doctor_id
                INNER JOIN medicines ON medicines.code = prescription.med_code`;


    db.query(query, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("Deleted")
        res.send(result)
    });
});

patient.post('/stayBill', (res,req) => {
    const patData = {
        "patient_id" : req.body.patient_id
    }
    let query = `SELECT patient.patient_id, stay.start_date, stay.end_date, room.room_no, room.rent,
                DATEDIFF(stay.end_date, stay.start_date)* room.rent as total_amt
                FROM appointments
                INNER JOIN patient ON appointments.patient_id = "${patData.patient_id}" and patient.patient_id = "${patData.patient_id}"
                INNER JOIN stay ON appointments.patient_id = stay.patient_id
                INNER JOIN room ON appointments.room_no = room.room_no`;


    db.query(query, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("Deleted")
        res.send(result)
    });
});

patient.post('/queries', (res,req) => {
    
    let query = `SELECT  * from queries`
    db.query(query, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("Deleted")
        res.send(result)
    });
});

patient.post('/quer_post', (res,req) => {

    const querData = {
        "poster_id" : req.body.poster_id,
        "poster_type": req.body.poster_type
    }
    
    let query = `SELECT  * from queries
                WHERE poster_id = "${querData.poster_id}"
                AND poster_type = "${querData.poster_type}"`
    db.query(query, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("Deleted")
        res.send(result)
    });
});

patient.post('/quer_parent', (res,req) => {

    const querData = {
        "query_id" : req.body.query_id,
        "parent_query_id": req.body.parent_query_id
    }
    
    let query = `SELECT  * from queries
                WHERE query_id = "${querData.query_id}"
                AND parent_query_id = "${querData.parent_query_id}"
                AND query_id = parent_query_id`
    db.query(query, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("Deleted")
        res.send(result)
    });
});

patient.post('/patient_register', (req, res) => {

    const userData = {
        patient_id  : req.body.patient_id,
        name   : req.body.name,
        age       : req.body.age,
        weight    : req.body.weight,
        address: req.body.address,
        phoneno: req.body.phoneno,
        sex: req.body.sex,
        username: req.body.username,
        password: req.body.password
    }

    let create = `INSERT INTO patient (patient_id, name, age, weight, address, phoneno, sex, usernmane, password)
                  VALUES ("${userData.patient_id}",
                          "${userData.name}",
                          "${userData.age}",
                          "${userData.weight}",
                          "${userData.address}",
                          "${userData.phoneno}",
                          "${userData.sex}",
                          "${userData.username}",
                          "${userData.password}"  )`;

    db.query(create, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("database created")
        res.send(result)
    });
    
});

patient.post('/patient_delete', (req, res) => {

    const userData = {
        patient_id  : req.body.patient_id,
    }

    let create = `DELETE FROM patient WHERE patient_id = "${userData.patient_id}"`;

    db.query(create, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("Deleted!")
        res.send(result)
    });
    
});

patient.post('/login', (req, res) => {
    let find = `SELECT password, patient_id FROM patient WHERE email = "${req.body.email}"`;
    
    db.query(find, (err, result) => {
        if(err) console.log(err);
        // console.log(result);

        if(result[0] != undefined) {
            if(bcrypt.compareSync(req.body.password, result[0].password)) {
                let token = jwt.sign(result[0].patient_id, process.env.SECRET_KEY);
                res.send(token);
            } else {
                res.status(400).json({ error: 'User does not exist' })
            }
        } else {
            res.send("Email not found");
        }
    });
});

patient.get('/profile', (req, res) => {
    let patient_id = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    
    let patient = `SELECT * FROM patient WHERE patient_id = ${patient_id}`;
    db.query(patient, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});


patient.get('/details', (req, res) => {
    let patient_id = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

    let patient =  `SELECT 
                        *                        
                    FROM patient
                    WHERE patient_id = ${patient_id}`;
    db.query(patient, (err, result) => {
        if (err) console.log(err);
        // console.log(patient_id, result);
        res.send(result);
    });
});

patient.get('/doctor', (req, res) => {
    let patient_id = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

    let patient =  `SELECT 
                        d.first_name as doctor_firstname,
                        d.last_name doctor_lastname,
                        d.specialisation 
                    FROM assign_doctor ad
                    JOIN patient p
                        ON p.patient_id = ad.patient_id
                    JOIN doctors d
                        ON ad.doctor_id = d.doctor_id
                    WHERE p.patient_id = ${patient_id}`;
    db.query(patient, (err, result) => {
        if (err) console.log(err);
        // console.log(patient_id, result);
        res.send(result);
    });
})

patient.get('/bill', (req, res) => {
    let patient_id = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

    const bill = `SELECT * FROM bill WHERE patient_id = ${patient_id}`;

    db.query(bill, (err, result) => {
        res.send(result);
    })
})


module.exports = patient;