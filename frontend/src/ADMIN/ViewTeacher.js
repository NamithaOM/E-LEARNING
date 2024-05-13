import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

function ViewTeacher() {
    const [teacherData, setTeacherData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/viewTeacher')
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setTeacherData(result.logData);
            })
            .catch((error) => {
                console.error("Error fetching teacher data:", error);
            });
    }, []);

    const deleteTeacher = (id) => {
        let params = {
            id: id
        }

        fetch('http://localhost:5000/deleteTeacher', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(params)
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
        })
        .then(() => navigate('/viewTeacher'));
    }

    return (
        <>
            <div>
                <Dashboard />
                <main className="col-md-9 ms-sm-auto col-lg-10 ">
                    <h2>Teachers List</h2>
                    <div className="table-responsive">
                        <div className="text-end mb-3">
                            <Link to='/addTeacher'>
                                <button className="btn btn-dark" type="submit">Add Teacher</button>
                            </Link>
                        </div>
                        <table className="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">Sl. No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Dob</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Qualification</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teacherData.map((teacherDt, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{teacherDt.teacherDetails.name}</td>
                                        <td>{teacherDt.teacherDetails.dob}</td>
                                        <td>{teacherDt.teacherDetails.gender}</td>
                                        <td>{teacherDt.teacherDetails.qualification}</td>
                                        <td>{teacherDt.teacherDetails.address}</td>
                                        <td>{teacherDt.teacherDetails.phone}</td>
                                        <td>{teacherDt.email}</td>
                                        <td>
                                            <Link to='/updateTeacher' state={{ id: teacherDt.teacherDetails._id }}>
                                                <button className="btn btn-primary me-1" type="submit">Edit</button>
                                            </Link>
                                            <button className="btn btn-danger" onClick={() => deleteTeacher(teacherDt.teacherDetails._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </>
    );
}

export default ViewTeacher;
