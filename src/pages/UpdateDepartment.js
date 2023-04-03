import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export const UpdateDepartment = () => {

    const departmentNamec = useRef(null);
    const [formError, setFormError] = useState({});

    const { idD } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://localhost:44392/api/departments/${idD}`).then((response) => {
            departmentNamec.current.value = response.data.departmentName;
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const updateDepartmentHandler = () => {
        let isValid = validateForm()
        if (isValid) {
            var payload = {
                departmentName: departmentNamec.current.value,
                id: idD
            };
            axios.put(`https://localhost:44392/api/departments/${idD}`, payload).then((res) => {
                navigate("/department");
            }).catch((error) => {
                console.log(error);
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
                <Row><Col>
                </Col>
                    <Col>
                        <div className="d-grid gap-2 p-2 justify-content">
                            <button variant="primary" type="button" className="btn btn-light btn-outline-secondary" id="formButton" onClick={updateDepartmentHandler}>Update </button>

                        </div>

                    </Col>
                    <Col></Col>
                </Row>

            </form>&nbsp;


        </Container>

    );
}