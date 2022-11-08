import { Route, Routes, Link, redirect, Navigate} from "react-router-dom"
import React, {useState, useEffect} from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";

import Login from "./components/auth/login"
import Dashboard from "./components/dashboardComponent/dashboard"
import { url } from "./globalurl";


export default function MainRouter() {
  const [isLogged, setIsLogged] = useState(false)
  const [loader, setLoader] = useState(true)
  const [role, setRole] = useState(false)

  useEffect(() => {
    handleLoginCheck()
}, [])


// function to validate login for redirection

const handleLoginCheck = () => {
    axios({
        url : `${url}dj-rest-auth/user/`,
        method : 'GET',
        headers : {
            'Authorization': "Bearer "+ localStorage.getItem('access-token')
        }
    }).then((res) => {
        if (res.status === 200) {
            if (res.data.isAdmin) {
                setRole("Staff")
            } else if (res.data.isStaff) {
                setRole("Admin")
            }
            setLoader(false)
            setIsLogged(true)
        }
    }).catch((err) => {
        if(err.response?.status === 401 || err.response?.status === 400|| err.response?.status === 403) {
            // refresh token here
            setLoader(false)
            setIsLogged(false)
        } else {
            setLoader(false)
            setIsLogged(true)
        }
        console.log(isLogged)
    })
}

if (loader) {
    return (
        <Box sx={{display : 'flex', flex : 1, justifyContent:'center', alignItems:'center'}}>
            <CircularProgress />
        </Box>
    )
} else {
    return (
      <Routes>
        
        <Route exact="true" path="/*" element={<Dashboard setIsLogged={setIsLogged} role={role}/>} />
        <Route exact="false"
          path="/login" element={!isLogged ? <Login setIsLogged={setIsLogged} setRole={setRole} /> : <Navigate replace to="/" />}/>
      </Routes>
      // <Routes>
      //     <Route exact path='/'>
      //         <Dashboard setIsLogged={setIsLogged} role={role} />
      //     </Route>
      //     <Route exact path="/login">
      //         {!isLogged ? <Login setIsLogged={setIsLogged} setRole={setRole} /> : <redirect to="/" />}
      //     </Route>
      //     {/* <Route exact path="/cp-register" >
      //         {!isLogged ? <Register setIsLogged={setIsLogged} setRole={setRole}/> : <redirect to="/" />}
      //     </Route> */}
      // </Routes>
    );
}
}
  // return (
  //   <>
  //     {/* <nav>
  //       <ul>
  //         <li><Link to="/">Home</Link></li>
  //       </u
  //     </nav> */}

  //     <Routes>
  //       <Route exact="true" path="/*" element={<Dashboard />} />
  //       <Route  path="/login" element={<Login setIsLogged={setIsLogged} setRole={setRole} />} />
        
  //     </Routes>
  //   </>
  // )
// }