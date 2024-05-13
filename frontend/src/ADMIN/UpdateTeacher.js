import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function UpdateTeacher(){

    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [qualification, setQualifiction] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [phno, setPhno] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const location=useLocation()

    useEffect(()=>{
        let teacherId={
            id:location.state.id
        }
        fetch('http://localhost:5000/findTeacher' ,{
            method:'post',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },body:JSON.stringify(teacherId)
        })
        .then((res)=>res.json())
        .then((result)=>{
            console.log(result);

            setName(result.regData.name)
            setDob(result.regData.dob)
            setGender(result.regData.gender)
           setQualifiction (result.regData.qualification)
           setAddress (result.regData.address)
            setPhno(result.regData.phone)
            setEmail(result.logData.email)
               })
    },[])

    const updateTeacher = (e) => {
        e.preventDefault()
        navigate('/viewTeacher')
        let params = {
            names: name,
            dobs: dob,
            genders: gender,
            qualifications: qualification,
            addresss: address,
            phnos: phno,
            emails: email,
            id:location.state.id
        }
        fetch('http://localhost:5000/updateTeachers', {
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
                                            src="/images/teacher.jpg"
                                            alt="Sample photo"
                                            className="img-fluid"
                                            style={{
                                                marginTop: ".100rem",
                                                borderTopLeftRadius: ".25rem",
                                                borderBottomLeftRadius: ".25rem",
                                            }}
                                        />

                                    </div>
                                    <form method="post" onSubmit={updateTeacher}>
                                        <div className="col-xl-6">
                                            <div className="card-body p-md-5 text-black">
                                                <h3 className="mb-5 text-uppercase">Teacher Updation</h3>

                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <div data-mdb-input-init className="form-outline">
                                                            <input type="text" name="names" value={name} id="form3Example1m" className="form-control form-control-lg" onChange={(e) => setName(e.target.value)} />
                                                            <label className="form-label" htmlFor="form3Example1m">Full name</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 mb-4">
                                                        <div data-mdb-input-init className="form-outline">
                                                            <input type="date" name="dobs" value={dob} id="form3Example1n" className="form-control form-control-lg" onChange={(e) => setDob(e.target.value)} />
                                                            <label className="form-label" htmlFor="form3Example1n">Date of birth</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <div data-mdb-input-init className="form-outline">
                                                            <input type="text" id="form3Example1n1" name="genders" value={gender} className="form-control form-control-lg" onChange={(e) => setAddress(e.target.value)} />
                                                            <label className="form-label" htmlFor="form3Example1n1">Gender</label>
                                                        </div>
                                                </div>
                                              
                                                    <div className="col-md-6 mb-4">
                                                        <div data-mdb-input-init className="form-outline">
                                                            <input type="text" id="form3Example1m" value={qualification} name="qualifications" className="form-control form-control-lg" onChange={(e) => setQualifiction(e.target.value)} />
                                                            <label className="form-label" htmlFor="form3Example1m">Qualification</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <div data-mdb-input-init className="form-outline">
                                                            <textarea id="form3Example1n1" name="addresss" value={address} className="form-control form-control-lg" onChange={(e) => setAddress(e.target.value)} />
                                                            <label className="form-label" htmlFor="form3Example1n1">Address</label>
                                                        </div>
                                                    </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <div data-mdb-input-init className="form-outline">
                                                            <input type="text" name="phnos" value={phno} id="form3Example1n2" className="form-control form-control-lg" onChange={(e) => setPhno(e.target.value)} />
                                                            <label className="form-label" htmlFor="form3Example1n2">Phone</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 mb-4">
                                                        <div data-mdb-input-init className="form-outline">
                                                            <input type="email" name="emails" value={email} id="form3Example1n3" className="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)} />
                                                            <label className="form-label" htmlFor="form3Example1n3">Email</label>
                                                        </div>
                                                    </div>
                                                </div>
</div>

                                                <div className="d-flex justify-content-end pt-3">
                                                 
                                                    <button
                                                        type="submit"
                                                        data-mdb-button-init
                                                        data-mdb-ripple-init
                                                        className="btn btn-warning btn-lg ms-2"
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </>
    )

}

export default UpdateTeacher