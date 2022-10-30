import { React, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { getQueries, getRepliesByParentQueryId } from '../../requests'

export default function DoctorAppoinment(props) {
    // the query should return joined tables with doctor name, and patient name, nurse name, and procedure
    const today = new Date();
    // console.log(today);
    const [filterProp, changeFilterProp] = useState({
        "date": today,
        "slot": "",
        "patient_name": "",
        "procedure_name": ""
    })

    const [newQuery, changeNewQuery] = useState([{
        "query_id": 0,
        "poster_type": 0,
        "poster_id": "",
        "poster_name": 0,
        "date": "",
        "parent_query_id": 0,
        "description": "",
    }])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    let handleSubmit = () => {
        //add code to submit the new entity
    }

    const [newReply, changeNewReply] = useState([]);
    const [replies, changeReplies] = useState([]);

    const [queries, changeQueries] = useState([]);
    let showQueries = async () => {
        let data = await getQueries();
        changeQueries(data);
    }

    let deleteQuery = async (app_no) => {

    }


    useEffect(() => {
        showQueries();
    }, [])

    let showFilterProps = () => {
        return (
            <div className='container'>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label></Form.Label>
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

    let getReplies = async (parent_query_id) => {
        let data = await getRepliesByParentQueryId(parent_query_id);
        changeReplies(data);
        console.log(data)
    }

    let showQuery = () => {
        return (
            <Modal show={show} onHide={handleClose}>
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
                                changeNewReply(e.target.value)
                            }}
                            value={newReply} />
                        <Form.Text className="text-muted">
                            Be as verbose as possible.
                        </Form.Text>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose();
                        changeReplies([]);
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        changeReplies([]);
                        handleSubmit();
                        handleClose();
                    }}>
                        Reply
                    </Button>
                </Modal.Footer>
            </Modal>
        )
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
                                            handleShow()
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
            {showQuery()}
        </>
    );
}