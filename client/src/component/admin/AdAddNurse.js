import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getNurseProfile, getNurses } from '../../requests';

export default function AdAddNurse(props) {
    const [nurse, changeNurse] = useState({
        "name": "",
        "position": "",
        "status": "",
    });

    const [nurseProfile, changeNurseProfile] = useState([])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    let handleSubmit = () => {
        //add code to submit the new entity
    }

    const [filterProp, changeFilterProp] = useState({
        "nurse_id": 1
    })

    const [nurses, changeNurses] = useState([])

    let showNurseProfile = async () => {
        console.log(filterProp.nurse_id)
        let data = await getNurseProfile(filterProp.nurse_id)
        changeNurseProfile(data[0])
    } 


    let showNurses = async () => {
        let data = await getNurses();
        changeNurses(data)
        console.log(data)
    }

    useEffect(() => {
        showNurses()
    },[])

    let addEntity = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nurse</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {/* <Navber /> */}
                        <div class="container">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter nurse Name"
                                        onChange={(e) => { changeNurse({ ...nurse, "name": e.target.value }) }}
                                        value={nurse.name} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Position</Form.Label>
                                    <Form.Select aria-label="Enter Position"
                                        onChange={(e) => { changeNurse({ ...nurse, "position": e.target.value }) }}
                                        value={nurse.position}>
                                        <option>Open this select menu</option>
                                        <option value="HEAD">HEAD</option>
                                        <option value="ASSISSTANT">ASSISSTANT</option>
                                        <option value="TRAINEE">TRAINEE</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        onChange={(e) => { changeNurse({ ...nurse, "status": e.target.value }) }}
                                        value={nurse.status}>
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

    let showProfile = () => {
        return(
            <div align = "center">
                <h5>Name : {nurseProfile.name}</h5>
                <p>Id :{nurseProfile.nurse_id}</p>
                <p>Postion : {nurseProfile.position}</p>
                <p>Status : {nurseProfile.status}</p>
            </div>
        )
    }

    let showFilterProps = () => {
        return (
            <div className='container'>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Nurse Name</Form.Label>
                            <Form.Select
                                aria-label="Select Slot"
                                onChange={(e) => { changeFilterProp({ ...filterProp, "nurse_id": e.target.value }) }}
                                value={filterProp.nurse_id}>
                                {
                                    nurses.map((row, index) => {
                                        return [
                                            <option value={row.nurse_id}>{row.name}</option>
                                        ]
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </Form>
                <div align = "center">
                    <Button align="center" variant="secondary" onClick={() => {
                        showNurseProfile()
                    }}>
                        Get Profile
                    </Button>
                </div>
            </div>
        );
    }

    return (<>
        <br></br>
        <h4 align="center"> Nurse </h4>
        <br></br>
        {showFilterProps()}
        <br></br>
        {showProfile()}
        <br></br>
        <div align="center">
            <Button variant="primary" onClick={handleShow}>
                Add Nurse
            </Button>
        </div>
        {addEntity()}
    </>);
}