import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import { getDoctorLogin, getPatientLogin } from "../../requests";

export default function Login() {

    const [canLogin, changeCanLogin] = useState(false);
    const [id, setId] = useState(0);

    const [password, setPassword] = useState("");

    const [type, setType] = useState("")

    const navigate = useNavigate();

    function validateForm() {

        return id.length > 0 && password.length > 0;

    }

    function handleSubmit(event) {

        console.log("Handle Submit Called.")

    }

    let checkPatient = async() => {
        let check = await getPatientLogin(parseInt(id),password);
        console.log("Checking Patient")
        if(check.length == 0){
            return false;
        }
        return true;
    }

    let checkDoctor = async() => {
        let check = await getDoctorLogin(parseInt(id),password);
        if(check.length == 0){
            return false;
        }
        return true
    }
    let checkCreds = async() => {
        if (type == "PATIENT") {
            console.log("entered check creds")
            let val = await checkPatient();
            console.log(val)
            console.log(val)
            console.log(val)
            console.log(val)
            if(val){
                sessionStorage.setItem("user_type", "PATIENT");
                sessionStorage.setItem("user_id", id);
                navigate("/patient");
            }
        }
        else if (type == "DOCTOR") {
            let val = checkDoctor();
            console.log(val)
            if(val){
                sessionStorage.setItem("user_type", "DOCTOR");
                sessionStorage.setItem("user_id", id);
                navigate("/doctor");
            }
        }
        else if (id === "admin" && password === "admin") {
            sessionStorage.setItem("user_type", "ADMIN");
            sessionStorage.setItem("user_id", id);
            navigate("/admin");
        }
        else {
            alert("Incorrect Username or Password")
        }
    }

    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <div className="container">

                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="user_type">

                        <Form.Label>User Type</Form.Label>

                        <Form.Select
                            aria-label="Type Of User"
                            onChange={(e) => { setType(e.target.value)}}
                            value={type}>
                            <option value="ADMIN">ADMIN</option>
                            <option value="PATIENT">PATIENT</option>
                            <option value="DOCTOR">DOCTOR</option>
                        </Form.Select>

                    </Form.Group>


                    <Form.Group size="lg" controlId="id">

                        <Form.Label>User Id</Form.Label>

                        <Form.Control

                            autoFocus

                            type="id"

                            value={id}

                            onChange={(e) => setId(e.target.value)}

                        />

                    </Form.Group>

                    <Form.Group size="lg" controlId="password">

                        <Form.Label>Password</Form.Label>

                        <Form.Control

                            type="password"

                            value={password}

                            onChange={(e) => setPassword(e.target.value)}

                        />

                    </Form.Group>
                    <br></br>
                    <Button block size="lg" type="submit" disabled={!validateForm()} onClick={checkCreds}>

                        Login

                    </Button>

                </Form>

            </div>
        </>
    );

}