import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register(){

    const navigate = useNavigate();

    const [user,setUser] = useState({
        name:"",
        email:"",
        phone:"",
        password:""
    });


    const handleChange=(e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        });
    };


    const handleSubmit=async(e)=>{
        e.preventDefault();

        try{

            await API.post("/auth/register",user);

            alert("Registration successful");

            navigate("/login");

        }
        catch(error){

            console.log(error);
            alert("Registration failed");

        }
    };


    return(

        <div className="register-page">

            <div className="register-card">

                <h1>Create Account</h1>


                <form 
                className="register-form"
                onSubmit={handleSubmit}
                >


                    <input
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                    />


                    <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    required
                    />


                   
                    <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    />


                    <button type="submit"
                    onClick={()=>navigate("/login")}>
                        Register
                    </button>


                </form>


                <p className="register-login">

                    Already signed in?{" "}

                    <span onClick={()=>navigate("/login")}>
                        Login
                    </span>

                </p>


            </div>

        </div>

    )
}

export default Register;