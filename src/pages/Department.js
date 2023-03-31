import { useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { AddDepartment } from "./AddDepartment";
import { useNavigate } from "react-router-dom";

export const Department = () => {

    const [departments, setDepartments] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get("https://localhost:44392/api/departments").then((response) => {
            setDepartments((existingData) => {
                return response.data
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    return (

        <div>
            <Row className="mt-2">
                <Col md={{ span: 4, offset: 4 }}>
                    <button variant="primary" type="button" className="btn btn-primary" onClick={() => navigate("/adddepartment")}>
                        Add New Department
                    </button>
                </Col>

            </Row>

            <Row xs={1} md={4} className="g-4 mt-1"  >
                {departments.map((dp) => (
                    <Col key={dp.id}>
                        <Card className="card text-center text-white bg-primary mb-3">
                            <Card.Body>
                                <Card.Title>{dp.departmentName}</Card.Title>
                                <hr></hr>
                                <button className="btn btn-primary" onClick={() => navigate(`/updatedepartment/${dp.id}`)}>Edit</button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        </div>
    );
}