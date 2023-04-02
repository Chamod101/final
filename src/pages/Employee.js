import axios from "axios";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { AddEmployee } from "./AddEmployee";
import { useNavigate } from "react-router-dom";
import { DeleteConfirmathion } from "../components/DeleteConfirmation";
import { format } from "date-fns";

export const Employee = () => {

    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://localhost:44392/api/employees").then((response) => {
            setEmployees((existingData) => {
                return response.data
            })
        })
    }, [])

    function showConfirm(id) {
        setShowModal(true);
        setItemToDelete(id);
    }
    function closeConfirm() {
        setShowModal(false);
        setItemToDelete(0);
    }

    function deleteRecordHandler() {
        axios.delete(`https://localhost:44392/api/employees/${itemToDelete}`).then((result) => {

            setEmployees((existingData) => {
                return existingData.filter(_ => _.id !== itemToDelete)
            })
            setShowModal(false);
            setItemToDelete(0);
        })
    }


    return (


        <div >
            <DeleteConfirmathion
                showModal={showModal}
                title="Delete Confirmation!"
                body="Are you sure to delete the record?"
                closeConfirm={closeConfirm}
                deleteRecordHandler={deleteRecordHandler}
            >
            </DeleteConfirmathion>
            <Row className="mt-2">
                <Col md={{ span: 4, offset: 4 }}>
                    <button type="button" className="btn btn-light btn-outline-secondary" onClick={() => navigate("/addemployee")}>
                        Add a New Employee
                    </button>
                </Col>

            </Row>

            <Row xs={1} md={4} className="g-4 mt-1" >
                {employees.map((em) => (
                    <Col key={em.id}>
                        <Card className="card text-dark bg-light mb-3" >
                            <Card.Body>
                                <Card.Title>{em.firstName} {em.lastName}</Card.Title>
                                <hr></hr>
                                <Card.Text>
                                    <b>First Name : </b>{em.firstName}
                                </Card.Text>
                                <Card.Text>
                                    <b>Last Name : </b>{em.lastName}
                                </Card.Text>
                                <Card.Text>
                                    <b>Email : </b>{em.email}
                                </Card.Text>
                                <Card.Text>
                                    <b>Date of Birth : </b>{em.dob}
                                </Card.Text>
                                <Card.Text>
                                    <b>Age : </b>{em.age}
                                </Card.Text>
                                <Card.Text>
                                    <b>salary : </b>{em.salary}<b>LKR</b>
                                </Card.Text>
                                <Card.Text>
                                    <b>Department : </b>{em.departmentName}
                                </Card.Text>
                                <hr></hr>
                                <row>
                                    <Col>
                                        <button className="btn btn-primary" onClick={() => navigate(`/updateemployee/${em.id}`)}>Edit</button>&nbsp;
                                        <button className="btn btn-danger" onClick={() => { showConfirm(em.id) }}>Delete</button>
                                    </Col>
                                </row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        </div>
    );
}