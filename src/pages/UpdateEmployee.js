import axios from "axios";
import { format } from "date-fns";
import { useState, useEffect, useRef } from "react";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import { Navigate, useNavigate, useParams } from "react-router-dom";

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
        })
    }, []);




    useEffect(() => {
        axios.get("https://localhost:44392/api/departments").then((res) => {
            setDepartments((existingData) => {
                return res.data
            })
        });
    }, []);

    function updateEmployeeHandler() {
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


    return (

        <div className="container">

            <form >
                <div className="row">
                    <div className="col">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="formFirstName" placeholder="First Name" ref={employeeFirstName}
                            ></input>
                            <label >First Name</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating">
                            <input type="lastName" className="form-control" id="formLastName" placeholder="Last Name" ref={employeeLastName}
                            ></input>
                            <label >Last Name</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating">
                            <input type="email" className="form-control" id="formEmail" placeholder="name@example.com" ref={employeeEmail}></input>
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
                        <div className="d-grid h-100 gap-2 p-2 justify-content">
                            <button variant="primary" type="button" className="btn btn-primary" id="formButton" onClick={updateEmployeeHandler}>Update </button>

                        </div>

                    </div>

                </div>

            </form >&nbsp;


        </div >


    );
}