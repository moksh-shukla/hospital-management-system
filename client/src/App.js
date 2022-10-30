import React from 'react';
import { Route,Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AdAddAppointment from './component/admin/AdAddAppointment';
import AdAddDoctor from './component/admin/AdAddDoctor';
import AdAddNurse from './component/admin/AdAddNurse';
import AdAddPatient from './component/admin/AdAddPatient';
import DoctorAppoinment from './component/doctor/DoctorAppointment';
import DoctorPatientPrescription from './component/doctor/DoctorPatientPrescription';
import PatientBill from './component/patient/PatientBill';
import PatientAppoinment from './component/patient/PatientAppointments';
import PatientPrescription from './component/patient/PatientPrescription';
import Login from './component/login/Login';
import AdHome from './component/admin/AdHome'
import DoctorHome from './component/doctor/DoctorHome'
import PatientHome from './component/patient/PatientHome';
import AdAddStayInformation from './component/admin/AdAddStayInformation';
import PatientStayInformation from './component/patient/PatientStayInformation';
import AdShowQueries from './component/admin/AdShowQueries'
import DoctorAddQuery from './component/doctor/DoctorAddQuery';
import PatientAddQuery from './component/patient/PatientAddQuery';
export default function App() {
  return (
    <div className="App">
    <Router>
        <Routes>
            <Route exact path="/" element = {<Login/>} />

            <Route exact path="/admin" element = {<AdHome/>} />
            <Route exact path="/admin/addAppointment" element = { <AdAddAppointment/>} />
            <Route exact path="/admin/addDoctor" element = {<AdAddDoctor/>}/>
            <Route exact path="/admin/AddNurse" element = {<AdAddNurse/>}/>
            <Route exact path="/admin/AddPatient" element = {<AdAddPatient/>}/>
            <Route exact path="/admin/addStayInformation" element = {<AdAddStayInformation/>}/>
            <Route exact path="/admin/showQueries" element = {<AdShowQueries/>}/>
            
            <Route exact path="/doctor" element = {<DoctorHome/>} />
            <Route exact path="/doctor/addAppointment" element = {<AdAddAppointment/>}/>
            <Route exact path="/doctor/showPrescriptions" element = {<DoctorPatientPrescription/>}/>
            <Route exact path="/doctor/addPrescription" element = {<DoctorPatientPrescription/>}/>
            <Route exact path="/doctor/showQueries" element = {<DoctorAddQuery/>}/>


            <Route exact path="/patient" element = {<PatientHome/>} />
            <Route exact path="/patient/appointments" element = {<PatientAppoinment/>}/>
            <Route exact path="/patient/prescriptions" element = {<PatientPrescription/>}/>
            <Route exact path="/patient/bills" element = {<PatientBill/>}/>
            <Route exact path="/patient/stays" element = {<PatientStayInformation/>}/>
            <Route exact path="/patient/queries" element = {<PatientAddQuery/>}/>


            
        </Routes>
    </Router>
    </div>
  );
}