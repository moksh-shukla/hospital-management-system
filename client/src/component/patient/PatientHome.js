import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/card'
import Button from 'react-bootstrap/button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const patientId = sessionStorage.getItem("user_id")

export default function PatientHome(props) {
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
            <h2 className="text-black" align="center">Patient : {patientId}</h2>
            <div class="container" style={{ width: '75rem' }} >
                <br />
                <br />
                <Row align="center">
                    <Col>
                        <div style={{ padding: "5px 5px 5px 5px" }}>
                            <Card className="text-center" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Appointments</Card.Title>
                                    <Card.Text>
                                        Look at the existing appointments, and add/delete the record of appoinments.
                                    </Card.Text>
                                    <button type="button" class="btn btn-primary btn-block" onClick={() => {
                                        navigate('appointments')
                                    }}> Appoinment</button>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ padding: "5px 5px 5px 5px" }}>
                            <Card className="text-center" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Prescriptions</Card.Title>
                                    <Card.Text>
                                        Look at the existing prescriptions made by you, and add/delete prescriptions.
                                    </Card.Text>
                                    <button type="button" class="btn btn-primary btn-block" onClick={() => {
                                        navigate("prescriptions")
                                    }}> Prescription </button>
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
                                        navigate("queries")
                                    }}> Queries  </button>
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
                                    <Card.Title>Bill</Card.Title>
                                    <Card.Text>
                                        Look at the your bills paid/non paid, and pay them.
                                    </Card.Text>
                                    <button type="button" class="btn btn-primary btn-block" onClick={() => {
                                        navigate("bills")
                                    }}> Bills  </button>
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
                                        Look at the your stay infomation.
                                    </Card.Text>
                                    <button type="button" class="btn btn-primary btn-block" onClick={() => {
                                        navigate("stays")
                                    }}> Stays  </button>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </>);
}