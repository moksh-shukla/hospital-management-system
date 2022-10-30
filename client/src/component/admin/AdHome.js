import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/card'
import Button from 'react-bootstrap/button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useNavigate } from 'react-router-dom';

export default function AdHome(props) {
    const navigate = useNavigate();
    const [doctor, changeDoctor] = useState({
        "name": "",
        "dept_id": 0,
        "charge": "",
        "status": "",
    });

    return (<>
        <div>
            {/* <Navber /> */}
            <br />
            <h2 className="text-black" align="center">Administrator</h2>
            <div class="container" style={{ width: '75rem' }} >
                <br />
                <br />
                <Row align = "center">
                    <Col>
                        <div style={{ padding: "5px 5px 5px 5px" }}>
                            <Card className="text-center" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Doctor</Card.Title>
                                    <Card.Text>
                                        Look at the profiles of the existing doctors, and add/delete the profile of doctors.
                                    </Card.Text>
                                    <button type="button" class="btn btn-primary btn-block" onClick={() => {
                                        navigate('addDoctor')
                                    }}> Doctor</button>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ padding: "5px 5px 5px 5px" }}>
                            <Card className="text-center" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Appointments</Card.Title>
                                    <Card.Text>
                                        Look at the existing appointments, and add/delete the record of appoinments.
                                    </Card.Text>
                                    <button type="button" class="btn btn-primary btn-block" onClick={() => {
                                        navigate('addAppointment')
                                    }}> Appoinment</button>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ padding: "5px 5px 5px 5px" }}>
                            <Card className="text-center" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Nurses</Card.Title>
                                    <Card.Text>
                                        Look at the existing profile of nurses, and add/delete their profiles.
                                    </Card.Text>
                                    <button type="button" class="btn btn-primary btn-block" onClick={() => {
                                        navigate("addNurse")
                                    }}> Nurse</button>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row align = "center">
                    <Col>
                        <div style={{ padding: "5px 5px 5px 5px" }}>
                            <Card className="text-center" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Patient</Card.Title>
                                    <Card.Text>
                                        Look at the existing profile of patients, and add/delete their patients.
                                    </Card.Text>
                                    <button type="button" class="btn btn-primary btn-block" onClick={() => {
                                        navigate("addPatient")
                                    }}> Patient  </button>
                                </Card.Body>
                            </Card>
                        </div>

                    </Col>
                    <Col>
                        <div style={{ padding: "5px 5px 5px 5px" }}>
                            <Card className="text-center" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Stay Information</Card.Title>
                                    <Card.Text>
                                        Look at the existing stay information of patients, and add/delete the stay information.
                                    </Card.Text>
                                    <button type="button" class="btn btn-primary btn-block" onClick={() => {
                                        navigate("addStayInformation")
                                    }}> Stay Information  </button>
                                </Card.Body>
                            </Card>
                        </div>

                    </Col>
                    <Col>
                        <div style={{ padding: "5px 5px 5px 5px" }}>
                            <Card className="text-center" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Queries</Card.Title>
                                    <Card.Text>
                                        Look at the existing queries, and post reply to them.
                                    </Card.Text>
                                    <button type="button" class="btn btn-primary btn-block" onClick={() => {
                                        navigate("showQueries")
                                    }}> Queries  </button>
                                </Card.Body>
                            </Card>
                        </div>

                    </Col>
                </Row>
            </div>
        </div>
    </>);
}