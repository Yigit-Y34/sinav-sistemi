document.addEventListener("DOMContentLoaded", () => {
    const loginScreen = document.getElementById("login-screen");
    const examScreen = document.getElementById("exam-screen");
    const resultScreen = document.getElementById("result-screen");

    const startExamButton = document.getElementById("start-exam");
    const nameInput = document.getElementById("name");
    const surnameInput = document.getElementById("surname");
    const userNameDisplay = document.getElementById("user-name");

    const timerDisplay = document.getElementById("time");
    const questionText = document.getElementById("question-text");
    const choicesContainer = document.getElementById("choices-container");

    const prevQuestionButton = document.getElementById("prev-question");
    const nextQuestionButton = document.getElementById("next-question");

    const resultName = document.getElementById("result-name");
    const correctAnswersDisplay = document.getElementById("correct-answers");
    const wrongAnswersDisplay = document.getElementById("wrong-answers");

    // Sınav Soruları
    const questions = [{
            text: "HTML'in açılımı nedir?",
            choices: ["Hyper Text Markup Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language", "Hyperlink Transfer Machine Language"],
            correct: 0
        },
        {
            text: "CSS'in amacı nedir?",
            choices: ["Web sayfasını yapılandırmak", "Web sayfasına stil vermek", "Sunucu ile iletişim kurmak", "Veritabanı yönetimi sağlamak"],
            correct: 1
        },
        {
            text: "JavaScript hangi amaçla kullanılır?",
            choices: ["Sunucu tarafında çalışan diller oluşturmak", "Web sayfasına etkileşim eklemek", "Sadece veri depolamak", "Web sayfasını statik hale getirmek"],
            correct: 1
        },
        {
            text: "Hangi HTML etiketi bir başlık oluşturur?",
            choices: ["<head>", "<title>", "<h1>", "<header>"],
            correct: 2
        },
        {
            text: "CSS'de ID seçici nasıl kullanılır?",
            choices: [".id", "#id", "id", "*id"],
            correct: 1
        }
    ];

    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let timer;

    // Sınavı başlatma
    startExamButton.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const surname = surnameInput.value.trim();

        if (name === "" || surname === "") {
            alert("Lütfen ad ve soyad giriniz!");
            return;
        }

        userNameDisplay.textContent = `${name} ${surname}`;
        resultName.textContent = `${name} ${surname}`;

        loginScreen.classList.add("hidden");
        examScreen.classList.remove("hidden");

        startTimer();
        loadQuestion();
    });

    // Soruları yükleme
    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.text;
        choicesContainer.innerHTML = "";

        currentQuestion.choices.forEach((choice, index) => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.className = "w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-lg hover:bg-gradient-to-l hover:from-green-500 hover:to-blue-600 transition-all";
            button.addEventListener("click", () => handleAnswer(index));
            choicesContainer.appendChild(button);
        });

        prevQuestionButton.disabled = currentQuestionIndex === 0;
        nextQuestionButton.disabled = currentQuestionIndex === questions.length - 1;
    }

    // Cevap kontrolü
    function handleAnswer(selectedIndex) {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedIndex === currentQuestion.correct) {
            correctAnswers++;
        } else {
            wrongAnswers++;
        }

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            endExam();
        }
    }

    // Zamanlayıcı
    function startTimer() {
        let timeLeft = 300; // 5 dakika

        timer = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(timer);
                endExam();
            }
        }, 1000);
    }

    // Sınavı bitirme
    function endExam() {
        clearInterval(timer);

        examScreen.classList.add("hidden");
        resultScreen.classList.remove("hidden");

        correctAnswersDisplay.textContent = correctAnswers;
        wrongAnswersDisplay.textContent = wrongAnswers;
    }

    // Önceki ve sonraki sorular
    prevQuestionButton.addEventListener("click", () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    });

    nextQuestionButton.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        }
    });
});