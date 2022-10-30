const express = require('express');
const res = require('express/lib/response');

const api = express.Router();

const db = require('../../utils/db');


api.post('/login/patient', (req, res) => {
    const sql = `
                SELECT * FROM patient
                where patient.patient_id = ${req.body.user_id} and patient.password = ${req.body.password};
              `
    try {
        db.query(sql, (err, result) => {
            if (err) console.log(err);

            res = res.json(result);
        });
    }
    catch (e) {
        console.log(e.message);
        res.json({
            error: {
                message: e.message
            }
        })
    }
})

api.post('/login/doctor', (req, res) => {
    const sql = `
                SELECT * FROM doctor
                where doctor.doctor_id = ${req.body.user_id} and doctor.password = ${req.body.password};
              `
    try {
        db.query(sql, (err, result) => {
            if (err) console.log(err);

            res = res.json(result);
        });
    }
    catch (e) {
        console.log(e.message);
        res.json({
            error: {
                message: e.message
            }
        })
    }
})

api.get('/doctors', (req, res) => {
    const sql = `SELECT doctor.doctor_id, doctor.name as doctor_name, dept.name as dept_name, doctor.charge FROM doctor
    inner join dept on doctor.dept_id = dept.dept_id;`
    try {
        db.query(sql, (err, result) => {
            if (err) console.log(err);

            res = res.json(result);
        });
    }
    catch (e) {
        console.log(e.message);
        res.json({
            error: {
                message: e.message
            }
        })
    }
    // console.log(result);
});

api.get('/patients', (req, res) => {
    const sql = "SELECT * FROM patient";

    db.query(sql, (err, result) => {
        if (err) console.log(err);

        res.json(result);
    });
});

api.get('/depts', (req, res) => {
    const sql = "SELECT * FROM dept";

    db.query(sql, (err, result) => {
        if (err) console.log(err);

        res.json(result);
    });
});

api.get('/nurses', (req, res) => {
    const sql = "SELECT * FROM nurse";

    db.query(sql, (err, result) => {
        if (err) console.log(err);

        res.json(result);
    });
});

api.get('/nurses/profile', (req, res) => {
    let sql = `SELECT * FROM nurse where nurse.nurse_id = "${req.query.nurse_id}";`

    db.query(sql, (err, result) => {
        if (err) console.log(err);

        res.json(result);
    });
});

api.get('/procedures', (req, res) => {
    const sql = "SELECT * FROM procedures";

    db.query(sql, (err, result) => {
        if (err) console.log(err);

        res.json(result);
    });
});

api.get('/rooms', (req, res) => {
    const sql = "SELECT * FROM operating_rooms";

    db.query(sql, (err, result) => {
        if (err) console.log(err);

        res.json(result);
    });
});

api.get('/stayrooms', (req, res) => {
    const sql = "SELECT * FROM room";

    db.query(sql, (err, result) => {
        if (err) console.log(err);

        res.json(result);
    });
});

api.get('/medicines', (req, res) => {
    const sql = "SELECT * FROM medicines";

    db.query(sql, (err, result) => {
        if (err) console.log(err);
        res.json(result)
    });
});

api.get('/queries', (req, res) => {
    const sql = `SELECT q.query_id,
                q.poster_type,
                q.poster_id,
                p.name,
                q.parent_query_id,
                q.date,
                q.description
            FROM queries as q
            inner join patient as p ON (q.poster_type = "PATIENT" and q.poster_id = p.patient_id)
            where q.parent_query_id is null
            Union
            SELECT q.query_id,
                q.poster_type,
                q.poster_id,
                d.name,
                q.parent_query_id,
                q.date,
                q.description
            FROM queries as q
            inner join doctor as d ON (q.poster_type = "DOCTOR" and q.poster_id = d.doctor_id)
            where q.parent_query_id is null;`;

    db.query(sql, (err, result) => {
        if (err) console.log(err);
        res.json(result)
    });
});

api.get('/replies', (req, res) => {
    const sql = `SELECT query_id,
                date,
                description
                FROM queries
                where parent_query_id = "${req.query.parent_query_id}";`
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        res.json(result)
    });
})


api.post('/reg_appointments', (req, res) => {
    const appData = {
        app_no: req.body.app_no,
        slot: req.body.slot,
        problem: req.body.problem,
        doctor_id: req.body.doctor_id,
        patient_id: req.body.patient_id,
        nurse_id: req.body.nurse_id,
        procedure_id: req.body.procedure_id,
        room_no: req.body.room_no,
        date: req.body.date,
        paid: req.body.paid
    }

    let create = `INSERT INTO appointments (app_no, slot, problem, doctor_id, patient_id, nurse_id, procedure_id, room_no, date, paid)
                  VALUES ("${appData.doctor_id}", "${appData.slot}", "${appData.problem}", "${appData.doctor_id}", "${appData.patient_id}", "${appData.nurse_id}", "${appData.procedure_id}", "${appData.room_no}", "${appData.date}", "${appData.paid}");`;

    db.query(create, (err, result) => {
        if (err) console.log(err);

        res.json(result);
    });
});

api.get('/stay', (req, res) => {
    const sql = `select stay.stay_no,
                    stay.start_date,
                    stay.end_date,
                    patient.patient_id,
                    patient.name,
                    stay.room_no,
                    room.room_type,
                    room.rent
                    from stay 
                    inner join patient on patient.patient_id = stay.patient_id
                    inner join room on room.room_no = stay.room_no
                    `;

    db.query(sql, (err, result) => {
        if (err) console.log(err);
        res.json(result);
    });
});

api.post('/del_appointments', (req, res) => {
    const appData = {
        app_no: req.body.app_no,
    }

    let create = `DELETE FROM appointments WHERE app_no = "${appData.app_no}"`;

    db.query(create, (err, result) => {
        if (err) {
            console.log("error seen in a query")
            throw (err)
        }
        console.log("Deleted!")
        res.send(result)
    });
});


api.post('/reg_stay', (req, res) => {
    const stayData = {
        stay_no: req.body.stay_no,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        room_no: req.body.room_no,
        patient_id: req.body.patient_id,
        paid: req.body.paid
    }

    let create = `INSERT INTO stay (stay_no, start_date, end_date, room_no, patient_id, paid)
                    VALUES ("${stayData.stay_no}", "${stayData.start_date}", "${stayData.end_date}", "${stayData.room_no}", "${stayData.patient_id}", "${stayData.paid}")`;

    db.query(create, (err, result) => {
        if (err) console.log(err);

        res.json(result);
    });
});

api.get('/appointments', (req, res) => {
    const sql = `SELECT distinct 
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
            inner join operating_rooms on appointments.room_no = operating_rooms.room_no;`;

    db.query(sql, (err, result) => {
        if (err) console.log(err);

        res.json(result);
    });
});


api.post('/del_stay', (req, res) => {
    const stayData = {
        stay_no: req.body.stay_no,
    }

    let create = `DELETE FROM stay WHERE stay_no = "${stayData.stay_no}"`;

    db.query(create, (err, result) => {
        if (err) {
            console.log("error seen in a query")
            throw (err)
        }
        console.log("Deleted!")
        res.send(result)
    });
});

api.post('/del_query', (req, res) => {
    const querData = {
        "query_id"  : req.body.query_id,
    }

    let query = `DELETE FROM queries WHERE query_id = "${querData.query_id}" OR parent_query_id = "${querData.query_id}"`;


    db.query(query, (err, result) => {
        if(err){
            console.log("error seen in a query")
            throw(err)
        }
        console.log("Deleted!")
        res.send(result)
    });
});

// api.get();

module.exports = api;