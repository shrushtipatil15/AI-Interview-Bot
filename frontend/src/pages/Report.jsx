import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Report.css";

function Report() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Please log in to view your interview report.");
                    return;
                }

                // First try to generate/fetch the interview result.
                const response = await axios.get(
                    `http://localhost:8000/api/interview/result/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setReport(response.data);
            } catch (err) {
                console.error(
                    "Error loading report:",
                    err.response?.data || err.message
                );

                setError(
                    err.response?.data?.detail ||
                    "Unable to load this report. Please check whether you have submitted your interview answers."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    if (loading) {
        return (
            <main className="report-page">
                <div className="report-container">
                    <h1>Interview Report</h1>
                    <p>Loading your interview report...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="report-page">
                <div className="report-container">
                    <h1>Interview Report</h1>
                    <p className="report-error">{error}</p>
                    <button
                        className="report-button"
                        onClick={() => navigate("/interview-history")}
                    >
                        Back to Interview History
                    </button>
                </div>
            </main>
        );
    }

    if (!report) {
        return null;
    }

    return (
        <main className="report-page">
            <div className="report-container">
                <h1>Interview Report</h1>
                <p className="report-subtitle">
                    Review your interview performance and personalized feedback.
                </p>

                <section className="report-summary">
                    <div className="report-card">
                        <h3>Average Score</h3>
                        <p className="report-score">
                            {report.average_score ?? 0} / 10
                        </p>
                    </div>

                    <div className="report-card">
                        <h3>Total Score</h3>
                        <p className="report-score">
                            {report.total_score ?? 0}
                        </p>
                    </div>

                    <div className="report-card">
                        <h3>Grade</h3>
                        <p className="report-grade">
                            {report.grade ?? "N/A"}
                        </p>
                    </div>

                    <div className="report-card">
                        <h3>Total Questions</h3>
                        <p className="report-score">
                            {report.total_questions ??
                                report.answers?.length ??
                                0}
                        </p>
                    </div>
                </section>

                <section className="report-section">
                    <h2>Your Strengths</h2>

                    {report.strengths?.length > 0 ? (
                        <ul>
                            {report.strengths.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No strengths recorded yet.</p>
                    )}
                </section>

                <section className="report-section">
                    <h2>Areas for Improvement</h2>

                    {report.weaknesses?.length > 0 ? (
                        <ul>
                            {report.weaknesses.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No improvement areas recorded yet.</p>
                    )}
                </section>

                <section className="report-section">
                    <h2>Question-wise Evaluation</h2>

                    {report.answers?.length > 0 ? (
                        report.answers.map((answer, index) => (
                            <article
                                className="report-answer"
                                key={answer.question_number ?? index}
                            >
                                <h3>
                                    Question {answer.question_number ?? index + 1}
                                </h3>

                                <p>
                                    <strong>Question:</strong>{" "}
                                    {answer.question}
                                </p>

                                <p>
                                    <strong>Your Answer:</strong>{" "}
                                    {answer.answer || "No answer provided"}
                                </p>

                                <p>
                                    <strong>Score:</strong>{" "}
                                    {answer.score} / 10
                                </p>

                                <p>
                                    <strong>AI Feedback:</strong>{" "}
                                    {answer.feedback}
                                </p>
                            </article>
                        ))
                    ) : (
                        <p>No answer evaluations are available.</p>
                    )}
                </section>

                <button
                    className="report-button"
                    onClick={() => navigate("/interview-history")}
                >
                    Back to Interview History
                </button>
            </div>
        </main>
    );
}

export default Report;