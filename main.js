const quiz = document.querySelector('.quiz');
const warning = document.querySelector('.warning');
const btnNext = document.querySelector('.quiz-btn-next');
let count = 0;
let userScore = 0;

// checking for questions in questions.js
if (typeof questions !== 'undefined' && questions.length > 0) {
    quiz.classList.remove('hidden');
    showQuestions(count);
} else {
    warning.classList.remove('hidden');
}

// addEventListener for btnNext
btnNext.addEventListener('click', nextQuestion);

// render question in question.js
function showQuestions(index) {
    const title = document.querySelector('.quiz-title');
    const list = document.querySelector('.quiz-list');
    const quizScore = document.querySelector('.quiz-score');
    const progress = document.querySelector('.quiz-progress-inner');

    title.innerHTML = `${questions[index].question}`;
    list.innerHTML = '';
    questions[index].options.forEach(element => {
        const text = `<li class="quiz-list-item">${element}</li>`;
        list.insertAdjacentHTML("beforeend", text)

        const options = list.querySelectorAll(".quiz-list-item");
        options.forEach(element => element.setAttribute("onclick", "clickSelected(this)"));

        quizScore.innerHTML = `${index + 1} / ${questions.length}`;
        progress.style.width = `${Math.round(((index + 1) / questions.length) * 100)}%`;
    });
}

// click on answer
function clickSelected(answer) {
    const userAnswer = answer.textContent;
    const correctAnswer = questions[count].answer;
    const options = document.querySelectorAll('.quiz-list-item');
    const iconCorrect = "<span'>&#10004;</span>";
    const iconIncorrect = "<span'>&#10006;</span>";

    if (userAnswer == correctAnswer) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", iconCorrect);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", iconIncorrect);

        options.forEach(element => {
            if (element.textContent == correctAnswer) {
                setTimeout(() => {
                    element.classList.add("correct");
                    element.insertAdjacentHTML("beforeend", iconCorrect);
                }, 100);
            }
        })
    }
    options.forEach(element => element.classList.add("disabled"));
}

// next step function
function nextQuestion() {
    const option = document.querySelector(".quiz-list-item");
    const result = document.querySelector(".finish");
    const resultText = document.querySelector(".finish-text");

    if ((count + 1) == questions.length && option.classList.contains('disabled')) {
        result.classList.remove('hidden');
        quiz.classList.add('hidden');
        resultText.innerHTML = `Правильних відповідей: ${userScore} із ${questions.length}`;
        return;
    }

    if (option.classList.contains('disabled')) {
        count++;
        showQuestions(count);
    } else {
        alert('Виберіть один з варіантів!');
    }
}
