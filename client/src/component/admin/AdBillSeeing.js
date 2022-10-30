import { React, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

export default function PatientBill(props) {
    // the query should return joined tables with doctor name, and patient name, nurse name, and procedure
    const [appointment, changeAppointment] = useState([{
        "app_no": 0,
        "problem": 0,
        "doctor_id": 0,
        "doctor_name": "",
        "patient_id": "",
        "patient_name": 0,
        "nurse_id":0,
        "nurse_name":"",
        "date": "",
        "charge": 0,
        "type": "",
        "cost": 0,
        "total_amount": 0
    }])

    const [stayRent, changeStayRent] = useState([{
        "stay_no": 0,
        "start_date": 0,
        "end_date": 0,
        "room_no": "",
        "room_type": "",
        "rent": 0,
        "total_amount": 0
    }])

    const [prescription, changePrescription] = useState([{
        "prescription_no": 0,
        "med_code": 0,
        "name": "",
        "brand": "",
        "description": "",
        "cost": 0,
        "doctor_id": 0,
        "doctor_name": "",
        "count": 0,
        "total_amount": 0
    }])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    let handleSubmit = () => {
        //add code to submit the new entity
    }

    const [filterProp, changeFilterProp] = useState({
        "patient_name": ""
    })

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

    let showTable = () => {
        return (
            <>
                <div className="container">
                    <h3> Appointments </h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">App. No.</th>
                                <th scope="col">Date</th>
                                <th scope="col">Slot</th>
                                <th scope="col">Patient Name</th>
                                <th scope="col">Doctor Name</th>
                                <th scope="col">Nurse Name</th>
                                <th scope="col">Problem</th>
                                <th scope="col">Procedure Name</th>
                                <th scope="col">Room No</th>
                                <th scope="col">Doctor Charge</th>
                                <th scope="col">Cost</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Paid Status</th>
                                <th scope="col">Pay</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>12/4/2022</td>
                                <td>1</td>
                                <td>PRAKASH CHOUDHARY</td>
                                <td>DR. DEEPAK CHANT</td>
                                <td>MAHURI DEVI</td>
                                <td>COUGH AND COLD</td>
                                <td>CONSULTAION</td>
                                <td>1</td>
                                <td>1500</td>
                                <td>1000</td>
                                <td>2500</td>
                                <td>NA</td>
                                <td><button type="button" className="btn btn-danger"> Pay </button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="container">
                    <h3> Prescriptions </h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Prescription No.</th>
                                <th scope="col">Date</th>
                                <th scope="col">Doctor Name</th>
                                <th scope="col">Medecine</th>
                                <th scope="col">Med Company</th>
                                <th scope="col">Comments</th>
                                <th scope="col">Count</th>
                                <th scope="col">Comments</th>
                                <th scope="col">Rate</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Paid Status</th>
                                <th scope="col">Pay</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <th>12/4/2022</th>
                                <td>DR. DEEPAK CHANT</td>
                                <td>DISPRIN</td>
                                <td>GSK</td>
                                <td>HEADACHE</td>
                                <td>2</td>
                                <td>DAILY</td>
                                <td>20</td>
                                <td>40</td>
                                <td>NA</td>
                                <td><button type="button" className="btn btn-danger"> Pay </button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="container">
                    <h3> Stay Rent </h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Stay No.</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">End Date</th>
                                <th scope="col">Room No</th>
                                <th scope="col">Room Type</th>
                                <th scope="col">Rent</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Paid Status</th>
                                <th scope="col">Pay</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <th>12/4/2022</th>
                                <td>14/4/2022</td>
                                <td>1</td>
                                <td>DELUXE SINGLE ROOM</td>
                                <td>1000</td>
                                <td>3000</td>
                                <td>NA</td>
                                <td><button type="button" className="btn btn-danger"> Pay </button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

    let getPatientAppointmentBill = async () => {
        // call the API
    }

    return (<>
        {/* Header */}
        <br></br>

        <h3 align="center">Patient Bill</h3>
        <br></br>
        {showFilterProps()}
        <br></br>
        {showTable()}
        <br></br>
    </>
    )
}