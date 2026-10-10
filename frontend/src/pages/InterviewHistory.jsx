import "../styles/InterviewHistory.css";
import "../styles/Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
                    "http://127.0.0.1:8000/api/interview/history",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setInterviews(response.data.interviews || []);
                setError("");
            } catch (err) {
                console.error("Interview history error:", err);

                if (err.response?.status === 401 ||
                    err.response?.status === 403) {
                    setError("Your login session has expired. Please log in again.");
                } else {
                    setError(
                        err.response?.data?.detail ||
                        "Unable to load interview history. Please try again."
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [navigate]);

    const openReport = (interview) => {
        if (!interview.interview_id) {
            setError("The report ID is missing for this interview.");
            return;
        }

        navigate(`/report/${interview.interview_id}`);
    };

    return (
        <main className="history-page">
            <section className="history-container">
                <header className="history-header">
                    <h1>Interview History</h1>
                    <p>
                        View your previous interviews, feedback and performance.
                    </p>
                </header>

                <section className="history-panel">
                    <h2>Your Previous Interviews</h2>

                    {loading && (
                        <div className="history-message">
                            <div className="history-spinner" />
                            <p>Loading your interviews...</p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="history-error" role="alert">
                            {error}

                            {error.includes("session has expired") && (
                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                >
                                    Log In Again
                                </button>
                            )}
                        </div>
                    )}

                    {!loading && !error && interviews.length === 0 && (
                        <div className="history-empty">
                            <h3>No interviews yet</h3>
                            <p>
                                Complete a mock interview and your previous
                                interviews will appear here.
                            </p>
                            <button
                                type="button"
                                onClick={() => navigate("/create-interview")}
                            >
                                Start an Interview
                            </button>
                        </div>
                    )}

                    {!loading && !error && interviews.length > 0 && (
                        <div className="history-grid">
                            {interviews.map((interview, index) => (
                                <article
                                    className="history-card"
                                    key={
                                        interview.interview_id ||
                                        `${interview.role || "interview"}-${index}`
                                    }
                                >
                                    <div className="history-card-header">
                                        <h3>
                                            {interview.role || "Mock Interview"}
                                        </h3>

                                        <span className="history-badge">
                                            {interview.difficulty || "Practice"}
                                        </span>
                                    </div>

                                    <div className="history-details">
                                        <div className="history-detail">
                                            <span>Technology</span>
                                            <strong>
                                                {interview.technology || "N/A"}
                                            </strong>
                                        </div>

                                        <div className="history-detail">
                                            <span>Experience</span>
                                            <strong>
                                                {interview.experience ?? "N/A"}
                                            </strong>
                                        </div>

                                        <div className="history-detail">
                                            <span>Questions</span>
                                            <strong>
                                                {interview.number_of_questions ?? "N/A"}
                                            </strong>
                                        </div>

                                        <div className="history-detail">
                                            <span>Average Score</span>
                                            <strong>
                                                {interview.average_score ?? "Not evaluated"}
                                            </strong>
                                        </div>

                                        <div className="history-detail">
                                            <span>Grade</span>
                                            <strong>
                                                {interview.grade ?? "Not available"}
                                            </strong>
                                        </div>

                                        <div className="history-detail">
                                            <span>Date</span>
                                            <strong>
                                                {interview.created_at
                                                    ? new Date(
                                                          interview.created_at
                                                      ).toLocaleString()
                                                    : "N/A"}
                                            </strong>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="history-report-btn"
                                        onClick={() => openReport(interview)}
                                    >
                                        View Report
                                    </button>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <button
                    type="button"
                    className="history-back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    Back to Dashboard
                </button>
            </section>
        </main>
    );
}

export default InterviewHistory;
