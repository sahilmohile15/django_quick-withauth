import { Route, Routes, Link } from "react-router-dom"

import Dashboard from "./components/dashboardComponent/dashboard"


export default function MainRouter() {
  return (
    <>
      {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
        </u
      </nav> */}

      <Routes>
        <Route exact="true" path="/*" element={<Dashboard />} />
        
      </Routes>
    </>
  )
}