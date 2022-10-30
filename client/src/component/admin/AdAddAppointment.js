import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import 'bootstrap/dist/css/bootstrap.min.css'
import { getAppointments, getDoctors, getPatients, getNurses, getProcedures, getRooms } from '../../requests';

export default function AdAddAppointment(props) {

    const today = new Date();
    // console.log(today);
    const [filterProp, changeFilterProp] = useState({
        "date": today,
        "slot": "",
        "patient_name": "",
        "doctor_name": "",
        "procedure_name": ""
    })

    const [appointment, changeAppointment] = useState({
        "slot": 0,
        "problem": "",
        "doctor_id": "",
        "patient_id": "",
        "nurse_id": "",
        "procedure_id": "",
        "room_no": "",
        "type": "",
        "date": ""
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let handleSubmit = () => {
        //add code to submit the new
    }

    const [showAppointment, changeShowAppointment] = useState([{}])

    let deleteAppointment = async (app_no) => {

    }

    useEffect(() => {
        console.log(appointment);
    }, [appointment])

    let showFilterProps = () => {
        return (
            <div className='container'>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="start_date"
                                placeholder="Enter Date"
                                onChange={(e) => { changeFilterProp({ ...filterProp, "date": e.target.value }) }}
                                selected={filterProp.start_date}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Slot</Form.Label>
                            <Form.Select
                                aria-label="Select Slot"
                                onChange={(e) => { changeFilterProp({ ...filterProp, "slot": e.target.value }) }}
                                value={filterProp.slot}>
                                <option>Open this select menu</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Patient Name</Form.Label>
                            <Form.Select
                                aria-label="Select Slot"
                                onChange={(e) => { changeFilterProp({ ...filterProp, "patient_name": e.target.value }) }}
                                value={filterProp.patient_name}>
                                <option>Open this select menu</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Doctor Name</Form.Label>
                            <Form.Select
                                aria-label="Select Slot"
                                onChange={(e) => { changeFilterProp({ ...filterProp, "doctor_name": e.target.value }) }}
                                value={filterProp.doctor_name}>
                                <option>Open this select menu</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Procedure Name</Form.Label>
                            <Form.Select
                                aria-label="Procedure Room"
                                onChange={(e) => { changeFilterProp({ ...filterProp, "procedure_name": e.target.value }) }}
                                value={filterProp.procedure_name}>
                                <option>Open this select menu</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </Form>
                <div>
                    <Button align="center" variant="secondary" onClick={() => {
                        changeFilterProp({})
                    }}>
                        Clear Filter
                    </Button>
                </div>
            </div>
        );
    }
    const [doctors, changeDoctors] = useState([{}])
    let showDoctors = async () => {
        let data = await getDoctors();
        changeDoctors(data)
    }
    const [patients, changePatients] = useState([{}])
    let showPatients = async () => {
        let data = await getPatients();
        changePatients(data)
    }
    const [nurses, changeNurses] = useState([{}])
    let showNurses = async () => {
        let data = await getNurses();
        changeNurses(data)
        console.log(nurses)
    }
    const [procedures, changeProcedures] = useState([{}])
    let showTypeOfAppointments = async () => {
        let data = await getProcedures();
        changeProcedures(data)
    }
    const [rooms, changeRooms] = useState([{}])
    let showRooms = async () => {
        let data = await getRooms();
        changeRooms(data)
    }

    const [todaySlots, changeTodaySlots] = useState([1, 2, 3, 4, 5, 6, 7, 8])
    const [todayOccSlots, changeTodayOccSlots] = useState()

    let showTodaySlots = () => {
        let occSlots = {}
        showAppointment.forEach(app => {
            // console.log(app)
            // var app_date = new Date(app.date.replace)
            // if ( == today) 
            if (occSlots['D' + app.doctor_id] == null) occSlots['D' + app.doctor_id] = [];
            occSlots['D' + app.doctor_id].push(app.slot)
            // if (occSlots[app.doctor_id+app.doctor_name] == null) occSlots[app.doctor_id+app.doctor_name] = new Array();
            // else occSlots[app.doctor_id+app.doctor_name].push(app.slot)
            if (occSlots['P' + app.patient_id] == null) occSlots['P' + app.patient_id] = [];
            occSlots['P' + app.patient_id].push(app.slot)
            if (occSlots['N' + app.nurse_id] == null) occSlots['N' + app.nurse_id] = [];
            occSlots['N' + app.nurse_id].push(app.slot)
            if (occSlots['R' + app.room_no] == null) occSlots['R' + app.room_no] = [];
            occSlots['R' + app.room_no].push(app.slot)
            // }
        });
        changeTodayOccSlots(occSlots)
        console.log(todayOccSlots)
    }

    let setShowAppointments = async () => {
        let data = await getAppointments();
        changeShowAppointment(data)
    }

    useEffect(() => {
        setShowAppointments();
        showDoctors();
        showPatients();
        showNurses();
        showTypeOfAppointments();
        showRooms();
        // console.log(showAppointment)
    }, [])

    useEffect(() => {
        showTodaySlots();
    }, [doctors, patients, nurses, procedures, rooms])

    let showTable = () => {
        return (
            <div className='container'>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">App. No.</th>
                            <th scope="col">Slot</th>
                            <th scope="col">Patient Name</th>
                            <th scope="col">Doctor Name</th>
                            <th scope="col">Nurse Name</th>
                            <th scope="col">Problem</th>
                            <th scope="col">Procedure Name</th>
                            <th scope="col">Room Type</th>
                            <th scope="col">Date</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            showAppointment.map((row, index) => {
                                return [
                                    <tr>
                                        <th scope="row">{row.app_no}</th>
                                        <td>{row.slot}</td>
                                        <td>{row.patient_name}</td>
                                        <td>{row.doctor_name}</td>
                                        <td>{row.nurse_name}</td>
                                        <td>{row.problem}</td>
                                        <td>{row.type}</td>
                                        <td>{row.room_type}</td>
                                        <td>{row.date}</td>
                                        <td><button
                                            className="btn btn-danger"
                                            onClick={() => { deleteAppointment(row.app_no) }}
                                        >Delete Appoinment</button></td>
                                    </tr>
                                ]
                            })
                        }

                    </tbody>
                </table >
            </div >
        );
    }
    let findNewSlots = () => {
        let newSlots = [1, 2, 3, 4, 5, 6, 7, 8]
        if (appointment.patient_id != "") {
            if (todayOccSlots['P' + appointment.doctor_id] != null) {
                todayOccSlots['P' + appointment.patient_id].forEach((e) => {
                    let index = newSlots.indexOf(e);
                    if (index > -1) {
                        newSlots.splice(index, 1); // 2nd parameter means remove one item only
                    }
                });
            }

        }
        if (appointment.doctor_id != "") {
            if (todayOccSlots['D' + appointment.doctor_id] != null) {
                todayOccSlots['D' + appointment.doctor_id].forEach((e) => {
                    let index = newSlots.indexOf(e);
                    if (index > -1) {
                        newSlots.splice(index, 1) // 2nd parameter means remove one item only
                    }
                });
            }
        }
        if (appointment.nurse_id != "") {
            if (todayOccSlots['N' + appointment.nurse_id] != null) {
                todayOccSlots['N' + appointment.nurse_id].forEach((e) => {
                    const index = newSlots.indexOf(e);
                    if (index > -1) {
                        newSlots.splice(index, 1) // 2nd parameter means remove one item only
                    }
                });
            }
        }
        if (appointment.room_no != "") {
            if (todayOccSlots['R' + appointment.room_no] != null) {
                todayOccSlots['R' + appointment.room_no].forEach((e) => {
                    const index = newSlots.indexOf(e);
                    if (index > -1) {
                        newSlots.splice(index, 1) // 2nd parameter means remove one item only
                    }
                });
            }
        }
        changeTodaySlots(newSlots);
    }

    useEffect(() => {
        findNewSlots();
    }, [appointment])

    let addEntity = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Appointment For Today </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Container>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Problem</Form.Label>
                                    <Form.Control
                                        type="problem"
                                        placeholder="Enter Patient Problem"
                                        onChange={(e) => {
                                            changeAppointment({ ...appointment, "problem": e.target.value })
                                        }}
                                        value={appointment.problem} />
                                    <Form.Text className="text-muted">
                                        Be as verbose as possible.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Patient</Form.Label>
                                    <Form.Select
                                        aria-label="Select Patient"
                                        onChange={(e) => {
                                            changeAppointment({ ...appointment, "patient_id": e.target.value })
                                        }}
                                        value={appointment.patient_id}>
                                        {
                                            patients.map((row, index) => {
                                                return [
                                                    <option value={row.patient_id}>{row.name}</option>
                                                ]
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Doctor</Form.Label>
                                    <Form.Select
                                        aria-label="Select Doctor"
                                        onChange={(e) => { changeAppointment({ ...appointment, "doctor_id": e.target.value }) }}
                                        value={appointment.doctor_id}>
                                        {
                                            doctors.map((row, index) => {
                                                return [
                                                    <option value={row.doctor_id}>{row.doctor_name}</option>
                                                ]
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nurse</Form.Label>
                                    <Form.Select
                                        aria-label="Select Nurse"
                                        onChange={(e) => { changeAppointment({ ...appointment, "nurse_id": e.target.value }) }}
                                        value={appointment.nurse_id} >
                                        {
                                            nurses.map((row, index) => {
                                                return [
                                                    <option value={row.nurse_id}>{row.name}</option>
                                                ]
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Type Of Appointment</Form.Label>
                                    <Form.Select
                                        aria-label="Select Type Of Appointment"
                                        onChange={(e) => { changeAppointment({ ...appointment, "type": e.target.value }) }}
                                        value={appointment.type}>
                                        {
                                            procedures.map((row, index) => {
                                                return [
                                                    <option value={row.procedure_id}>{row.type}</option>
                                                ]
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Room</Form.Label>
                                    <Form.Select
                                        aria-label="Select Room"
                                        onChange={(e) => { changeAppointment({ ...appointment, "room_no": e.target.value }) }}
                                        value={appointment.room_id}
                                        disabled={appointment.type == "CONSULTATION" ? true : false}>
                                        {
                                            rooms.map((row, index) => {
                                                return [
                                                    <option value={row.room_no}>{row.room_type}</option>
                                                ]
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Slot</Form.Label>
                                    <Form.Select
                                        aria-label="Select Slot"
                                        onChange={(e) => { changeAppointment({ ...appointment, "slot": e.target.value }) }}
                                        value={appointment.slot}>
                                        {
                                            todaySlots.map((row, index) => {
                                                return [
                                                    <option value={row}>{row}</option>
                                                ]
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        </Container>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleSubmit();
                        handleClose();
                    }}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (<>
        <div className='container'>
            <br></br>
            <h3 align="center">Appointments</h3>
            <br></br>
            {showFilterProps()}
            <br></br>
            {showTable()}
            <br></br>
            <div align="center">
                <Button variant="primary" onClick={() => {
                    handleShow();
                }}>
                    Add Appointment
                </Button>
            </div>
            {addEntity()}
        </div>
    </>);
}