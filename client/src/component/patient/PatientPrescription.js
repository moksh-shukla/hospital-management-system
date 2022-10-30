import { React, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getPrescriptionsByPatientId } from '../../requests'

const patientId = sessionStorage.getItem("user_id")

export default function PatientPrescription(props) {
    // the query should return joined tables with doctor name, and patient name, nurse name, and procedure
    const [prescription, changePrescription] = useState([])

    let getPatientPrescriptions = async () => {
        let patient_id = 1
        let data = await getPrescriptionsByPatientId(patient_id)
        changePrescription(data);
    }

    useEffect(() => {
        getPatientPrescriptions();
        console.log(prescription)
    }, [])

    return (<>
        {/* Header */}
        <br></br>
        <br></br>
        <h3 align = "center"> Patient Id : {patientId}</h3>
        <br></br>
        <br></br>
        {/* <h3 align = "center"> Patient Name : {prescription[0].patient_name}</h3> */}
        <div className='container'>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Pres. No.</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col">Medecine Name</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Comments</th>
                        <th scope="col">Count</th>
                        <th scope="col">Date</th>
                        <th scope="col">Paid</th>
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
                                </tr>
                            ]
                        })
                    }
                </tbody>
            </table>
        </div>
    </>)
}