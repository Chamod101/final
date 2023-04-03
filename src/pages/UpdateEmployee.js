import axios from "axios";
import { format } from "date-fns";
import { useState, useEffect, useRef } from "react";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export const UpdateEmployee = () => {
    const employeeFirstName = useRef(null);
    const employeeLastName = useRef(null);
    const employeeEmail = useRef(null);
    const employeeDoB = useRef(null);
    const employeeAge = useRef(null);
    const employeeSalary = useRef(null);
    const employeeDepartment = useRef(null);

    const [departments, setDepartments] = useState([]);

    const { idE } = useParams();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(null);
    const [formError, setFormError] = useState({});

    useEffect(() => {
        calculateAge();
    }, [startDate]);

    const calculateAge = () => {
        const today = new Date();
        const currentYear = today.getYear();
        const dob = new Date(startDate);
        const modDob = format(dob, 'yyyy-MM-dd')
        const formatDate = format(dob, 'yyyy-MM-dd').slice(0, 4);
        const dobYear = dob.getYear();

        if (formatDate != 1970) {
            employeeAge.current.value = currentYear - dobYear;

        }
    }

    useEffect(() => {
        axios.get(`https://localhost:44392/api/employees/${idE}`).then((response) => {
            employeeFirstName.current.value = response.data.firstName;
            employeeLastName.current.value = response.data.lastName;
            employeeEmail.current.value = response.data.email;
            employeeDoB.current.value = response.data.dob;
            employeeAge.current.value = response.data.age;
            employeeSalary.current.value = response.data.salary;
            employeeDepartment.current.value = response.data.departmentName;
        }).catch((err) => {
            console.log(err);
        })
    }, []);




    useEffect(() => {
        axios.get("https://localhost:44392/api/departments").then((res) => {
            setDepartments((existingData) => {
                return res.data
            })
        }).catch((err) => {
            console.log(err);
        })
    }, []);


    const validateForm = () => {
        let err = {};

        if (employeeFirstName.current.value === '') {
            err.firstName = 'First Name Required'
        } else {
            let regex = /[^a-zA-Z]/ig;
            if (regex.test(employeeFirstName.current.value)) {
                err.firstName = 'First Name Cannot Contain Numbers'
            }
        }

        if (employeeLastName.current.value === '') {
            err.lastName = 'Last Name Required'
        } else {
            let regex = /[^a-zA-Z]/ig;
            if (regex.test(employeeLastName.current.value)) {
                err.lastName = 'Last Name Cannot Contain Numbers'
            }
        }

        if (employeeEmail.current.value === '') {
            err.email = 'Email Required'
        } else {
            let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!regex.test(employeeEmail.current.value)) {
                err.email = 'Email Not Valid!'
            }
        }

        if (startDate === null) {
            err.dob = 'Please Select Your Date of Birth'
        }
        if (employeeAge.current.value < 18) {
            err.age = 'You are under age'
        }
        if (employeeAge.current.value === '') {
            err.age = 'Age Required'
        }
        if (employeeSalary.current.value === '') {
            err.salary = 'Salary Required'
        }
        if (employeeDepartment.current.value == '') {
            err.departmentName = 'Please Select a Department'
        }

        setFormError({ ...err })

        return Object.keys(err).length < 1;
    }


    const updateEmployeeHandler = () => {
        let isValid = validateForm()
        if (isValid) {
            var payload = {
                id: idE,
                firstName: employeeFirstName.current.value,
                lastName: employeeLastName.current.value,
                email: employeeEmail.current.value,
                dob: employeeDoB.current.value,
                age: employeeAge.current.value,
                salary: employeeSalary.current.value,
                departmentName: employeeDepartment.current.value
            };
            axios.put(`https://localhost:44392/api/employees/${idE}`, payload).then((res) => {
                navigate("/employee");
            }).catch((error) => {
                console.log(error);
            })
        }

    }


    return (

        <Container className="bg-light border">


            <form >

                <Row>
                    <Col>
                        <div className="form-floating">
                            <input type="text" className="form-control" id="formFirstName" placeholder="First Name" ref={employeeFirstName}
                            ></input>
                            <label >First Name</label>
                            <span className="non-valid">{formError.firstName}</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-floating">
                            <input type="lastName" className="form-control" id="formLastName" placeholder="Last Name" ref={employeeLastName}
                            ></input>
                            <label >Last Name</label>
                            <span className="non-valid">{formError.lastName}</span>
                        </div>
                    </Col>

                </Row> &nbsp;
                <Row>
                    <Col>
                        <div className="form-floating">
                            <input type="email" className="form-control" id="formEmail" placeholder="name@example.com" ref={employeeEmail}></input>
                            <label >Email address</label>
                            <span className="non-valid">{formError.email}</span>
                        </div>
                    </Col>


                    <Col>
                        <div className="form-floating" >


                            <input type="date" ref={employeeDoB} className="form-control" placeholder="" selected={startDate} onChange={date => setStartDate(date.target.value)} ></input>
                            <label >Date of Birth</label>
                            <span className="non-valid">{formError.dob}</span>

                        </div>
                    </Col>

                </Row>&nbsp;
                <Row>

                    <Col>
                        <div className="form-floating">
                            <input type="text" className="form-control" id="formAge" placeholder="Age" ref={employeeAge} readOnly
                            ></input>
                            <label >Age</label>
                            <span className="non-valid">{formError.age}</span>
                        </div>
                    </Col>
                    <Col>

                        <div className="input-group">
                            <span className="input-group-text">LKR</span>
                            <div className="form-floating">
                                <input type="number" className="form-control" id="formSalary" placeholder="Username" ref={employeeSalary}  ></input>
                                <label >Salary</label>
                                <span className="non-valid">{formError.salary}</span>
                            </div>
                        </div>


                    </Col>

                </Row>&nbsp;
                <Row>
                    <Col>
                        <div className="form-floating">
                            <select className="form-control" id="formDepartment" placeholder="Department" ref={employeeDepartment}>
                                <option>Choose a department</option>
                                {
                                    departments.map((dp) => (
                                        <option value={dp.departmentName} key={dp.id}>{dp.departmentName}</option>
                                    )
                                    )
                                }
                            </select>
                            <label >Department</label>
                            <span className="non-valid">{formError.departmentName}</span>
                        </div>
                    </Col>


                </Row>&nbsp;
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <div className="d-grid h-100 gap-2 p-2 justify-content">
                            <button variant="primary" type="button" className="btn btn-primary" id="formButton" onClick={updateEmployeeHandler}>Update </button>

                        </div>

                    </Col>
                    <Col>
                    </Col>

                </Row>

            </form >


        </Container>


    );
}