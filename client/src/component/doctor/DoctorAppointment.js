import { React, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { getAppointmentsByDoctorId } from '../../requests'

export default function DoctorAppoinment(props) {
    // the query should return joined tables with doctor name, and patient name, nurse name, and procedure
    const doctorId = sessionStorage.getItem("user_id");
    const today = new Date();

    const [filterProp, changeFilterProp] = useState({
        "date": today,
        "slot": "",
        "patient_name": "",
        "procedure_name": ""
    })

    const [appoinment, changeAppointment] = useState([{
        "app_no": 0,
        "slot": 0,
        "problem": "",
        "doctor_id": 0,
        "doctor_name": "",
        "patient_id": 0,
        "patient_name": "",
        "nurse_id": 0,
        "nurse_name": "",
        "procedure_id": 0,
        "procedure_name": "",
        "room_no": 0
    }])

    let getDoctorAppointments = async () => {
        let doctor_id = 2
        let data = await getAppointmentsByDoctorId(doctor_id);
        changeAppointment(data);
    }

    let deleteAppointment = async (app_no) => {

    }
    useEffect(() => {
        console.log(doctorId)
        getDoctorAppointments();
    },[])

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
                            <th scope="col">Room No</th>
                            <th scope="col">Date</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appoinment.map((row, index) => {
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
                </table>
            </div>
        );
    }



    return (
        <>
            <br></br>
            <h3 align="center">Appointments</h3>
            <br></br>
            {showFilterProps()}
            <br></br>
            {showTable()}
            <br></br>
        </>
    );
}