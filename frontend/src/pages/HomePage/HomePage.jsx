import './HomePage.css';
import { useState } from 'react';
import tornadowranglercover from '../../assets/tornadowranglercover.jpg';

const quizQuestions = [
  {
    question: "How many levels are there on the Enhanced Fujita (EF) Scale?",
    options: ["3", "4", "5", "6"],
    correct: 3, // index of "6"
    explanation: "The Enhanced Fujita Scale has 6 levels (EF0–EF5)."
  },
  {
    question: "Which month typically has the most tornadoes in the US?",
    options: ["January", "May", "August", "December"],
    correct: 1, // "May"
    explanation: "May is typically the most active month for tornadoes in the US."
  },
  {
    question: "What is the safest place to shelter during a tornado?",
    options: [
      "Near windows",
      "In a basement or interior room",
      "In your car",
      "On the top floor"
    ],
    correct: 1,
    explanation: "A basement or interior room on the lowest floor is safest."
  },
  {
    question: "What is the main ingredient needed for tornado formation?",
    options: [
      "Cold, dry air only",
      "Warm, moist air only",
      "Both warm, moist and cold, dry air",
      "Snow"
    ],
    correct: 2,
    explanation: "Tornadoes form when warm, moist air meets cold, dry air."
  }
];

export default function HomePage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState('');
  const [quizResult, setQuizResult] = useState(null);
  const [score, setScore] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  function handleQuizSubmit(e) {
    e.preventDefault();
    const q = quizQuestions[currentQ];
    const selectedIndex = parseInt(selected, 10);
    if (selectedIndex === q.correct) {
      setScore(score + 1);
      setQuizResult(`Correct! ${q.explanation}`);
    } else {
      setQuizResult(`Not quite! ${q.explanation}`);
    }
  }

  function handleNext() {
    setQuizResult(null);
    setSelected('');
    if (currentQ + 1 < quizQuestions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowFinal(true);
    }
  }

  return (
    <div className="home-container">
      <section className="hero">
          <img
           src={tornadowranglercover}
           alt="Tornado Wrangler Cover"
           className="hero-image"
          />
        {/*<h1>Tornado Wrangler</h1> */}
        {/*<p>Your source for real-time tornado alerts and safety information.</p> */}
      </section>
     <section className="about blur-box">
        <h2>About This Application</h2>
        <p>
          Tornado Wrangler helps you stay informed about tornado activity across the United States.
          Get up-to-date alerts, track recent tornadoes, and learn how to stay safe during severe weather.
        </p>
      </section>
      <section className="about blur-box">
        <h2>About Tornadoes</h2>
        <ul>
          <li><strong>What is a tornado?</strong> A tornado is a rapidly rotating column of air that extends from a thunderstorm to the ground.</li>
          <li><strong>How dangerous are tornadoes?</strong> Tornadoes can cause devastating damage, with winds exceeding 200 mph in the most severe cases.</li>
          <li><strong>Did you know?</strong> The United States experiences more tornadoes than any other country, averaging about 1,200 per year.</li>
          <li><strong>Largest tornado outbreak:</strong> The 2011 Super Outbreak produced 360 tornadoes in just three days.</li>
          <li><strong>Longest path:</strong> The Tri-State Tornado of 1925 traveled 219 miles across three states.</li>
          <li><strong>Safety Tip:</strong> Always seek shelter in a basement or interior room on the lowest floor during a tornado warning.</li>
        </ul>
      </section>
    <section className="tornado-quiz blur-box">
        <h2>Test Your Tornado Knowledge!</h2>
        {!showFinal ? (
          <form onSubmit={handleQuizSubmit}>
            <label>
              {quizQuestions[currentQ].question}
              <select
                value={selected}
                onChange={e => setSelected(e.target.value)}
                required
                disabled={quizResult !== null}
              >
                <option value="">Select an answer</option>
                {quizQuestions[currentQ].options.map((opt, idx) => (
                  <option value={idx} key={opt}>{opt}</option>
                ))}
              </select>
            </label>
            {!quizResult && <button type="submit">Submit</button>}
            {quizResult && (
              <>
                <p className="quiz-result">{quizResult}</p>
                <button type="button" onClick={handleNext}>
                  {currentQ + 1 < quizQuestions.length ? "Next Question" : "See Results"}
                </button>
              </>
            )}
          </form>
        ) : (
          <div>
            <p>
              Quiz complete! You scored {score} out of {quizQuestions.length}.
            </p>
            <button type="button" onClick={() => {
              setCurrentQ(0);
              setScore(0);
              setShowFinal(false);
              setQuizResult(null);
              setSelected('');
            }}>
              Try Again
            </button>
          </div>
        )}
      </section>
      <section className="cta">
        <a href="/alerts" className="cta-button">View Current Alerts</a>
      </section>
    </div>
  );
}