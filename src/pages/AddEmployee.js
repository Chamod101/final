import axios from "axios";
import { format } from "date-fns";
import { useState, useEffect, useRef } from "react";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import { Navigate, useNavigate } from "react-router-dom";



export const AddEmployee = () => {
    const employeeFirstName = useRef(null);
    const employeeLastName = useRef(null);
    const employeeEmail = useRef(null);
    const employeeDoB = useRef(null);
    const employeeAge = useRef(null);
    const employeeSalary = useRef(null);
    const employeeDepartment = useRef(null);

    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get("https://localhost:44392/api/departments").then((response) => {
            setDepartments((existingData) => {
                return response.data
            })
        });
    }, []);

    useEffect(() => {
        calculateAge();
    }, [startDate]);

    const calculateAge = () => {
        const today = new Date();
        const currentYear = today.getYear();
        const dob = new Date(startDate);
        const formatDate = format(dob, 'yyyy-MM-dd').slice(0, 4);
        const dobYear = dob.getYear();

        if (formatDate != 1970) {
            employeeAge.current.value = currentYear - dobYear;
        }
    }

    function addEmployees() {
        var payload = {
            firstName: employeeFirstName.current.value,
            lastName: employeeLastName.current.value,
            email: employeeEmail.current.value,
            dob: startDate,
            age: employeeAge.current.value,
            salary: employeeSalary.current.value,
            departmentName: employeeDepartment.current.value
        };
        axios.post("https://localhost:44392/api/employees/", payload).then((res) => {
            navigate("/employee");
        })
    }


    return (

        <div className="container">

            <form >
                <div className="row">
                    <div className="col">
                        <div className="form-floating">
                            <input type="text" className="form-control" ref={employeeFirstName} placeholder="First Name" required
                            ></input>
                            <label >First Name</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating">
                            <input type="lastName" className="form-control" ref={employeeLastName} placeholder="Last Name"
                            ></input>
                            <label >Last Name</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating">
                            <input type="email" className="form-control" ref={employeeEmail} placeholder="name@example.com" ></input>
                            <label >Email address</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating" >

                            <input type="date" ref={employeeDoB} className="form-control" placeholder="" selected={startDate} onChange={date => setStartDate(date.target.value)} ></input>
                            <label >Date of Birth</label>
                        </div>
                    </div>

                </div> &nbsp;
                <div className="row">

                    <div className="col">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="formAge" placeholder="Age" ref={employeeAge} readOnly
                            ></input>
                            <label >Age</label>
                        </div>
                    </div>
                    <div className="col">

                        <div className="input-group">
                            <span className="input-group-text">LKR</span>
                            <div className="form-floating">
                                <input type="number" className="form-control" id="formSalary" placeholder="Username" ref={employeeSalary}  ></input>
                                <label >Salary</label>
                            </div>
                        </div>


                    </div>
                    <div className="col">
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
                        </div>
                    </div>
                    <div className="col">
                        <div className="d-grid gap-2 p-2 justify-content">
                            <button variant="primary" type="button" className="btn btn-primary" id="formButton" onClick={addEmployees}>Save </button>

                        </div>

                    </div>

                </div>

            </form >&nbsp;


        </div >

    );
}