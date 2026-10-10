
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
    const navigate = useNavigate();
    const resumeInputRef = useRef(null);

    const [jobRole, setJobRole] = useState("");
    const [loadingResume, setLoadingResume] = useState(false);
    const [resumeAnalysis, setResumeAnalysis] = useState(null);
    const [resumeError, setResumeError] = useState("");

    const features = [
        {
            icon: "🤖",
            title: "AI Mock Interviews",
            desc: "Practice AI-generated interviews tailored to your role.",
            action: () => navigate("/create-interview"),
        },
        {
            icon: "📄",
            title: "Resume Analyzer",
            desc: "Analyze your resume with ATS scoring and recommendations.",
            action: () =>
                document.getElementById("resume-analyzer")?.scrollIntoView({
                    behavior: "smooth",
                }),
        },
        {
            icon: "📊",
            title: "Performance Dashboard",
            desc: "Track your interview scores and improvements.",
            action: () => navigate("/dashboard"),
        },
        {
            icon: "🎤",
            title: "Interview Categories",
            desc: "Explore interview topics and categories.",
            action: () =>
                document.getElementById("categories")?.scrollIntoView({
                    behavior: "smooth",
                }),
        },
        {
            icon: "🧠",
            title: "AI Feedback",
            desc: "Receive technical and communication feedback.",
            action: () =>
                document.getElementById("feedback")?.scrollIntoView({
                    behavior: "smooth",
                }),
        },
        {
            icon: "📈",
            title: "Progress Tracking",
            desc: "Monitor your progress and interview history.",
            action: () => navigate("/interview-history"),
        },
    ];

    const categories = [
        "Frontend", "Backend", "Full Stack", "Java", "Python", "C++",
        "React", "Node.js", "MongoDB", "SQL", "HR", "Behavioral",
        "DevOps", "Cloud", "Machine Learning", "Data Science",
        "Cyber Security", "UI/UX",
    ];

    const handleResumeSelection = async (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setResumeError("");
        setResumeAnalysis(null);

        const allowedExtensions = /\.(pdf|docx)$/i;

        if (!allowedExtensions.test(file.name)) {
            setResumeError("Please select a PDF or DOCX resume.");
            event.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setResumeError("Your resume must be 5 MB or smaller.");
            event.target.value = "";
            return;
        }

        setLoadingResume(true);

        try {
            const formData = new FormData();

            formData.append("file", file);
            formData.append("job_role", jobRole);

            const response = await fetch(
                "http://127.0.0.1:8000/api/resume/analyze",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || "Resume analysis failed. Please try again."
                );
            }

            if (!data.analysis) {
                throw new Error("The server returned no analysis results.");
            }

            setResumeAnalysis(data.analysis);
        } catch (error) {
            console.error("Resume analysis error:", error);

            setResumeError(
                error.message ||
                "Unable to connect to the backend. Check that FastAPI is running."
            );
        } finally {
            setLoadingResume(false);
            event.target.value = "";
        }
    };

    return (
        <>
            <section className="hero" id="home">
                <div className="hero-left">
                    <h1>
                        Ace Your <span>AI Interview</span>
                    </h1>

                    <p>
                        Practice AI-powered interviews, analyze your resume,
                        improve communication skills and get instant feedback
                        to crack your dream job.
                    </p>

                    <div className="hero-buttons">
                        <button
                            className="start-btn"
                            onClick={() => navigate("/register")}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </section>

            <section className="features" id="features">
                <h2>Why Choose AI Interview Bot?</h2>

                <div className="feature-grid">
                    {features.map((feature) => (
                        <button
                            type="button"
                            key={feature.title}
                            className="feature-card"
                            onClick={feature.action}
                            aria-label={`Open ${feature.title}`}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </button>
                    ))}
                </div>
            </section>

            <section className="resume-section" id="resume-analyzer">
                <div className="resume-left">
                    <h2>AI Resume Analyzer</h2>

                    <p>
                        Upload your resume and receive an AI-generated
                        ATS-style score with intelligent suggestions to
                        improve your chances of getting shortlisted.
                    </p>

                    <ul>
                        <li>✔ ATS-style Resume Score</li>
                        <li>✔ Potential Missing Skills</li>
                        <li>✔ Formatting Feedback</li>
                        <li>✔ Keyword Matching</li>
                        <li>✔ Resume Summary</li>
                    </ul>

                    <label htmlFor="resume-job-role">
                        Target Job Role (optional)
                    </label>

                    <input
                        id="resume-job-role"
                        type="text"
                        value={jobRole}
                        onChange={(event) => setJobRole(event.target.value)}
                        placeholder="e.g. React Developer"
                        className="resume-role-input"
                    />

                    <input
                        ref={resumeInputRef}
                        type="file"
                        accept=".pdf,.docx"
                        onChange={handleResumeSelection}
                        hidden
                    />

                    <button
                        type="button"
                        className="upload-btn"
                        disabled={loadingResume}
                        onClick={() => resumeInputRef.current?.click()}
                    >
                        {loadingResume
                            ? "Analyzing Resume..."
                            : "Upload Resume"}
                    </button>

                    {loadingResume && (
                        <p role="status">
                            Uploading your resume and getting AI feedback.
                            Please wait...
                        </p>
                    )}

                    {resumeError && (
                        <p
                            role="alert"
                            style={{
                                color: "#ff6b6b",
                                overflowWrap: "anywhere",
                            }}
                        >
                            {resumeError}
                        </p>
                    )}
                </div>

                <div className="resume-right">
                    <div className="resume-card">
                        <h3>ATS Resume Score</h3>

                        <div className="score-circle">
                            {resumeAnalysis
                                ? `${resumeAnalysis.ats_score}%`
                                : "--"}
                        </div>

                        <p>
                            {resumeAnalysis
                                ? "AI-generated ATS-style estimate"
                                : "Upload your resume to see your score"}
                        </p>

                        {resumeAnalysis && (
                            <div className="resume-results">
                                <h3>Resume Summary</h3>
                                <p>{resumeAnalysis.resume_summary}</p>

                                <h3>Strengths</h3>
                                <ul>
                                    {resumeAnalysis.strengths.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>

                                <h3>Potential Skill Gaps</h3>
                                <ul>
                                    {resumeAnalysis.missing_skills.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>

                                <h3>Suggested Improvements</h3>
                                <ul>
                                    {resumeAnalysis.improvements.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>

                                <h3>Matched Keywords</h3>
                                <ul>
                                    {resumeAnalysis.keyword_match.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>

                                <h3>Formatting Feedback</h3>
                                <p>{resumeAnalysis.formatting_feedback}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="how-it-works" id="how-it-works">
                <h2>How It Works</h2>

                <div className="steps">
                    {[
                        ["Create Account", "Register and create your account."],
                        ["Generate Questions", "Generate questions based on your role."],
                        ["Answer Questions", "Practice technical and HR questions."],
                        ["Receive Feedback", "Get feedback on your answers."],
                        ["Track Progress", "View reports and improve continuously."],
                    ].map(([title, desc], index) => (
                        <div className="step" key={title}>
                            <div className="step-number">{index + 1}</div>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="categories" id="categories">
                <h2>Interview Categories</h2>

                <div className="category-grid">
                    {categories.map((item) => (
                        <button
                            type="button"
                            className="category-card"
                            key={item}
                            onClick={() =>
                                navigate("/create-interview", {
                                    state: { category: item },
                                })
                            }
                            title={`Practice ${item} interview questions`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </section>

            <section className="dashboard-preview" id="dashboard-preview">
                <h2>Progress Dashboard Preview</h2>

                <div className="dashboard-grid">
                    {[
                        ["15", "Interviews Completed"],
                        ["89%", "Average Score"],
                        ["12", "Current Streak"],
                        ["Sample", "Resume Score"],
                        ["React", "Best Skill"],
                        ["SQL", "Needs Improvement"],
                    ].map(([value, label]) => (
                        <button
                            type="button"
                            className="dashboard-card"
                            key={label}
                            onClick={() => navigate("/dashboard")}
                        >
                            <h3>{value}</h3>
                            <p>{label}</p>
                        </button>
                    ))}
                </div>
            </section>

            <section className="feedback-preview" id="feedback">
                <h2>AI Feedback Preview</h2>

                <div className="feedback-container">
                    <div className="question-box">
                        <h3>Interview Question</h3>
                        <p>Explain the Virtual DOM in React.</p>
                    </div>

                    <div className="answer-box">
                        <h3>Your Answer</h3>
                        <p>
                            Virtual DOM is a lightweight copy of the real DOM
                            that React uses to efficiently update changed elements.
                        </p>
                    </div>

                    <div className="feedback-box">
                        <h3>Sample AI Feedback</h3>
                        <p>
                            Excellent explanation. Try adding examples for
                            better clarity.
                        </p>

                        <div className="score-list">
                            <div>Technical <span>92%</span></div>
                            <div>Communication <span>88%</span></div>
                            <div>Confidence <span>90%</span></div>
                            <div>Overall <span>90%</span></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
