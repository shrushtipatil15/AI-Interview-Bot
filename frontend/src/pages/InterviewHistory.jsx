import "../styles/InterviewHistory.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";

function InterviewHistory() {
    const navigate = useNavigate();

    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get(
                    "http://localhost:8000/api/interview/history",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setInterviews(response.data.interviews || []);
            } catch (err) {
                console.error("Interview history error:", err);

                setError(
                    err.response?.data?.detail ||
                    "Unable to load interview history. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [navigate]);

    const openReport = (interview) => {
        navigate(`/report/${interview.interview_id}`);
    };

    return (
        <div className="page-container">
            <div className="dashboard-page">
                <div className="dashboard-container">

                    <div className="dashboard-header">
                        <h1>Interview History</h1>

                        <p>
                            View your previous interviews, feedback
                            and performance.
                        </p>
                    </div>

                    <div className="dashboard-cards">
                        <div
                            className="dashboard-box"
                            style={{ width: "100%" }}
                        >
                            <h3>Your Previous Interviews</h3>

                            {loading && (
                                <p>Loading your interviews...</p>
                            )}

                            {!loading && error && (
                                <p style={{ color: "#ff7777" }}>
                                    {error}
                                </p>
                            )}

                            {!loading &&
                                !error &&
                                interviews.length === 0 && (
                                    <p>
                                        No previous interviews found.
                                        Complete an interview to see it here.
                                    </p>
                                )}

                            {!loading &&
                                !error &&
                                interviews.map((interview) => (
                                    <div
                                        key={interview.interview_id}
                                        style={{
                                            border: "1px solid #263b52",
                                            borderRadius: "14px",
                                            padding: "22px",
                                            margin: "16px 0",
                                            textAlign: "left",
                                        }}
                                    >
                                        <h3>
                                            {interview.role ||
                                                "Mock Interview"}
                                        </h3>

                                        <p>
                                            Technology:{" "}
                                            {interview.technology || "N/A"}
                                        </p>

                                        <p>
                                            Experience:{" "}
                                            {interview.experience || "N/A"}
                                        </p>

                                        <p>
                                            Difficulty:{" "}
                                            {interview.difficulty || "N/A"}
                                        </p>

                                        <p>
                                            Questions:{" "}
                                            {interview.number_of_questions ??
                                                "N/A"}
                                        </p>

                                        <p>
                                            Date:{" "}
                                            {interview.created_at
                                                ? new Date(
                                                      interview.created_at
                                                  ).toLocaleString()
                                                : "N/A"}
                                        </p>

                                        <p>
                                            Average Score:{" "}
                                            {interview.average_score ??
                                                "Not evaluated"}
                                        </p>

                                        <p>
                                            Grade:{" "}
                                            {interview.grade ??
                                                "Not available"}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                openReport(interview)
                                            }
                                            style={{
                                                cursor: "pointer",
                                                opacity: 1,
                                            }}
                                        >
                                            View Report
                                        </button>

                                        {!interview.report_available && (
                                            <p>
                                                Your report may not be
                                                generated yet.
                                            </p>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        className="logout-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        Back to Dashboard
                    </button>

                </div>
            </div>
        </div>
    );
}

export default InterviewHistory;
