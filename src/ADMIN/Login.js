import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginForm = (e) => {
      e.preventDefault();
      let params = {
          username: email,
          userPassword: password
      };

      fetch('http://localhost:5000/login', {
          method: 'post',
          headers: {
              Accept: 'application/json',
              'Content-type': 'application/json'
          },
          body: JSON.stringify(params)
      })
      .then((res) => res.json())
      .then((userData) => {
          console.log(userData);
          if(userData !== 'invalid') {
              localStorage.setItem("userdata", JSON.stringify(userData));
              setTimeout(() => {
                  navigate('/');
                  window.location.reload();
              }, 1000);
          } else {
              console.log("not valid");
          }
          console.log(localStorage);
      });
  }
  return (
    <>
      <section className="text-center text-lg-start">
        <style>
          {`
            .rounded-t-5 {
              border-top-left-radius: 0.5rem;
              border-top-right-radius: 0.5rem;
            }

            @media (min-width: 992px) {
              .rounded-tr-lg-0 {
                border-top-right-radius: 0;
              }

              .rounded-bl-lg-5 {
                border-bottom-left-radius: 0.5rem;
              }
            }
          `}
        </style>
        <div className="card mb-3">
          <div className="row g-0 d-flex align-items-center">
            <div className="col-lg-4 d-none d-lg-flex">
              <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" alt="Trendy Pants and Shoes" className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" />
            </div>
            <div className="col-lg-8">
              <div className="card-body py-5 px-md-5">

                <form onSubmit={loginForm}>
                <h3 style={{ textAlign: "center" }}>Login</h3>
                  {/* Email input */}
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="email" id="form2Example1" className="form-control" name="username" onChange={(e)=>setEmail(e.target.value)} />
                    <label className="form-label" htmlFor="form2Example1">Email address</label>
                  </div>

                  {/* Password input */}
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control" name="userPassword" onChange={(e)=>setPassword(e.target.value)}/>
                    <label className="form-label" htmlFor="form2Example2">Password</label>
                  </div>

                  {/* 2 column grid layout for inline styling */}
                  <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                      {/* Checkbox */}
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                        <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                      </div>
                    </div>

                    <div className="col">Don't have an account? 
                      <a href="/register">Register</a>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Sign in</button>

                </form>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
