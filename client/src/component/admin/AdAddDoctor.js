import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getDoctors, getDepts, getDoctorProfile} from '../../requests';

export default function AdAddDoctor(props) {
    const [doctor, changeDoctor] = useState({
        "name": "",
        "dept_id": 0,
        "charge": "",
        "status": "",
    });

    const [filterProp, changeFilterProp] = useState({
        "doctor_id": 1
    })

    const [doctors, changeDoctors] = useState([])

    let showDoctorProfile = () => {
        return (
            <div align="center" >
                <h5>Name : {doctorProfile.doctor_name}</h5>
                <p>Id : {doctorProfile.doctor_id}</p>
                <p>Dept Name : {doctorProfile.dept_name}</p>
            </div>
        )
    }

    
    let showDoctors = async () => {
        let data = await getDoctors();
        changeDoctors(data)
    }

    const [doctorProfile, changeDoctorProfile] = useState("")

    let getProfile = async () => {
        let data = await getDoctorProfile(filterProp.doctor_id);
        console.log(data)
        changeDoctorProfile(data[0]);
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    let handleSubmit = () => {
        //add code to submit the new entity
    }

    const [depts, changeDepts] = useState([]);


    const showDepts = async() => {
        let data = await getDepts();
        changeDepts(data)
    }

    useEffect(() => {
        showDoctors()
        showDepts()
    }, [])

    useEffect(() => {
        // let data = getDoctorProfile(filterProp.doctor_id)
        // changeDoctorProfile(data);
        console.log(filterProp.doctor_id)
    },[filterProp])

    let addEntity = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Doctor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {/* <Navber /> */}
                        <br />
                        <h2 className="text-black" align="center">Doctor</h2>
                        <br></br>
                        <br></br>
                        <div class="container">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Doctor Name"
                                        onChange={(e) => { changeDoctor({ ...doctor, "name": e.target.value }) }}
                                        value={doctor.name} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Department</Form.Label>
                                    <Form.Select aria-label="Enter Department"
                                        onChange={(e) => { changeDoctor({ ...doctor, "dept_id": e.target.value }) }}
                                        value={doctor.dept_id}>
                                        {
                                            depts.map((row, index) => {
                                                return [
                                                    <option value={row.dept_id}>{row.name}</option>
                                                ]
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Charge</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Doctor Fees Here"
                                        onChange={(e) => { changeDoctor({ ...doctor, "charge": e.target.value }) }}
                                        value={doctor.charge} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        onChange={(e) => { changeDoctor({ ...doctor, "status": e.target.value }) }}
                                        value={doctor.status}>
                                        <option>Open this select menu</option>
                                        <option value="A">AVAILABLE</option>
                                        <option value="NA">NOT AVAILABLE</option>
                                    </Form.Select>
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


    let showFilterProps = () => {
        return (
            <div className='container'>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Doctor</Form.Label>
                            <Form.Select
                                aria-label="Select Doctor"
                                onChange={(e) => { changeFilterProp({ ...filterProp, "doctor_id": e.target.value }) }}
                                value={filterProp.doctor_id}>
                                {
                                    doctors.map((row, index) => {
                                        return [
                                            <option value={row.doctor_id}>{row.doctor_name}</option>
                                        ]
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </Form>
                <div align="center">
                    <Button align="center" variant="secondary" onClick={() => {
                        getProfile()
                    }}>
                        Get Profile
                    </Button>
                </div>
            </div>
        );
    }

    return (<>
        <br></br>
        <h4 align="center"> Doctor </h4>
        <br></br>
        {showFilterProps()}
        <br></br>
        {showDoctorProfile()}
        <div align="center">
            <Button variant="primary" onClick={handleShow}>
                Add Doctor
            </Button>
        </div>
        {addEntity()}
    </>);
}