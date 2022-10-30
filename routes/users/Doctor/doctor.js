const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const doctor = express.Router();

const db = require('../../../utils/db');


doctor.get('/appointments', (req, res) => {
    console.log(req.query.doctor_id)
    let query = `   SELECT distinct 
                    appointments.app_no,
                    appointments.slot,
                    appointments.problem,
                    doctor.doctor_id as doctor_id,
                    doctor.name as doctor_name,
                    doctor.charge,
                    patient.patient_id as patient_id,
                    patient.name as patient_name,
                    appointments.nurse_id,
                    nurse.name as nurse_name,
                    appointments.procedure_id,
                    procedures.type,
                    procedures.cost,
                    appointments.room_no,
                    operating_rooms.room_type,
                    appointments.date
                FROM appointments 
                inner join doctor on appointments.doctor_id = doctor.doctor_id 
                inner join patient on appointments.patient_id = patient.patient_id 
                inner join nurse on appointments.nurse_id = nurse.nurse_id
                inner join procedures on appointments.procedure_id = procedures.procedure_id
                inner join operating_rooms on appointments.room_no = operating_rooms.room_no
                where doctor.doctor_id = "${req.query.doctor_id}";
                `
    db.query(query, (err, result) => {
        if (err) {
            console.log("error seens in a query")
            throw (err)
        }
        console.log(result)
        res.send(result)
    });
});
 
doctor.get('/prescriptions', (req, res) => {
    console.log(req.query.doctor_id)
    let query = `   
                SELECT prescription.prescription_no,
                prescription.med_code,
                medicines.name,
                prescription.doctor_id,
                doctor.name as doctor_name,
                prescription.patient_id,
                patient.name as patient_name,
                prescription.count,
                prescription.comments,
                prescription.date,
                prescription.paid
                from prescription 
                inner join doctor on prescription.doctor_id = doctor.doctor_id
                inner join patient on prescription.patient_id = patient.patient_id
                inner join medicines on prescription.med_code = medicines.code
                where doctor.doctor_id = "${req.query.doctor_id}";
                `
    db.query(query, (err, result) => {
        if (err) {
            console.log("error seens in a query")
            throw (err)
        }
        console.log(result)
        res.send(result)
    });
});

// doctor.get('/queries', (req, res) => {
//     console.log(req.query.doctor_id)
//     let query = `
//                 SELECT doctor.doctor_id, doctor.name as doctor_name, dept.name as dept_name FROM doctor
//                 inner join dept on doctor.dept_id = dept.dept_id
//                 where doctor.doctor_id = "${req.query.doctor_id}";
//                 `
//     db.query(query, (err, result) => {
//         if (err) {
//             console.log("error seens in a query")
//             throw (err)
//         }
//         console.log(result)
//         res.send(result)
//     });
// })

doctor.post('/appointments', (req,res) => {
    const doctorData = {
        "doctor_id" : req.body.doctor_id,
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
            inner join doctor on appointments.doctor_id = "${doctorData.doctor_id}" and doctor.doctor_id = "${doctorData.doctor_id}"
            inner join patient on appointments.patient_id = patient.patient_id 
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

doctor.post('/deleteApp', (res,req) => {
    const appData = {
        app_no : req.body.app_no
    }
    let query = `DELETE FROM appointments WHERE app_no="${appData.app_no}";`
    db.query(query, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("Deleted")
        res.send(result)
    })
});

doctor.post('/docprescription', (req, res) => {

    const prescriptionData = {
        "doctor_id": req.body.doctor_id,
        "patient_id": req.body.patient_id,
    }
    

    let query = `SELECT prescription.prescription_no, 
                    prescription.doctor_id, doctor.name, prescription.patient_id, patient.name,
                    prescription.med_code, medicines.name, medicines.brand, medicines.cost, prescription.date
                    FROM prescription
                    inner join medicines on prescription.med_code = medicines.code 
                    inner join doctor on prescription.doctor_id = "${prescriptionData.doctor_id}" and  doctor.doctor_id = "${prescriptionData.doctor_id}"
                    inner join patient on prescription.patient_id = "${prescriptionData.patient_id}" and patient.patient_id = "${prescriptionData.patient_id}";`

                    db.query(query, (err, result) => {
                        if(err){
                            console.log("error seens in a query")
                            throw(err)
                        }
                        console.log(result)
                        res.send(result)
                    });
});


doctor.post('/deleteDocPresc', (res,req) => {
    const presDocData = {
        "doctor_id" : req.body.doctor_id
    }
    let query = `DELETE FROM prescription WHERE doctor_id="${presDocData.doctor_id}";`
    db.query(query, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("Deleted")
        res.send(result)
    });
});

doctor.put('/presc_paid', (req, res) => {

    const patData = {
        "prescription_no": req.body.prescription_no,
    }

    let query = `UPDATE prescription SET paid = "Y" WHERE prescription_no = "${patData.prescription_no}";`
    db.query(query, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("database created")
        res.send(result)
    });
    
});

doctor.post('/doctor_register', (req, res) => {

    const docData = {
        doctor_id  : req.body.doctor_id,
        name   : req.body.name,
        dept_id       : req.body.dept_id,
        charge    : req.body.charge,
        status: req.body.status,
        exam_room: req.body.exam_room,
        username: req.body.username,
        password: req.body.password
    }

    let create = `INSERT INTO doctor (doctor_id, name, dept_id, charge, status, exam_room, usernmane, password)
                  VALUES ("${docData.doctor_id}",
                          "${docData.name}",
                          "${docData.dept_id}",
                          "${docData.charge}",
                          "${docData.status}",
                          "${docData.exam_room}",
                          "${docData.username}",
                          "${docData.password}"  )`;

    db.query(create, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("database created")
        res.send(result)
    });
    
});

// doctor.post('/doc_delete', (req, res) => {

//     const docData = {
//         doctor_id  : req.body.doctor_id,
//     }

//     let create = `DELETE FROM doctor WHERE doctor_id = "${docData.doctor_id}"`;

//     db.query(create, (err, result) => {
//         if(err){
//             console.log("error seen in a query")
//             throw(err)
//         }
//         console.log("Deleted!")
//         res.send(result)
//     });
    
// });

// doctor.post('/login', (req, res) => {
//     let find = `SELECT password, doctor_id FROM doctors WHERE email = "${req.body.email}"`;
    
//     db.query(find, (err, result) => {
//         if(err) console.log(err);
//         console.log(result);

//         if(result[0] != undefined) {
//             if(bcrypt.compareSync(req.body.password, result[0].password)) {
//                 let token = jwt.sign(result[0].doctor_id, process.env.SECRET_KEY);
//                 res.send(token);
//             } else {
//                 res.send('Password incorrect');
//             }
//         } else {
//             res.send("Email not found");
//         }
//     });
// });

// doctor.get('/patient', (req,res) => {
//     let doctor_id = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    
//     const sql = `SELECT 
//                     p.patient_id,
//                     p.first_name,
//                     p.last_name
//                 FROM assign_doctor ad
//                     JOIN patient p ON p.patient_id = ad.patient_id
//                     JOIN doctors d ON d.doctor_id = ad.doctor_id
//                 WHERE ad.doctor_id = ${doctor_id}

//                 `
//     console.log(sql);
//     db.query(sql, (err, result) => {
//         if (err) console.log(err);
//         res.send(result);

//     });
// })

doctor.get('/queries', (req,res) => {
    let sql = `SELECT q.query_id,
                q.poster_type,
                q.poster_id,
                d.name,
                q.parent_query_id,
                q.date,
                q.description
            FROM queries as q
            inner join doctor as d ON (q.poster_type = "DOCTOR" and q.poster_id = d.doctor_id)
            where q.parent_query_id is null and d.doctor_id = ${req.query.doctor_id};`
    
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        res.json(result)
    });
});


doctor.get('/profile', (req, res) => {
    let doctor_id = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    
    let user = `SELECT * FROM doctors WHERE doctor_id = ${doctor_id}`;
    db.query(user, (err, result) => {
        if (err) console.log(err);
        res.send(result);

    });
});

doctor.post('/delete', (req, res) => {
    const find = `SELECT * FROM doctors WHERE doctor_id = ${req.body.doctor_id}`;
    let del =  `DELETE FROM doctors WHERE doctor_id = ${req.body.doctor_id}`

    db.query(find, (err1, result1) => {
        if(err1) console.log(err1);

        if(result1[0] != undefined) {
            db.query(del, (err2, result2) => {
                res.send('DELETED');
            })
        }
    })
});

doctor.post('/update_sal', (req, res) => {
    const find = `SELECT * FROM doctors WHERE doctor_id = ${req.body.doctor_id}`;
    const upd = `UPDATE doctors 
                    SET salary =" ${req.body.salary}"
                    WHERE doctor_id = ${req.body.doctor_id}`;

    db.query(find, (err1, result1) => {
        if(err1) console.log(err1);

        if(result1[0] != undefined) {
            db.query(upd, (err2, result2) => {
                res.send('UPDATED');
            })
        }
    })
});

module.exports = doctor;