// CREATE AN OBJECT TO STORE TRIVIA GAME
// <START OBJECT>
var triviaGame = {


    // CREATE AN ARRAY WITH QUESTIONS AND ANSWERS. ASSIGN THE CORRECT ANSWER INSIDE ARRAY
    questionsArr: [{
        question: "Who is king of Westeros when the series begins?",
        options: ["Aerys Targaryen", "Eddard Stark", "Robert Baratheon", "Tywin Lannister"],
        answer: 2,
        answerText: "",
    },
    {
        question: "What noble house is Catelyn Stark from?",
        options: ["House Tyrell", "House Tully", "House Lannister", "House Stark"],
        answer: 1,
        answerText: "",
    },
    {
        question: "Who is the true heir to the iron throne after Robert Baratheon's death?",
        options: ["Joffrey Baratheon", "Stannis Baratheon", "Renly Baratheon", "Eddard Stark"],
        answer: 1,
        answerText: "",
    },
    {
        question: "What was the name of Robb Stark's wife?",
        options: ["Talisa", "Shae", "Ros", "Mary"],
        answer: 0,
        answerText: "",
    },
    {
        question: "What is the name of the novels the show Game of Thrones is based off of?",
        options: ["Dances With Wolves", "The Wheel of Time", "Everybody Poops", "A Song of Ice and Fire"],
        answer: 3,
        answerText: "",
    },
    {
        question: "What noble house has a sigil of a silver trout?",
        options: ["House Tully", "House Greyjoy", "House Stark", "House Tyrell"],
        answer: 0,
        answerText: "",
    },
    {
        question: "Who was Hand of the King before Eddard Stark?",
        options: ["Tywin Lannister", "Jon Arryn", "Renly Baratheon", "Tyrion Lannister"],
        answer: 1,
        answerText: "",
    },
    {
        question: "How did Daenerys Targaryen eventually hatch her dragon eggs?",
        options: ["In a lightning storm", "In a funeral pyre", "In a fireplace", "In a frozen cave"],
        answer: 1,
        answerText: "",
    },
    {
        question: "The phrase 'Valar Morghulis' or 'all men must die' is usually responded with:",
        options: ["Valar Dohaeris or 'all men must serve'", "Valar Rohnas or 'all men must live'", "Valar GoGo or 'all men must dance'"],
        answer: 0,
        answerText: "",
    },
    {
        question: "Who is Joffrey, Myrcella and Tommen's real father?",
        options: ["Lancel Lannister", "Robert Baratheon", "Jaime Lannister", "Tyrion Lannister"],
        answer: 2,
        answerText: "",
    },
    ],    //** POSSIBLY CREATE ARRAY TO HOLD CORRECT AND INCORRECT QUESTIONS? ?? **//
    // CREATE VARIABLES TO TRACK CORRECT, WRONG, AND UNANSWERED COUNT
    currentQuestionIndex: 0,
    correct: 0,
    incorrect: 0,
    unanswered: 0,

    // CREATE OBJECT METHOD TO DISPLAY TRIVIA QUESTION ALONG WITH ANSWERS
    loadQuestion: function () {
        $("#the-quiz").html("<h2 class='mb-3'>"+this.questionsArr[this.currentQuestionIndex].question+"</h2>")

        for (let i = 0; i < this.questionsArr[this.currentQuestionIndex].options.length; i++) {
            const element = this.questionsArr[this.currentQuestionIndex].options[i];
            console.log(element);
            var newOptionButton = $("<button>");
            newOptionButton.attr({
                type: "button",
                id: [i],
                name: element,
            })
            newOptionButton.addClass("btn btn-dark btn-lg border border-light btn-block w-75 m-auto");
            newOptionButton.text(element);
            // <button type="button" name="START" id="START" class="btn btn-dark btn-lg border border-light"></button>
            $("#the-quiz").append(newOptionButton);
        }
        var answer = parseInt(this.questionsArr[this.currentQuestionIndex].answer);

        $("button").on("click", function (){
            console.log(triviaGame.questionsArr[triviaGame.currentQuestionIndex].answer);
            var anwserCheck = parseInt(this.id);
            if (anwserCheck === answer) {
                console.log("Correct")
                triviaGame.currentQuestionIndex++
                triviaGame.loadQuestion();
            } else {
                console.log("Incorrect")
                console.log(anwserCheck);
                
                triviaGame.currentQuestionIndex++
                triviaGame.loadQuestion();
            }
        })

    },
    // ONCE ANSWERED STORE INTO VARIABLES WHETHER ANSWER WAS CORRECT OR INCORRECT
    // // // !! WILL CREATE OBJECT METHOD FOR TIMER LATER...
    // AFTER TIMER OR QUESTION ANSWERED STORE INTO VARIABLES AND MOVE TO NEXT QUESTION.
    // REPEAT UNTIL DONE

    // CREATE OBJECT METHOD FOR TIMER TO TRACK TIME AND GO TO NEXT QUESTION WHEN DONE

    // CREATE OBJECT METHOD TO CREATE TIMER FOR INBETWEEN QUESTIONS

    // CREATE OBJECT METHOD TO RESET THE TRIVIA GAME

    // <//END OBJECT>
};

// CALL THE OBJECT AND START GAME
$(document).ready (

    $("#START").on("click", function() {
        $("#START").detach().hide().appendTo("#start-hide");
        triviaGame.loadQuestion();
    })


);