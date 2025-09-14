document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choiceList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDispaly = document.getElementById("score");

  const questions = [
    {
      question:
        "Which principle of OOP allows for the same function to be used in different ways?",
      choices: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
      answer: "Polymorphism",
      marks: 1,
    },
    {
      question: "What does OOP stand for?",
      choices: [
        "Object-Oriented Programming",
        "Objective Operation Procedure",
        "Oriented Object Programming",
        "Operational Object Programming",
      ],
      answer: "Object-Oriented Programming",
      marks: 1,
    },
    {
      question: "Which of the following is NOT a basic concept of OOP?",
      choices: ["Classes", "Objects", "Functions", "Inheritance"],
      answer: "Functions",
      marks: 1,
    },
    {
      question: "OOP aims to make software development more:",
      choices: ["Error-prone", "Flexible", "Complicated", "Sequential"],
      answer: "Flexible",
      marks: 1,
    },
    {
      question:
        "Which concept of OOP encapsulates the properties (data) and behaviors (methods) of a real-world object into a single entity?",
      choices: ["Polymorphism", "Encapsulation", "Inheritance", "Abstraction"],
      answer: "Encapsulation",
      marks: 1,
    },
    {
      question: 'In OOP, an "object" is:',
      choices: [
        "An instance of a class",
        "A type of data structure",
        "A programming technique",
        "A method definition",
      ],
      answer: "An instance of a class",
      marks: 1,
    },
    {
      question: `
    What is the output of the following Python code?
    <h3>Python Code Example:</h3>
    <pre><code>

class Animal:
    def speak(self):
        return "makes a sound"

class Dog(Animal):
    def speak(self):
        return "barks"

print(Dog().speak())
    </code></pre>`,
      choices: ["makes a sound", "barks", "SyntaxError", "None"],
      answer: "barks",
      marks: 1,
    },

    {
      question: "Which keyword is used to create a class in Java?",
      choices: ["class", "Class", "object", "Object"],
      answer: "class",
      marks: 1,
    },
    {
      question:
        "A programmer defines a class but fails to create an instance of that class. They try to call a method of the class directly. What type of error will occur?",
      choices: [
        "Compilation error",
        "Runtime error",
        "Logical error",
        "No error",
      ],
      answer: "Compilation error",
      marks: 1,
    },
    {
      question:
        "If a class Car has a method drive() that requires no arguments, which of the following calls is correct after creating a Car object named myCar?",
      choices: [
        "Car.drive()",
        "myCar.drive()",
        "drive(myCar)",
        "Car().drive()",
      ],
      answer: "myCar.drive()",
      marks: 1,
    },
  ];

  let currentOuestionIndex = 0;
  let score = 0;

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
    currentOuestionIndex++;
    if (currentOuestionIndex < questions.length) {
      showQuestions();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentOuestionIndex = 0;
    score = 0;
    startQuiz();
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestions();
  }

  function showQuestions() {
    nextBtn.classList.add("hidden");
    questionText.innerHTML = questions[currentOuestionIndex].question;
    choiceList.innerHTML = ""; // clear previous questions options
    questions[currentOuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      choiceList.appendChild(li);
      li.addEventListener("click", () => {
        li.style.backgroundColor = "#08CB00";
        selectAnswer(choice);
      });
    });
  }

  function selectAnswer(choice) {
    const correctAnswer = questions[currentOuestionIndex].answer;
    if (choice === correctAnswer) {
      score += questions[currentOuestionIndex].marks;
    }
    nextBtn.classList.remove("hidden");
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDispaly.textContent = `${score} out of ${questions.length}`;
  }
});


