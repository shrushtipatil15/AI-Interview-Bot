
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="page-container">
            <div className="dashboard-page">
                <div className="dashboard-container">

                    <div className="dashboard-header">
                        <h1>AI Interview Dashboard</h1>

                        <p>
                            Welcome back,{" "}
                            <span>{user?.name || "User"}</span> 👋
                        </p>

                        <small>{user?.email || ""}</small>
                    </div>

                    <div className="dashboard-cards">

                        <div className="dashboard-box">
                            <h3>Start New Interview</h3>

                            <p>
                                Create an AI-powered mock interview
                                based on your role and skills.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/create-interview")
                                }
                            >
                                Start Interview
                            </button>
                        </div>

                        <div className="dashboard-box">
                            <h3>Interview History</h3>

                            <p>
                                View your previous interviews,
                                feedback and performance.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/interview-history")
                                }
                            >
                                View History
                            </button>
                        </div>

                    </div>

                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;
