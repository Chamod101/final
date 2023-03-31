import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const AddDepartment = () => {

    const departmentNamec = useRef(null);

    const navigate = useNavigate();

    function addDepartments() {
        var payload = {
            departmentName: departmentNamec.current.value

        };
        axios.post("https://localhost:44392/api/departments/", payload).then((res) => {
            navigate("/department");
        })
    }

    return (

        <div className="container">


            <form >
                <div className="row">
                    <div className="col">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="formDeparmentName" placeholder="Department Name" ref={departmentNamec}
                            ></input>
                            <label >Department Name</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="d-grid gap-2 p-2 justify-content">
                            <button variant="primary" type="button" className="btn btn-primary" id="formButton" onClick={addDepartments}>Save </button>

                        </div>

                    </div>

                </div>

            </form>&nbsp;


        </div>


    );


}
