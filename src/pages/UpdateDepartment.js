import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export const UpdateDepartment = () => {

    const departmentNamec = useRef(null);

    const { idD } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://localhost:44392/api/departments/${idD}`).then((response) => {
            departmentNamec.current.value = response.data.departmentName;
        })
    }, []);

    function updateDepartmentHandler() {
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
                            <button variant="primary" type="button" className="btn btn-primary" id="formButton" onClick={updateDepartmentHandler}>Update </button>

                        </div>

                    </div>

                </div>

            </form>&nbsp;


        </div>

    );
}