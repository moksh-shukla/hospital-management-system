// get all the patients for a doctor 
// get all medecines 
// get all the previous prescriptions
// then add the count and the comments for taking the medecines
import { React, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { getMedicines, getPatients, getPrescriptionsByDoctorId } from '../../requests';

const doctorId = sessionStorage.getItem("user_id");

export default function DoctorPatientPrescription(props) {
    const today = Date();

    const [patient, changePatient] = useState(0)
    const [prescription, changePrescription] = useState([])

    const [patients, changePatients] = useState([])
    let showPatients = async () => {
        let data = await getPatients();
        changePatients(data)
    }
    const [medicines, changeMedicines] = useState([]);

    let showMedicines = async () => {
        let data = await getMedicines();
        changeMedicines(data);
    }

    let getPrescriptions = async () => {
        let doctor_id = 2
        let data = await getPrescriptionsByDoctorId(doctor_id);
        changePrescription(data);
    }

    let addPrescription = async () => {

    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    let handleSubmit = () => {
        //add code to submit the new entity
    }

    const [filterProp, changeFilterProp] = useState({
        "patient_name": ""
    })

    let deletePrescription = () => {

    }

    useEffect(() => {
        showPatients();
        getPrescriptions();
        showMedicines();
        showPatients();
    }, [])

    let showFilterProps = () => {
        return (
            <div className='container'>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Patient Name</Form.Label>
                            <Form.Select
                                aria-label="Select Slot"
                                onChange={(e) => { changeFilterProp({ ...filterProp, "patient_name": e.target.value }) }}
                                value={filterProp.nurse_name}>
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

    let addEntity = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Doctor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {/* <Navber /> */}
                        <div className="container">
                            <h3> Add New Prescription</h3>
                            <h5> Date : {today}</h5>
                            <form>
                                <div className="form-group">
                                    <label for="med">Medecine</label>
                                    <select class="form-control" id="med">
                                        {
                                            medicines.map((row, index) => {
                                                return [
                                                    <option value={row.code}>{row.name}</option>
                                                ]
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label for="patients">Patients</label>
                                    <select class="form-control" id="med">
                                        {
                                            patients.map((row, index) => {
                                                return [
                                                    <option value={row.patient_id}>{row.name}</option>
                                                ]
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label for="med_count">Count</label>
                                    <input type="text" class="form-control" id="count" placeholder="Count" />
                                </div>
                                <div className="form-group">
                                    <label for="med_comments">Comments</label>
                                    <input type="text" class="form-control" id="comments" placeholder="Comments" />
                                </div>
                            </form>
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

    let showTable = () => {
        return (
            <div className="container">
                <h3> Prescriptions </h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Prescription No.</th>
                            <th scope="col">Doctor Name</th>
                            <th scope="col">Medecine</th>
                            <th scope="col">Patient Name</th>
                            <th scope="col">Comments</th>
                            <th scope="col">Count</th>
                            <th scope="col">Date</th>
                            <th scope="col">Paid Status</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            prescription.map((row, index) => {
                                return [
                                    <tr>
                                        <th scope="row">{row.prescription_no}</th>
                                        <td>{row.doctor_name}</td>
                                        <td>{row.name}</td>
                                        <td>{row.patient_name}</td>
                                        <td>{row.comments}</td>
                                        <td>{row.count}</td>
                                        <td>{row.date}</td>
                                        <td>{row.paid}</td>
                                        <td><button
                                            className="btn btn-danger"
                                            onClick={() => { deletePrescription(row.prescription_no) }}
                                        >Delete Prescription</button></td>
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

            <h3 align="center">Prescriptions</h3>
            <br></br>
            {showFilterProps()}
            <br></br>
            {showTable()}
            <br></br>
            <div align="center">
                <Button variant="primary" onClick={handleShow}>
                    Add Prescription
                </Button>
            </div>
            {addEntity()}
        </>
    )
}