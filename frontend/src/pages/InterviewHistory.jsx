
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function InterviewHistory() {
    const navigate = useNavigate();

    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Start the page from the top whenever it opens.
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });

        const fetchHistory = async () => {
            try {
                const token =
                    localStorage.getItem("token") ||
                    localStorage.getItem("access_token");

                if (!token) {
                    setError("Please log in to view your interview history.");
                    return;
                }

                const response = await fetch(
                    "http://127.0.0.1:8000/api/interview/history",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.detail || "Unable to load interview history."
                    );
                }

                setInterviews(
                    Array.isArray(data)
                        ? data
                        : data.interviews || data.history || []
                );
            } catch (err) {
                setError(err.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const copyInterviewId = async (id) => {
        try {
            await navigator.clipboard.writeText(id);
            alert("Interview ID copied!");
        } catch {
            alert("Unable to copy the ID. Please copy it manually.");
        }
    };

    const openPractice = (interview) => {
        navigate("/concept-transfer", {
            state: { interviewId: interview.interview_id },
        });
    };

    const openReport = (interview) => {
        navigate(`/report/${interview.interview_id}`);
    };

    const getDate = (interview) => {
        const value =
            interview.created_at ||
            interview.date ||
            interview.createdAt;

        if (!value) return "Date unavailable";

        const date = new Date(value);

        return Number.isNaN(date.getTime())
            ? "Date unavailable"
            : date.toLocaleString();
    };

    const pageStyles = `
        .history-page {
            min-height: 100vh;
            box-sizing: border-box;
            padding: 28px 4% 40px;
            background: #080f1e;
            color: #f8fafc;
            position: relative;
            top: 0;
            transform: none;
        }

        .history-heading {
            margin: 0 0 10px;
            color: #60a5fa;
            text-align: center;
            font-size: 34px;
        }

        .history-subtitle {
            margin: 0 0 35px;
            color: #a8b6cc;
            text-align: center;
            font-size: 16px;
        }

        .history-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 25px;
            max-width: 1600px;
            margin: 0 auto;
        }

        .history-card {
            min-width: 0;
            padding: 25px;
            background: #111f31;
            border: 1px solid #263b54;
            border-radius: 20px;
            box-sizing: border-box;
        }

        .history-role-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 24px;
        }

        .history-role {
            margin: 0;
            color: #60a5fa;
            font-size: 25px;
            overflow-wrap: anywhere;
        }

        .history-badge {
            padding: 8px 13px;
            color: #c4b5fd;
            background: #292452;
            border-radius: 30px;
        }

        .history-info-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            margin-bottom: 20px;
        }

        .history-info {
            min-width: 0;
            padding: 14px;
            background: #091525;
            border-radius: 12px;
            box-sizing: border-box;
        }

        .history-info-label {
            display: block;
            margin-bottom: 10px;
            color: #8abaff;
            font-size: 14px;
        }

        .history-info-value {
            color: #ffffff;
            font-size: 16px;
            overflow-wrap: anywhere;
        }

        .history-interview-id {
            margin: 18px 0;
            color: #8abaff;
            line-height: 1.7;
        }

        .history-interview-id-label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }

        .history-interview-id-value {
            display: block;
            color: #dbeafe;
            font-size: 13px;
            overflow-wrap: anywhere;
            word-break: break-word;
        }

        .history-action {
            display: block;
            width: 100%;
            box-sizing: border-box;
            margin-top: 12px;
            padding: 14px 16px;
            background: linear-gradient(110deg, #315efb, #8038ec);
            color: #ffffff;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-family: inherit;
            font-weight: 700;
            cursor: pointer;
        }

        .history-action:hover {
            opacity: 0.9;
        }

        .history-message {
            max-width: 700px;
            margin: 30px auto;
            padding: 24px;
            color: #cbd5e1;
            background: #111f31;
            border: 1px solid #263b54;
            border-radius: 16px;
            text-align: center;
        }

        .history-back-button {
            display: block;
            width: min(100%, 700px);
            margin: 40px auto 10px;
            padding: 17px 22px;
            background: #dc2626;
            color: #ffffff;
            border: 2px solid #ef4444;
            border-radius: 12px;
            font-family: inherit;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            box-sizing: border-box;
        }

        .history-back-button:hover {
            background: #b91c1c;
        }

        @media (max-width: 1100px) {
            .history-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (max-width: 650px) {
            .history-page {
                padding: 24px 16px 32px;
            }

            .history-grid {
                grid-template-columns: minmax(0, 1fr);
            }

            .history-heading {
                font-size: 28px;
            }

            .history-card {
                padding: 20px;
            }
        }
    `;

    return (
        <div className="history-page">
            <style>{pageStyles}</style>

            <h1 className="history-heading">Interview History</h1>

            <p className="history-subtitle">
                Review your previous interviews and practise your weak concepts.
            </p>

            {loading ? (
                <div className="history-message">
                    Loading interview history...
                </div>
            ) : (
                <>
                    {error && (
                        <div className="history-message" role="alert">
                            {error}
                        </div>
                    )}

                    {!error && interviews.length === 0 && (
                        <div className="history-message">
                            No interview history found. Complete an interview
                            to see it here.
                        </div>
                    )}

                    <div className="history-grid">
                        {interviews.map((interview, index) => {
                            const id = interview.interview_id;

                            return (
                                <div
                                    className="history-card"
                                    key={id || index}
                                >
                                    <div className="history-role-row">
                                        <h2 className="history-role">
                                            {interview.job_role ||
                                                interview.role ||
                                                interview.technology ||
                                                "Interview"}
                                        </h2>

                                        <span className="history-badge">
                                            {interview.difficulty || "Standard"}
                                        </span>
                                    </div>

                                    <div className="history-info-grid">
                                        <div className="history-info">
                                            <span className="history-info-label">
                                                Grade
                                            </span>
                                            <span className="history-info-value">
                                                {interview.grade ||
                                                    interview.report?.grade ||
                                                    "—"}
                                            </span>
                                        </div>

                                        <div className="history-info">
                                            <span className="history-info-label">
                                                Date
                                            </span>
                                            <span className="history-info-value">
                                                {getDate(interview)}
                                            </span>
                                        </div>

                                        <div className="history-info">
                                            <span className="history-info-label">
                                                Technology
                                            </span>
                                            <span className="history-info-value">
                                                {Array.isArray(interview.technology)
                                                    ? interview.technology.join(", ")
                                                    : interview.technology ||
                                                      interview.job_role ||
                                                      interview.role ||
                                                      "—"}
                                            </span>
                                        </div>

                                        <div className="history-info">
                                            <span className="history-info-label">
                                                Experience
                                            </span>
                                            <span className="history-info-value">
                                                {interview.experience_level ||
                                                    interview.experience ||
                                                    "—"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="history-interview-id">
                                        <span className="history-interview-id-label">
                                            Interview ID
                                        </span>
                                        <span className="history-interview-id-value">
                                            {id || "ID unavailable"}
                                        </span>
                                    </div>

                                    {id && (
                                        <>
                                            <button
                                                type="button"
                                                className="history-action"
                                                onClick={() =>
                                                    copyInterviewId(id)
                                                }
                                            >
                                                Copy ID
                                            </button>

                                            <button
                                                type="button"
                                                className="history-action"
                                                onClick={() =>
                                                    openReport(interview)
                                                }
                                            >
                                                View Report
                                            </button>

                                            <button
                                                type="button"
                                                className="history-action"
                                                onClick={() =>
                                                    openPractice(interview)
                                                }
                                            >
                                                Practice This Interview
                                            </button>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            <button
                type="button"
                className="history-back-button"
                onClick={() => navigate("/dashboard")}
            >
                Back to Dashboard
            </button>
        </div>
    );
}

export default InterviewHistory;
