import './App.css';
import React,{useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './ADMIN/Login';
import Register from './ADMIN/Register';
import Dashboard from './ADMIN/Dashboard';
import AdminHome from './ADMIN/AdminHome';
import AddTeacher from './ADMIN/AddTeacher';
import ViewTeacher from './ADMIN/ViewTeacher';
import UpdateTeacher from './ADMIN/UpdateTeacher';

function App() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')))
  return (

    <BrowserRouter>
    {auth==null? (
    <>
     <Routes>
      <Route path='/' element={<Login/>}>
      </Route>
      <Route path='/register' element={<Register/>}>
      </Route>
      <Route path='/dashboard' element={<Dashboard/>}>
      </Route>
      
    </Routes>
    </>
    // admin
    ):auth.userStatus==0 ? (

     
    <>
      <Routes>
      {/* <Route path='/' element={<Login/>}> */}
      {/* </Route> */}
      {/* <Route path='/register' element={<Register/>}>
      </Route> */}
      <Route path='/dashboard' element={<Dashboard/>}> 
      </Route>
      <Route path='/' element={<AdminHome/>}>
      </Route>
      <Route path='/addTeacher' element={<AddTeacher/>}>
      </Route>
      <Route path='/viewTeacher' element={<ViewTeacher/>}>  
      </Route>
      <Route path='/updateTeacher' element={<UpdateTeacher/>}></Route>
      </Routes>

      </>

    // teacher

    ) :auth.userStatus==1 ? (
      <>
      <Routes>
      {/* <Route path='/' element={<Login/>}>
      </Route> */}
      <Route path='/register' element={<Register/>}>
      </Route>
      <Route path='/' element={<Dashboard/>}>
        
      </Route>
      </Routes>

      </>
// student
    ):(
<>
<Routes>
   
      <Route path='/' element={<Register/>}>
      </Route>
      <Route path='/dashboard' element={<Dashboard/>}>
        
      </Route>
      </Routes>

</>   
 )
   
}
    </BrowserRouter>
    
  );
}

export default App;
