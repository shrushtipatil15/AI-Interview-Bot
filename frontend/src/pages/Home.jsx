import Navbar from "../components/Navbar";

import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {

    const navigate = useNavigate();

 
    const features = [
        {
            icon: "🤖",
            title: "AI Mock Interviews",
            desc: "Practice unlimited AI-generated interviews tailored to your role."
        },
        {
            icon: "📄",
            title: "Resume Analyzer",
            desc: "Analyze your resume with ATS scoring and AI recommendations."
        },
        {
            icon: "📊",
            title: "Performance Dashboard",
            desc: "Track interview scores, progress and improvements."
        },
        {
            icon: "🎤",
            title: "Interview Categories",
            desc: "Answer interview questions based on various categories."
        },
        {
            icon: "🧠",
            title: "AI Feedback",
            desc: "Receive detailed technical and communication feedback."
        },
        {
            icon: "📈",
            title: "Progress Tracking",
            desc: "Monitor your learning journey with analytics."
        }
    ];

    return (

        <>

            <Navbar />

            {/* HERO */}

            <section className="hero">

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

            
       
            {/* FEATURES */}

            <section className="features">

                <h2>Why Choose AI Interview Bot?</h2>

                <div className="feature-grid">

                    {
                        features.map((feature, index) => (

                            <div
                                key={index}
                                className="feature-card"
                            >

                                <div className="feature-icon">

                                    {feature.icon}

                                </div>

                                <h3>

                                    {feature.title}

                                </h3>

                                <p>

                                    {feature.desc}

                                </p>

                            </div>

                        ))
                    }

                </div>

            </section>
{/* RESUME ANALYZER */}

<section className="resume-section">

    <div className="resume-left">

        <h2>AI Resume Analyzer</h2>

        <p>
            Upload your resume and receive an ATS score with
            intelligent suggestions to improve your chances of
            getting shortlisted.
        </p>

        <ul>

            <li>✔ ATS Resume Score</li>

            <li>✔ Missing Skills Detection</li>

            <li>✔ Grammar & Formatting Check</li>

            <li>✔ Keyword Optimization</li>

            <li>✔ Resume Summary</li>

        </ul>

        <button className="upload-btn">

            Upload Resume

        </button>

    </div>

    <div className="resume-right">

        <div className="resume-card">

            <h3>ATS Resume Score</h3>

            <div className="score-circle">

                84%

            </div>

            <p>

                Excellent Resume

            </p>

        </div>

    </div>

</section>

{/* HOW IT WORKS */}

<section className="how-it-works">

    <h2>How It Works</h2>

    <div className="steps">

        <div className="step">

            <div className="step-number">1</div>

            <h3>Create Account</h3>

            <p>
                Register and create your AI Interview Bot account.
            </p>

        </div>

        

        <div className="step">

            <div className="step-number">2</div>

            <h3>Generate Questions</h3>

            <p>
                AI generates interview questions based on your role.
            </p>

        </div>

        <div className="step">

            <div className="step-number">3</div>

            <h3>Answer Questions</h3>

            <p>
                Practice answering technical and HR questions.
            </p>

        </div>

        <div className="step">

            <div className="step-number">4</div>

            <h3>Receive Feedback</h3>

            <p>
                AI evaluates every answer instantly.
            </p>

        </div>

        <div className="step">

            <div className="step-number">5</div>

            <h3>Track Progress</h3>

            <p>
                View reports and improve continuously.
            </p>

        </div>

    </div>

</section>
          {/* INTERVIEW CATEGORIES */}

<section className="categories">

    <h2>Interview Categories</h2>

    <div className="category-grid">

        {[
            "Frontend",
            "Backend",
            "Full Stack",
            "Java",
            "Python",
            "C++",
            "React",
            "Node.js",
            "MongoDB",
            "SQL",
            "HR",
            "Behavioral",
            "DevOps",
            "Cloud",
            "Machine Learning",
            "Data Science",
            "Cyber Security",
            "UI/UX"
        ].map((item,index)=>(

            <div
                className="category-card"
                key={index}
            >

                {item}

            </div>

        ))}

    </div>

</section>
{/* DASHBOARD */}

<section className="dashboard-preview">

    <h2>Progress Dashboard Preview</h2>

    <div className="dashboard-grid">

        <div className="dashboard-card">

            <h3>15</h3>

            <p>Interviews Completed</p>

        </div>

        <div className="dashboard-card">

            <h3>89%</h3>

            <p>Average Score</p>

        </div>

        <div className="dashboard-card">

            <h3>12</h3>

            <p>Current Streak</p>

        </div>

        <div className="dashboard-card">

            <h3>84%</h3>

            <p>Resume Score</p>

        </div>

        <div className="dashboard-card">

            <h3>React</h3>

            <p>Best Skill</p>

        </div>

        <div className="dashboard-card">

            <h3>SQL</h3>

            <p>Needs Improvement</p>

        </div>

    </div>

</section>
{/* AI FEEDBACK */}

<section className="feedback-preview">

    <h2>AI Feedback Preview</h2>

    <div className="feedback-container">

        <div className="question-box">

            <h3>Interview Question</h3>

            <p>

                Explain the Virtual DOM in React.

            </p>

        </div>

        <div className="answer-box">

            <h3>Your Answer</h3>

            <p>

                Virtual DOM is a lightweight copy of the
                real DOM that React uses to efficiently
                update only changed elements.

            </p>

        </div>

        <div className="feedback-box">

            <h3>AI Feedback</h3>

            <p>

                Excellent explanation.
                Try adding examples for better clarity.

            </p>

            <div className="score-list">

                <div>

                    Technical

                    <span>92%</span>

                </div>

                <div>

                    Communication

                    <span>88%</span>

                </div>

                <div>

                    Confidence

                    <span>90%</span>

                </div>

                <div>

                    Overall

                    <span>90%</span>

                </div>

            </div>

        </div>

    </div>

</section>  
        </>

    );

}

export default Home;