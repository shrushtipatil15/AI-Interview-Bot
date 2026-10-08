import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/Login.css";
function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await API.post("/auth/login", user);

            // Save JWT Token
            localStorage.setItem(
                "token",
                res.data.access_token
            );

            // Save Logged-in User
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.detail ||
                "Login Failed"
            );

        }
    };

  return (
    <div className="login-page">

        <div className="login-card">

            <h1>Welcome Back</h1>


            <form 
            className="login-form"
            onSubmit={handleSubmit}
            >

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={user.email}
                    onChange={handleChange}
                    required
                />


                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />


                <button type="submit" 
                onClick={()=>navigate("/dashboard")}>
                    Login
                </button>

            </form>


            <p className="login-register">

                Don't have an account?{" "}

                <span onClick={()=>navigate("/register")}>
                    Register
                </span>

            </p>


        </div>

    </div>
);
}

export default Login;