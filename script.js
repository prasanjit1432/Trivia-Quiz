    // Array of quiz questions
    const quizQuestions = [
        {
            question: 'What is the capital of France?',
            answers: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
            correct: 2
        },
        {
            question: 'Which planet is known as the Red Planet?',
            answers: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
            correct: 1
        },
        {
            question: 'What is the smallest prime number?',
            answers: ['0', '1', '2', '3'],
            correct: 2
        }
        // Add more questions as needed
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    // Function to load a question
    function loadQuestion() {
        if (currentQuestionIndex < quizQuestions.length) {
            const question = quizQuestions[currentQuestionIndex];
            const quizContainer = document.getElementById('quiz-container');
            quizContainer.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${question.question}</h5>
                        <div id="answers-container">
                            ${question.answers.map((answer, index) => `
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="answer" id="answer${index}" value="${index}">
                                    <label class="form-check-label" for="answer${index}">
                                        ${answer}
                                    </label>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            // Show/hide the buttons
            document.getElementById('next-button').classList.remove('d-none');
            document.getElementById('submit-button').classList.add('d-none');
            if (currentQuestionIndex === quizQuestions.length - 1) {
                document.getElementById('next-button').classList.add('d-none');
                document.getElementById('submit-button').classList.remove('d-none');
            }
        } else {
            showResultModal();
        }
    }

    // Function to handle the "Next" button click
    function handleNextButton() {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer) {
            const answerIndex = parseInt(selectedAnswer.value);
            if (answerIndex === quizQuestions[currentQuestionIndex].correct) {
                score++;
            }
            currentQuestionIndex++;
            loadQuestion();
        } else {
            alert('Please select an answer.');
        }
    }

    // Function to handle the "Submit" button click
    function handleSubmitButton() {
        showResultModal();
    }

    // Function to display the result in the modal
    function showResultModal() {
        let resultMessage;

        if (score === quizQuestions.length) {
            resultMessage = 'Excellent job! You got all the answers right!';
        } else if (score >= quizQuestions.length / 2) {
            resultMessage = 'Good job! You got more than half of the answers right!';
        } else {
            resultMessage = 'Keep trying! You can do better!';
        }

        document.getElementById('resultMessage').innerText = resultMessage;
        document.getElementById('resultScore').innerText = `Your score: ${score} out of ${quizQuestions.length}`;

        // Show the result modal
        const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
        resultModal.show();
    }

    // Initialize the quiz
    function initializeQuiz() {
        loadQuestion();
        document.getElementById('next-button').addEventListener('click', handleNextButton);
        document.getElementById('submit-button').addEventListener('click', handleSubmitButton);
    }

    // Call the initializeQuiz function to start the quiz
    initializeQuiz();

    document.addEventListener('DOMContentLoaded', () => {
        const feedbackForm = document.getElementById('feedbackForm');

        feedbackForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (feedbackForm.checkValidity()) {
                // Show the toast message
                const feedbackToast = new bootstrap.Toast(document.getElementById('feedbackToast'));
                feedbackToast.show();

                // Clear the form fields
                feedbackForm.reset();
            } else {
                // If form is invalid, show validation feedback
                feedbackForm.classList.add('was-validated');
            }
        });

        // Real-time validation feedback
        feedbackForm.addEventListener('input', () => {
            if (feedbackForm.checkValidity()) {
                feedbackForm.classList.remove('was-validated');
            }
        });
    });