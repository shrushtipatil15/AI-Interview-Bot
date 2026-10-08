import {BrowserRouter, Routes, Route} from "react-router-dom";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import CreateInterview from "./pages/CreateInterview";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import InterviewSetup from "./pages/InterviewSetup";
import Interview from "./pages/Interview";
import Result from "./pages/Result";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Report from "./pages/Report";

function App(){


return (

  
  

<BrowserRouter> 

<Navbar/>


<Routes>


<Route path="/" element={<Home/>}/>

<Route path="/about" element={<About/>}/>
<Route path="/login" element={<Login/>}/>


<Route path="/register" element={<Register/>}/>


<Route path="/dashboard" element={<Dashboard/>}/>


<Route path="/contact" element={<Contact/>}/>
<Route path="/setup" element={<InterviewSetup/>}/>


<Route path="/interview/:id" element={<Interview/>}/>

<Route path="/result/:id" element={<Result/>}/>
<Route path="/report/:id" element={<Report/>}/>
<Route
    path="/create-interview"
    element={<CreateInterview />}
/>


</Routes>


<Footer/>


</BrowserRouter>

);


}


export default App;