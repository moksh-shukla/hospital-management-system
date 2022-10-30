import { React, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function PatientStayInformation(props) {
    // the query should return joined tables with doctor name, and patient name, nurse name, and procedure
    const [stayInformation, changeStayInformation] = useState([{
        "stay_no": 0,
        "start_date": 0,
        "end_date": "",
        "patient_id": "",
        "patient_name": 0,
        "room_no": 0,
        "room_type": "",
        "rent": 0,
    }])

    return (<>
        {/* Header */}
        <br></br>
        <br></br>
        <h3> Stay Information </h3>
        <div className='container'>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Stay No.</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Patient Id</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Room No</th>
                        <th scope="col">Room Type</th>
                        <th scope="col">Rent</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>12/4/2022</td>
                        <td>14/4/2022</td>
                        <td>1</td>
                        <td>DEEPAK CHOURISHI</td>
                        <td>1</td>
                        <td>SINGLE DELUX ROOM</td>
                        <td>5000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>)
}