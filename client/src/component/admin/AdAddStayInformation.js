import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getPatients, getStayRooms, getStays } from '../../requests';

export default function AdAddStayInformation(props) {
    const [stay, changeStay] = useState({
        "start_date": 0,
        "end_date": 0,
        "room_no": "",
        "patient_id": 0
    });

    const [showStay, changeShowStay] = useState([])

    const [filteredStays, changeFilteredStays] = useState([]);

    const today = new Date();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    let handleSubmit = () => {
        //add code to submit the new entity
    }

    const [filterProp, changeFilterProp] = useState({
        "patient_id": 1
    })

    let showStays = async () => {
        let data = await getStays();
        changeShowStay(data)
        changeFilteredStays(data)
    }
    const [patients, changePatients] = useState([])

    let showPatients = async () => {
        let data = await getPatients();
        changePatients(data)
    }

    const [rooms, changeRooms] = useState([])
    let showRooms = async () => {
        let data = await getStayRooms();
        changeRooms(data)
    }

    useEffect(() => {
        showPatients();
        showStays();
        showRooms();
    }, [])

    let filterStays = () => {
        let newStays = [];
        console.log(showStay)
        showStay.forEach(row => {
            if(row.patient_id == filterProp.patient_id){
                newStays.push(row);
            }
        });
        changeFilteredStays(newStays)
    } 
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
                <div align="center">
                    <Button align="center" variant="secondary" onClick={() => {
                        console.log(filterProp.patient_id)
                        filterStays();
                    }}>
                        Get Stay Info For Patient
                    </Button>
                </div>
            </div>
        );
    }

    let addEntity = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Stay Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <div>
                            {/* <Navber /> */}
                            <Form>
                                <Form.Group>
                                    <Form.Label>Choose Patient </Form.Label>
                                    <Form.Select aria-label="Enter Room No"
                                        onChange={(e) => { changeStay({ ...stay, "patient_id": e.target.value }) }}
                                        value={stay.room_no}>
                                        {
                                            patients.map((row, index) => {
                                                return [
                                                    <option value={row.patient_id}>{row.name}</option>
                                                ]
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                            <br></br>
                            <div class="container">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">

                                        <Form.Label>Select Start Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="start_date"
                                            placeholder="Enter stay start_date"
                                            onChange={(e) => { changeStay({ ...stay, "start_date": e.target.value }) }}
                                            min_date={today}
                                            selected={stay.start_date}
                                        >
                                        </Form.Control>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Select End Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="end_date"
                                            placeholder="Enter stay End Date"
                                            onChange={(e) => { changeStay({ ...stay, "start_date": e.target.value }) }}
                                            min_date={today}
                                            selected={stay.start_date}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Room No</Form.Label>
                                        <Form.Select aria-label="Enter Room No"
                                            onChange={(e) => { changeStay({ ...stay, "room_no": e.target.value }) }}
                                            value={stay.room_no}>
                                            {
                                                rooms.map((row, index) => {
                                                    return [
                                                        <option value={row.room_no}>{row.room_type}</option>
                                                    ]
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </>
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

    let showTable = () => {
        return (
            <div className="container">
                <h3> Prescriptions </h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Stay No.</th>
                            <th scope="col">Start Date </th>
                            <th scope="col">End Date</th>
                            <th scope="col">Patient Id</th>
                            <th scope="col">Patient Name</th>
                            <th scope="col">Room No.</th>
                            <th scope="col">Room Type</th>
                            <th scope="col">Rent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredStays.map((row, index) => {
                                return [
                                    <tr>
                                        <th scope="row">{row.stay_no}</th>
                                        <td>{row.start_date}</td>
                                        <td>{row.end_date}</td>
                                        <td>{row.patient_id}</td>
                                        <td>{row.name}</td>
                                        <td>{row.room_no}</td>
                                        <td>{row.room_type}</td>
                                        <td>{row.rent}</td>
                                    </tr>
                                ]
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }



    return (
        <>
            {/* Header */}
            <br></br>

            <h3 align="center">Stay Information</h3>
            <br></br>
            {showFilterProps()}
            <br></br>
            {showTable()}
            <br></br>
            <div align="center">
                <Button variant="primary" onClick={handleShow}>
                    Add Stay Information
                </Button>
            </div>
            {addEntity()}
        </>);
}