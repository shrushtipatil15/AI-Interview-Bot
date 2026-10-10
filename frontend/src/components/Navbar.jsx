import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    return (

        <nav className="navbar">

            <div
                className="logo"
                onClick={() => navigate("/")}
            >
                Intervoro AI
            </div>

            <div className="nav-menu">

                <span
                    className="nav-item"
                    onClick={() => navigate("/")}
                >
                    Home
                </span>

                <span
                    className="nav-item"
                   onClick={() => navigate("/features")}
                >
                    Features
                </span>

                <span
                    className="nav-item"
                    onClick={() => navigate("/contact")}
                >
                    Contact Us
                </span>

                <span
                    className="nav-item"
                     onClick={() => navigate("/about")}
                >
                    About
                </span>

            </div>

            <div className="nav-links">

                <button
                    className="nav-register"
                    onClick={() => navigate("/register")}
                >
                    Sign Up
                </button>

            </div>

        </nav>

    );

}

export default Navbar;