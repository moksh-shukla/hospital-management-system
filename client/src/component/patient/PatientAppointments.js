import { React, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getAppointmentsByPatientId } from '../../requests'

const patientId = sessionStorage.getItem("user_id");

export default function PatientAppoinment(props) {
    // the query should return joined tables with doctor name, and patient name, nurse name, and procedure
    const [appointments, changeAppointment] = useState([])

    let getPatientAppointments = async () => {
        let patient_id = 2
        let data = await getAppointmentsByPatientId(patient_id);
        changeAppointment(data)
    }

    useEffect(() => {
        getPatientAppointments();
    },[])

    return (<>
        {/* Header */}
        <br></br>
        <br></br>
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
                        <th scope="col">Room Type</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointments.map((row, index) => {
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
                                </tr>
                            ]
                        })
                    }
                </tbody>
            </table>
        </div>
    </>)

}