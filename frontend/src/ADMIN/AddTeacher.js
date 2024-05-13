import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTeacher() {

    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [qualification, setQualifiction] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [phno, setPhno] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const addTeacher = (e) => {
        e.preventDefault()
        navigate('/viewTeacher')
        let params = {
            name: name,
            dob: dob,
            gender: gender,
            qualification: qualification,
            address: address,
            phno: phno,
            email: email,
            password: password,
            status: 1

        }
        fetch('http://localhost:5000/addTeacher', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)

        }).then((res) => res.json()).then((result) => {
            console.log(result);
        })

    }


    return (
        <>
        <section className="h-100 bg-dark">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card card-registration my-4">
                            <div className="row g-0">
                                <div className="col-xl-6 d-none d-xl-block">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                                        alt="Sample photo"
                                        className="img-fluid"
                                        style={{
                                            borderTopLeftRadius: ".25rem",
                                            borderBottomLeftRadius: ".25rem",
                                        }}
                                    />
                                </div>
                                <div className="col-xl-6">
                                    <form method="post" onSubmit={addTeacher}>
                                        <div className="card-body p-md-5 text-black">
                                            <h3 className="mb-5 text-uppercase">Add Teacher</h3>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <input type="text" name="name" id="form3Example1m" className="form-control form-control-lg" onChange={(e) => setName(e.target.value)} />
                                                        <label className="form-label" htmlFor="form3Example1m">Full name</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <input type="date" name="dob" id="form3Example1n" className="form-control form-control-lg" onChange={(e) => setDob(e.target.value)} />
                                                        <label className="form-label" htmlFor="form3Example1n">Date of birth</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <textarea id="form3Example1n1" name="address" className="form-control form-control-lg" onChange={(e) => setAddress(e.target.value)} />
                                                        <label className="form-label" htmlFor="form3Example1n1">Address</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <label className="form-label" htmlFor="form3Example1n1">Gender</label> <br></br>
                                                    <label className="form-label" htmlFor="form3Example1n1">Female</label>
                                                    <input className="form-check-input" type="radio" name="gender" id="femaleGender" value="female" onChange={(e) => setGender(e.target.value)} />
                                                    <label className="form-label" htmlFor="form3Example1n1">Male</label>
                                                    <input className="form-check-input" type="radio" name="gender" id="maleGender" value="male" onChange={(e) => setGender(e.target.value)} />
                                                    <label className="form-label" htmlFor="form3Example1n1">Others</label>
                                                    <input className="form-check-input" type="radio" name="gender" id="otherGender" value="other" onChange={(e) => setGender(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <input type="text" name="phno" id="form3Example1n2" className="form-control form-control-lg" onChange={(e) => setPhno(e.target.value)} />
                                                        <label className="form-label" htmlFor="form3Example1n2">Phone</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <input type="email" name="email" id="form3Example1n3" className="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)} />
                                                        <label className="form-label" htmlFor="form3Example1n3">Email</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <input type="password" name="password" id="form3Example1n4" className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} />
                                                        <label className="form-label" htmlFor="form3Example1n4">Password</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end pt-3">
                                                <button
                                                    type="button"
                                                    data-mdb-button-init
                                                    data-mdb-ripple-init
                                                    className="btn btn-light btn-lg"
                                                >
                                                    Reset all
                                                </button>
                                                <button
                                                    type="submit"
                                                    data-mdb-button-init
                                                    data-mdb-ripple-init
                                                    className="btn btn-warning btn-lg ms-2"
                                                >
                                                    Submit 
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    )

}
export default AddTeacher