import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export const AddDepartment = () => {

    const departmentNamec = useRef(null);
    const [formError, setFormError] = useState({});

    const navigate = useNavigate();

    const addDepartments = () => {
        let isValid = validateForm()
        if (isValid) {
            var payload = {
                departmentName: departmentNamec.current.value

            };
            axios.post("https://localhost:44392/api/departments/", payload).then((res) => {
                navigate("/department");
            })
        }

    }

    const validateForm = () => {
        let err = {};

        if (departmentNamec.current.value === '') {
            err.departmentName = 'Department Name Required'
        }

        setFormError({ ...err })

        return Object.keys(err).length < 1;
    }

    return (

        <Container className="bg-light border">


            <form >
                <Row>
                    <Col>
                        <div className="form-floating">
                            <input type="text" className="form-control" id="formDeparmentName" placeholder="Department Name" ref={departmentNamec}
                            ></input>
                            <label >Department Name</label>
                            <span className="non-valid">{formError.departmentName}</span>
                        </div>
                    </Col>


                </Row>&nbsp;
                <Row>
                    <Col></Col>
                    <Col>
                        <div className="d-grid gap-2 p-2 justify-content">
                            <button variant="primary" type="button" className="btn btn-light btn-outline-secondary" id="formButton" onClick={addDepartments}>Save </button>

                        </div>

                    </Col>
                    <Col></Col>

                </Row>

            </form>&nbsp;


        </Container>


    );


}
