import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { getPatients, getPatientProfile } from '../../requests';


export default function AdAddPatient(props) {
    const [patient, changePatient] = useState({
        "name": "",
        "age": 0,
        "weight": 0,
        "address": "",
        "phoneno": 0,
        "sex": "M"
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    let handleSubmit = () => {
        //add code to submit the new entity
    }

    const [filterProp, changeFilterProp] = useState({
        "patient_id": 1,
        "patient_name":""
    })

    const [patients, changePatients] = useState([])
    const [patientProfile, changePatientProfile] = useState({});

    let showPatients = async () => {
        let data = await getPatients();
        changePatients(data)
    }

    let getProfile = async() => {
        let data = await getPatientProfile(filterProp.patient_id);
        changePatientProfile(data[0])
        console.log(data);
    }
    useEffect(() => {
        showPatients();   
    },[])

    // useEffect(() => {
    //     let data = getPatientProfile(filterProp.patient_id)
    //     changePatientProfile(data);
    //     console.log(patientProfile)
    // },[filterProp])

    let showFilterProps = () => {
        return (
            <div className='container'>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Patient Name</Form.Label>
                            <Form.Select
                                aria-label="Select Slot"
                                onChange={(e) => { changeFilterProp({ ...filterProp, "patient_id": e.target.value }) }}
                                value={filterProp.patient_id}>
                                {
                                    patients.map((row, index) => {
                                        return [
                                            <option value={row.patient_id}>{row.name}</option>
                                        ]
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </Form>
                <div align = "center">
                    <Button align="center" variant="secondary" onClick={() => {
                            getProfile()
                    }}>
                        Get Profile
                    </Button>
                </div>
            </div>
            
        );
    }

    let showProfile = () => {
        return(
            <div align = "center">
                <h5>Name : {patientProfile.name}</h5>
                <p>Id :{patientProfile.patient_id}</p>
                <p>Age : {patientProfile.age}</p>
                <p>Weight : {patientProfile.weight}</p>
                <p>Address : {patientProfile.address}</p>
                <p>Phone no : {patientProfile.phoneno}</p>
                <p>Sex : {patientProfile.sex}</p>
            </div>
        )
    }

    let addEntity = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div class="container">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter patient Name"
                                        onChange={(e) => { changePatient({ ...patient, "name": e.target.value.toUpperCase() }) }}
                                        value={patient.name} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type="age"
                                        placeholder="Enter patient Age"
                                        onChange={(e) => { changePatient({ ...patient, "age": e.target.value }) }}
                                        value={patient.age}
                                        isValid={() => {
                                            if (isNaN(patient.age) === true) {
                                                return false
                                            }
                                            else {
                                                changePatient({ ...patient, "age": parseInt(patient.age) })
                                            }
                                        }} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control
                                        type="weight"
                                        placeholder="Enter Patient Weight"
                                        onChange={(e) => { changePatient({ ...patient, "weight": e.target.value }) }}
                                        value={patient.weight}
                                        isValid={() => {
                                            if (isNaN(patient.weight) === true) {
                                                return false
                                            }
                                            else {
                                                changePatient({ ...patient, "weight": parseInt(patient.weight) })
                                            }
                                        }} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Patient Address"
                                        onChange={(e) => { changePatient({ ...patient, "name": e.target.value.toUpperCase() }) }}
                                        value={patient.name}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Phone No.</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Patient Phone No."
                                        onChange={(e) => { changePatient({ ...patient, "phoneno": e.target.value.toUpperCase() }) }}
                                        value={patient.phoneno}
                                        isValid={() => {
                                            if (isNaN(patient.phoneno) === true) {
                                                return false
                                            }
                                            else {
                                                changePatient({ ...patient, "phoneno": parseInt(patient.phoneno) })
                                            }
                                        }} />
                                </Form.Group>
                            </Form>
                        </div>
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

    return (
        <>
            <br></br>
            <h4 align="center"> Patient </h4>
            <br></br>
            {showFilterProps()}
            <br></br>
            {showProfile()}
            <div align="center">
                <Button variant="primary" onClick={handleShow}>
                    Add Patient
                </Button>
            </div>
            {addEntity()}
        </>
    );
}