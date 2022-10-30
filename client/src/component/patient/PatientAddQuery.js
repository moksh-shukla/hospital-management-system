import { React, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { getPatientQueries, getRepliesByParentQueryId } from '../../requests'

export default function PatientAddQuery(props) {
    // the query should return joined tables with doctor name, and patient name, nurse name, and procedure
    const patientId = sessionStorage.getItem("user_id")
    const today = new Date();
    const [filterProp, changeFilterProp] = useState({
        "date": today,
        "slot": "",
        "patient_name": "",
        "procedure_name": ""
    })

    const [queries, changeQueries] = useState([])

    const [newQuery, changeNewQuery] = useState([{
        "poster_type": "PATIENT",
        "poster_id": patientId,
        "date": today,
        "description": "",
    }])

    const [newReply, changeNewReply] = useState({
        "poster_type": "PATIENT",
        "poster_id": patientId,
        "date": today,
        "parent_query_id":0,
        "description": "",
    });

    let showPatientQueries = async () => {
        let patient_id = 1;
        let data = await getPatientQueries(patient_id)
        changeQueries(data);
        console.log(data);
    }

    useEffect(() => {
        showPatientQueries();
    },[])

    let deleteQuery = async (app_no) => {

    }

    const [showReply, setShowReply] = useState(false);

    const handleReplyClose = () => setShowReply(false);

    const handleReplyShow = () => setShowReply(true);

    let handleReplySubmit = () => {
        //add code to submit the new entity
    }


    let showQuery = () => {
        return (
            <Modal show={showReply} onHide={handleReplyClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Replies</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <h5>Posted By : {row.name}</h5>
                    <h7>Query : {row.description}</h7> */}
                    <br></br>
                    {
                        replies.map((reply, index) => {
                            return [
                                <div>
                                    <p>Date : {reply.date}</p>
                                    <p>Description : {reply.description}</p>
                                    <hr></hr>
                                </div>
                            ]
                        })
                    }
                    <br></br>
                    <br></br>
                    <Form>
                        <Form.Control
                            type="reply"
                            placeholder="Enter Reply"
                            onChange={(e) => {
                                changeNewReply({...newReply, "description" : e.target.value})
                            }}
                            value={newReply.description} />
                        <Form.Text className="text-muted">
                            Be as verbose as possible.
                        </Form.Text>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleReplyClose();
                        changeReplies([]);
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        changeReplies([]);
                        handleReplySubmit();
                        handleReplyClose();
                    }}>
                        Reply
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const [replies, changeReplies] = useState([]);

    let getReplies = async (parent_query_id) => {
        let data = await getRepliesByParentQueryId(parent_query_id);
        changeReplies(data);
        console.log(data)
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let handleSubmit = () => {
        //add code to submit the new
    }

    let showFilterProps = () => {
        return (
            <div className='container'>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Date </Form.Label>
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

    let addEntity = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Query</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Container>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="problem"
                                        placeholder="Enter Query"
                                        onChange={(e) => { changeNewQuery({ ...newQuery, "description": e.target.value }) }}
                                        value={newQuery.problem} />
                                    <Form.Text className="text-muted">
                                        Be as verbose as possible.
                                    </Form.Text>
                                </Form.Group>
                            </Form>
                        </Container>
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
            <div className='container'>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Query No.</th>
                            <th scope="col">Date </th>
                            <th scope="col">Poster By</th>
                            <th scope="col">Poster Id</th>
                            <th scope="col">Name Of Poster</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            queries.map((row, index) => {
                                return [
                                    <tr>
                                        <th scope="row">{row.query_id}</th>
                                        <td>{row.date}</td>
                                        <td>{row.poster_type}</td>
                                        <td>{row.poster_id}</td>
                                        <td>{row.name}</td>
                                        <td>{row.description}</td>
                                        <td><button type="button" className="btn btn-danger" onClick={() => {
                                            handleReplyShow()
                                            changeNewReply({...newReply, "parent_query_id" : row.query_id})
                                            getReplies(row.query_id)
                                        }}>Show Replies</button></td>
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
            <h3 align="center">Queries</h3>
            <br></br>
            {showFilterProps()}
            <br></br>
            {showTable()}
            <br></br>
            <div align="center">
                <Button variant="primary" onClick={handleShow}>
                    Add Query
                </Button>
            </div>
            {showQuery()}
            {addEntity()}
        </>
    );
}