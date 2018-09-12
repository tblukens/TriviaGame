// CREATE AN OBJECT TO STORE TRIVIA GAME
// <START OBJECT>
var intervalId1;
var intervalId2;

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
        options: ["Valar Dohaeris: 'all men must serve'", "Valar Rohnas: 'all men must live'", "Valar GoGo: 'all men must dance'"],
        answer: 0,
        answerText: "",
    },
    {
        question: "Who is Joffrey, Myrcella and Tommen's real father?",
        options: ["Lancel Lannister", "Robert Baratheon", "Jaime Lannister", "Tyrion Lannister"],
        answer: 2,
        answerText: "",
    },
    ], //** POSSIBLY CREATE ARRAY TO HOLD CORRECT AND INCORRECT QUESTIONS? ?? **//
    // CREATE VARIABLES TO TRACK CORRECT, WRONG, AND UNANSWERED COUNT
    currentQuestionIndex: 0,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    maxTime: 30,
    intermissionTime: 5,


    // CREATE OBJECT METHOD TO DISPLAY TRIVIA QUESTION ALONG WITH ANSWERS
    loadQuestion: function () {
        $("#START").off();
        $("button").off();
        if (this.currentQuestionIndex >= this.questionsArr.length) {
            var singularQuestion = "question(s)";
            $("#the-quiz").html(
                "<h2>GAME OVER</h2><h2>Here are your scores:</h2><p>You answered " + this.correct + " " + singularQuestion + " correct.</p><p>" +
                "You answered " + this.incorrect + " " + singularQuestion + " incorrectly.</p>" +
                "<p>You left " + this.unanswered + " " + singularQuestion + " unanswered.");
            this.resetGame();
        } else {

            $("#the-quiz").html("<h2 class=''>" + this.questionsArr[this.currentQuestionIndex].question + "</h2>")

            for (let i = 0; i < this.questionsArr[this.currentQuestionIndex].options.length; i++) {
                const element = this.questionsArr[this.currentQuestionIndex].options[i];
                var newButtonDiv = $("<div>");
                newButtonDiv.addClass("buttonHolder col-md-8 col-lg-6 mx-auto")
                var newOptionButton = $("<button>");
                newOptionButton.attr({
                    type: "button",
                    id: [i],
                    name: element,
                    value: element
                })
                newOptionButton.addClass("btn btn-dark mx-auto border border-light btn-block");
                newOptionButton.text(element);
                $("#the-quiz").append(newButtonDiv);
                newButtonDiv.append(newOptionButton);
                var breakSpace = $("");
                // $("#the-quiz").append(newOptionButton);
                $("#the-quiz").append(breakSpace);
            }
            var answer = parseInt(this.questionsArr[this.currentQuestionIndex].answer);


            $("button").mouseenter(function () {
                if ($(this).attr('value') !== "RESET") {
                    var val = $(this).attr('value');
                    $(this).html("<i class='fas fa-shield-alt'></i>  " + val + "  <i class='fas fa-shield-alt'></i>")
                }
            })
            $("button").mouseleave(function () {
                if ($(this).attr('value') !== "RESET") {
                    var val = $(this).attr('value');
                    $(this).html(val)
                }
            })

            // ONCE ANSWERED STORE INTO VARIABLES WHETHER ANSWER WAS CORRECT OR INCORRECT
            $("button").on("click", function () {
                var anwserCheck = parseInt(this.id);
                if (anwserCheck === answer) {

                    triviaGame.correctDisplay();
                } else {
                    triviaGame.incorrectDisplay();
                }
            })

            this.mainTimer();
            return;
        }
    },

    // CREATE TIMER
    timer1: function () {
        $("#timer").html("<p class='timerCSS'>Time Remaining: " + triviaGame.maxTime + " seconds.</p>")
        triviaGame.maxTime--;
        console.log(triviaGame.maxTime);
        if (triviaGame.maxTime < 0) {
            triviaGame.timesUpDisplay();
            triviaGame.stopMainTimer();
        }

    },

    // CREATE OBJECT METHOD FOR TIMER TO TRACK TIME AND GO TO NEXT QUESTION WHEN DONE
    mainTimer: function () {
        intervalId1 = setInterval(triviaGame.timer1, 1000)
    },
    stopMainTimer: function () {
        clearInterval(intervalId1)
    },
    timer2: function () {
        triviaGame.intermissionTime--;
        console.log(triviaGame.intermissionTime);

        if (triviaGame.intermissionTime <= 0) {
            triviaGame.stopSecondaryTimer();
            triviaGame.intermissionTime = 10;
            triviaGame.loadQuestion();
        }

    },

    // CREATE OBJECT METHOD TO CREATE TIMER FOR INBETWEEN QUESTIONS
    secondaryTimer: function () {
        intervalId2 = setInterval(triviaGame.timer2, 1000)
    },
    stopSecondaryTimer: function () {
        clearInterval(intervalId2)
    },
    // AFTER TIMER OR QUESTION ANSWERED STORE INTO VARIABLES AND MOVE TO NEXT QUESTION.
    incorrectDisplay: function () {
        this.stopMainTimer();
        this.secondaryTimer();
        $("#the-quiz").html("<h2 class=''>Sorry, the correct answer was: <br>" + this.questionsArr[this.currentQuestionIndex].options[this.questionsArr[this.currentQuestionIndex].answer] + "</h2>");
        this.displayImage();
        triviaGame.currentQuestionIndex++;
        triviaGame.incorrect++;
        this.maxTime = 30;
        // triviaGame.loadQuestion();
    },
    correctDisplay: function () {
        this.stopMainTimer();
        this.secondaryTimer();
        $("#the-quiz").html("<h2 class=''>Correct! Your answer:<br>" + this.questionsArr[this.currentQuestionIndex].options[this.questionsArr[this.currentQuestionIndex].answer] + "</h2>");
        this.displayImage();
        triviaGame.currentQuestionIndex++;
        triviaGame.correct++;
        this.maxTime = 30;
        // triviaGame.loadQuestion();
    },
    timesUpDisplay: function () {
        this.stopMainTimer();
        this.secondaryTimer();
        $("#the-quiz").html("<h2 class=''>Sorry, time's up! The correct answer was:<br>" + this.questionsArr[this.currentQuestionIndex].options[this.questionsArr[this.currentQuestionIndex].answer] + " </h2>");
        this.displayImage();
        triviaGame.currentQuestionIndex++;
        triviaGame.unanswered++;
        this.maxTime = 30;
    },
    displayImage: function () {
        var currentImage = this.questionsArr[this.currentQuestionIndex].options[this.questionsArr[this.currentQuestionIndex].answer];

        var imageID = currentImage.replace(/ /g, '');

        addNewImg = $("<img>");
        addNewImg2 = $("<img>");
        if (currentImage === "A Song of Ice and Fire") {
            var songOf = currentImage.slice(0, 13);
            songOf = songOf.replace(/ /g, '');
            var andFire = currentImage.slice(13);
            andFire = andFire.replace(/ /g, '');
            addNewImg.attr({
                id: songOf,
                src: "assets/images/A Song of Ice.gif",
                alt: currentImage,
            });
            addNewImg2.attr({
                id: andFire,
                src: "assets/images/and Fire.gif",
                alt: currentImage,
            });
            addNewImg.addClass("mb-1 iceandfire img-fluid border border-light")
            addNewImg2.addClass("mb-1 iceandfire img-fluid border border-light")
            $("#the-quiz").append(addNewImg);
            $("#the-quiz").append(addNewImg2);
        } else {
            if (currentImage === "Valar Dohaeris: 'all men must serve'") {
                currentImage = "Valar Dohaeris";
                imageID = "Valar_Dohaeris";
            }
            addNewImg.attr({
                id: imageID,
                src: "assets/images/" + currentImage + ".gif",
                alt: currentImage,
            });
            addNewImg.addClass("mb-1 img-fluid border border-light")

            $("#the-quiz").append(addNewImg);
        }
    },

    // CREATE OBJECT METHOD TO RESET THE TRIVIA GAME
    resetGame: function () {
        this.stopMainTimer();
        this.stopSecondaryTimer();
        this.currentQuestionIndex = 0;
        this.correct = 0;
        this.incorrect = 0;
        this.maxTime = 30;
        this.intermissionTime = 5;

        $("#START").attr('value', "RESET").text("RESET").detach().show().appendTo("#the-quiz");
        $("#START").on("click", function () {
            $("#START").detach().hide().appendTo("#start-hide");
            triviaGame.loadQuestion();
            return;
        })
        return;

    }
    // <//END OBJECT>
};

// CALL THE OBJECT AND START GAME
$(document).ready(

    $("#START").on("click", function () {
        $("#START").detach().hide().appendTo("#start-hide");
        triviaGame.loadQuestion();
    })


);

window.onload = function () {

    var theWindow = $(window),
        $bg = $("#bg"),
        aspectRatio = $bg.width() / $bg.height();

    function resizeBg() {

        if ((theWindow.width() / theWindow.height()) < aspectRatio) {
            $bg
                .removeClass()
                .addClass('bgheight');
        } else {
            $bg
                .removeClass()
                .addClass('bgwidth');
        }

    }

    theWindow.resize(resizeBg).trigger("resize");

};