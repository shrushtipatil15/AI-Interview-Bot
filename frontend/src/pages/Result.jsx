import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import "../styles/Result.css";

function Result() {

    const { id } = useParams();

    const [result, setResult] = useState(null);

    useEffect(() => {

        const fetchResult = async () => {

            if (!id) {
                console.error("Interview ID is missing.");
                alert("Interview ID is missing.");
                return;
            }

            try {

                console.log("Fetching result for interview:", id);

                const res = await API.get(
                    `/interview/result/${id}`
                );

                console.log("Result received:", res.data);

                setResult(res.data);

            } catch (error) {

                console.error(
                    "Failed to load result:",
                    error.response?.data || error
                );

                alert("Failed to load result");

            }

        };

        fetchResult();

    }, [id]);


    if (!result) {

        return (
            <h2 className="loading">
                Generating AI Report...
            </h2>
        );

    }


    return (

        <div className="page-container">

            <div className="result-container">

                <h1>
                    Interview Performance Report
                </h1>


                {/* Score Card */}

                <div className="score-card">

                    <h2>
                        Grade : {result.grade}
                    </h2>

                    <p>
                        Average Score : {result.average_score}/10
                    </p>

                    <p>
                        Total Score : {result.total_score}
                    </p>

                </div>


                {/* Strengths and Areas to Improve */}

                <div className="feedback-grid">


                    {/* Strengths */}

                    <div className="feedback-card">

                        <h3>
                            💪 Strengths
                        </h3>

                        {result.strengths &&
                        result.strengths.length > 0 ? (

                            result.strengths.map(
                                (item, index) => (

                                    <p key={index}>
                                        {item}
                                    </p>

                                )
                            )

                        ) : (

                            <p className="no-feedback">
                                No specific strengths were identified.
                            </p>

                        )}

                    </div>


                    {/* Areas to Improve */}

                    <div className="feedback-card">

                        <h3>
                            📈 Areas to Improve
                        </h3>

                        {result.weaknesses &&
                        result.weaknesses.length > 0 ? (

                            result.weaknesses.map(
                                (item, index) => (

                                    <p key={index}>
                                        {item}
                                    </p>

                                )
                            )

                        ) : (

                            <p className="no-improvements">
                                🎉 Excellent performance! No significant
                                areas for improvement were identified.
                                Keep up the great work!
                            </p>

                        )}

                    </div>

                </div>


                {/* Question Review */}

                <h2 className="review-title">
                    Question Review
                </h2>


                {result.answers?.map(
                    (item, index) => (

                        <div
                            className="answer-card"
                            key={index}
                        >

                            <h3>
                                Question {item.question_number}
                            </h3>


                            <p>
                                <b>
                                    Question:
                                </b>{" "}
                                {item.question}
                            </p>


                            <p>
                                <b>
                                    Your Answer:
                                </b>{" "}
                                {item.answer}
                            </p>


                            <p>
                                <b>
                                    Score:
                                </b>{" "}
                                {item.score}/10
                            </p>


                            <p>
                                <b>
                                    AI Feedback:
                                </b>{" "}
                                {item.feedback}
                            </p>

                        </div>

                    )
                )}

            </div>

        </div>

    );

}

export default Result;
