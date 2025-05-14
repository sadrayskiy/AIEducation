// interactive.js - For interactive elements like quizzes, simulations, etc.

document.addEventListener("DOMContentLoaded", function() {
    console.log("Interactive elements script loaded.");

    // --- localStorage Manager (Basic) ---
    const APP_PREFIX = "aiEduSite_";

    function saveData(key, data) {
        try {
            localStorage.setItem(APP_PREFIX + key, JSON.stringify(data));
        } catch (e) {
            console.error("Error saving to localStorage", e);
        }
    }

    function loadData(key) {
        try {
            const data = localStorage.getItem(APP_PREFIX + key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("Error loading from localStorage", e);
            return null;
        }
    }

    // --- User Progress Tracking (Basic Example) ---
    let userProgress = loadData("userProgress") || {
        completedQuizzes: [],
        quizScores: {}
    };

    function updateUserQuizProgress(quizId, score, totalQuestions) {
        if (!userProgress.completedQuizzes.includes(quizId)) {
            userProgress.completedQuizzes.push(quizId);
        }
        userProgress.quizScores[quizId] = { score, totalQuestions, timestamp: new Date().toISOString() };
        saveData("userProgress", userProgress);
        displayUserProgress(); // Update UI if progress display exists
    }

    function displayUserProgress() {
        const progressDisplay = document.getElementById("user-progress-summary");
        if (progressDisplay) {
            let html = "<h4>Ваш прогресс:</h4>";
            if (userProgress.completedQuizzes.length === 0) {
                html += "<p>Вы еще не проходили викторины.</p>";
            } else {
                html += "<ul>";
                userProgress.completedQuizzes.forEach(quizId => {
                    const quizData = userProgress.quizScores[quizId];
                    if (quizData) {
                        html += `<li>Викторина '${quizId}': ${quizData.score}/${quizData.totalQuestions} правильных ответов.</li>`;
                    }
                });
                html += "</ul>";
            }
            progressDisplay.innerHTML = html;
        }
    }

    // --- Example: Basic Quiz Functionality ---
    const quizContainer = document.getElementById("quiz-container");

    if (quizContainer) {
        const quizId = quizContainer.dataset.quizId || "generalQuiz1"; // Unique ID for this quiz
        const questions = [
            {
                question: "Что из перечисленного НЕ является типом машинного обучения?",
                answers: {
                    a: "Обучение с учителем",
                    b: "Обучение без учителя",
                    c: "Обучение с подкреплением",
                    d: "Обучение с замедлением"
                },
                correctAnswer: "d"
            },
            {
                question: "Какой язык программирования наиболее популярен для ИИ и машинного обучения?",
                answers: {
                    a: "JavaScript",
                    b: "Python",
                    c: "Java",
                    d: "C++"
                },
                correctAnswer: "b"
            },
            {
                question: "Что означает NLP в контексте ИИ?",
                answers: {
                    a: "Network Layer Protocol",
                    b: "Natural Language Processing",
                    c: "Non-Linear Programming",
                    d: "Neural Learning Platform"
                },
                correctAnswer: "b"
            }
        ];

        function buildQuiz() {
            const output = [];
            questions.forEach((currentQuestion, questionNumber) => {
                const answers = [];
                for (let letter in currentQuestion.answers) {
                    answers.push(
                        `<label class="quiz-answer-label">
                            <input type="radio" name="question${questionNumber}" value="${letter}">
                            <span class="quiz-answer-option">${letter.toUpperCase()}</span> ${currentQuestion.answers[letter]}
                        </label>`
                    );
                }
                output.push(
                    `<div class="quiz-question" id="q${questionNumber}">
                        <p class="quiz-question-text"><strong>Вопрос ${questionNumber + 1}:</strong> ${currentQuestion.question}</p>
                        <div class="quiz-answers">${answers.join("")}</div>
                    </div>`
                );
            });
            quizContainer.innerHTML = output.join("") +
                `<button id="submit-quiz" class="btn btn-secondary">Показать результаты</button>
                 <div id="quiz-results" class="quiz-results-container"></div>
                 <div id="user-progress-summary" class="user-progress-display"></div>`; // Added progress display area
        }

        function showResults() {
            const answerContainers = quizContainer.querySelectorAll(".quiz-answers");
            let numCorrect = 0;
            questions.forEach((currentQuestion, questionNumber) => {
                const answerContainer = answerContainers[questionNumber];
                const selector = `input[name=question${questionNumber}]:checked`;
                const userAnswer = (answerContainer.querySelector(selector) || {}).value;
                const questionElement = document.getElementById(`q${questionNumber}`);

                // Reset previous feedback
                questionElement.classList.remove("correct", "incorrect");
                const feedbackElement = questionElement.querySelector(".answer-feedback");
                if (feedbackElement) feedbackElement.remove();

                let feedbackHTML = "";
                if (userAnswer === currentQuestion.correctAnswer) {
                    numCorrect++;
                    questionElement.classList.add("correct");
                    feedbackHTML = `<span class="answer-feedback correct-feedback">Верно!</span>`;
                } else {
                    questionElement.classList.add("incorrect");
                    feedbackHTML = `<span class="answer-feedback incorrect-feedback">Неверно. Правильный ответ: ${currentQuestion.correctAnswer.toUpperCase()}</span>`;
                }
                answerContainer.insertAdjacentHTML("afterend", feedbackHTML);
            });
            const resultsContainer = document.getElementById("quiz-results");
            resultsContainer.innerHTML = `<h3>Результаты викторины:</h3><p>Вы ответили правильно на ${numCorrect} из ${questions.length} вопросов.</p>`;
            updateUserQuizProgress(quizId, numCorrect, questions.length);
        }

        buildQuiz();
        displayUserProgress(); // Display initial progress on load

        const submitButton = document.getElementById("submit-quiz");
        if (submitButton) {
            submitButton.addEventListener("click", showResults);
        }
    }

    // Placeholder for other interactive elements
    // e.g., simple simulations, coding challenges (client-side validation)

});

