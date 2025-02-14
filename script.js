// ========================== //
//        NAVIGATION          //
// ========================== //

// Title Screen Navigation
$('#start-button').click(function() { 
    $('.title-screen').hide();
    $('.customization-page').show().css('display', 'flex');
});

$('#load-button').click(function() {
    alert('Load screen coming soon!');
});

$('#exit-button').click(function() {
    alert('Exiting the game!');
});

// Home Button Navigation
$('#home-button, #home-button2').click(function(){
    $('.customization-page, .customization-confirm').hide();
    $('.title-screen').show();
});

// Go Back to Customization Page
$("#go-back").click(function(){
    $('.customization-confirm').hide();
    $('.customization-page').show();
});

// ========================== //
//    CHARACTER CUSTOMIZATION //
// ========================== //

const categories = ["Body Type", "Skin Tone", "Hair", "Tops", "Bottoms", "Accessories"];
const images = {
    "Body Type": ["images/bodytype1.png", "images/bodytype2.png"],
    "Skin Tone": ["images/skintone1.png", "images/skintone2.png"],
    "Hair": ["images/hair1.png", "images/hair2.png"],
    "Tops": ["images/top1.png", "images/top2.png"],
    "Bottoms": ["images/bottom1.png", "images/bottom2.png"],
    "Accessories": ["images/accessory1.png", "images/accessory2.png"]
};

let currentCategoryIndex = 0;
let currentImageIndex = 0;

function updateCharacterDisplay() {
    $("#character-display").text(`Customizing: ${categories[currentCategoryIndex]}`);
    $("#character-img").attr("src", images[categories[currentCategoryIndex]][currentImageIndex]);
}

$("#prev-button").click(function() {
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : images[categories[currentCategoryIndex]].length - 1;
    updateCharacterDisplay();
});

$("#next-button").click(function() {
    currentImageIndex = (currentImageIndex < images[categories[currentCategoryIndex]].length - 1) ? currentImageIndex + 1 : 0;
    updateCharacterDisplay();
});

$("#confirm-button").click(function() {
    if (currentCategoryIndex < categories.length - 1) {
        currentCategoryIndex++;
        currentImageIndex = 0;
        updateCharacterDisplay();
    } else {
        $('.customization-page').hide();
        $('.customization-confirm').show();
    }
});

$("#back-button").click(function(){
    if (currentCategoryIndex > 0) {
        currentCategoryIndex--;
        currentImageIndex = 0;
        updateCharacterDisplay();
    }
});

updateCharacterDisplay(); // Initialize display

// ========================== //
//       STORY STARTS         /////////////////////////////////////////////////////////////
// ========================== //

$("#confirm").click(async function() {
    $(".customization-confirm").hide();
    $(".chapter1").show();
    $('body').css('background', 'black');

    clearScreen();
    typeText(storyEpilogue, async function() {
        showChoices(storyChoices);

        await waitForKeyPress();
        await waitForKeyPress();
        $('#typewriter-test').hide();
        

        $('body').css('background', 'white');
        $("body").append('<img id="fade-image" src="images/hallway daytime.jpeg" style="display:none; position:fixed; width:100vw; height:100vh; top:0; left:0; z-index:-1;">');
        $("#fade-image").fadeIn(2000);
    });
});

// ========================== //
//      WAIT FOR KEYPRESS     //
// ========================== //
function waitForKeyPress() {
    return new Promise(resolve => {
        function keyHandler(event) {$("#confirm").click(async function() {
    typeText(storyEpilogue, async function() {
        showChoices(storyChoices);
    });
});

// ========================== //
//      TYPEWRITER EFFECT     //
// ========================== //
function waitForKeyPress() {
    return new Promise(resolve => {
        function keyHandler(event) {
            if (event.key === "Enter" || event.key === " ") {
                document.removeEventListener("keydown", keyHandler);
                document.removeEventListener("click", clickHandler);
                resolve(); // Resolves the promise, allowing execution to continue
            }
        }
        function clickHandler() {
            document.removeEventListener("keydown", keyHandler);
            document.removeEventListener("click", clickHandler);
            resolve(); // Resolves the promise on click
        }

        document.addEventListener("keydown", keyHandler);
        document.addEventListener("click", clickHandler);
    });
}

function clearScreen() {
    $('#typewriter-test').empty();
    $('#choices-container').empty().hide();
}

function typeText(textArray, callback = null) {
    let currentIndex = 0;
    let charIndex = 0;
    let isTyping = false;
    let interval;

    function showNextChar() {
        if (charIndex < textArray[currentIndex].length) {
            $('#typewriter-test').append(textArray[currentIndex].charAt(charIndex));
            charIndex++;
        } else {
            clearInterval(interval);
            isTyping = false;
        }
    }

    function nextText() {
        if (interval) clearInterval(interval);
        currentIndex++;
        if (currentIndex < textArray.length) {
            clearScreen();
            charIndex = 0;
            isTyping = true;
            interval = setInterval(showNextChar, 35);
        } else if (callback) {
            callback();
        }
    }

    $(document).off('keydown click').on('keydown click', function(e) {
        if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
            nextText();
        }
    });

    isTyping = true;
    interval = setInterval(showNextChar, 35);
}
            if (event.key === "Enter" || event.key === " ") {
                document.removeEventListener("keydown", keyHandler);
                document.removeEventListener("click", clickHandler);
                resolve(); // Resolves the promise, allowing execution to continue
            }
        }
        function clickHandler() {
            document.removeEventListener("keydown", keyHandler);
            document.removeEventListener("click", clickHandler);
            resolve(); // Resolves the promise on click
        }

        document.addEventListener("keydown", keyHandler);
        document.addEventListener("click", clickHandler);
    });
}

function clearScreen() {
    $('#typewriter-test').empty();
    $('#choices-container').empty().hide();
}

function typeText(textArray, callback = null) {
    let currentIndex = 0;
    let charIndex = 0;
    let isTyping = false;
    let interval;

    function showNextChar() {
        if (charIndex < textArray[currentIndex].length) {
            $('#typewriter-test').append(textArray[currentIndex].charAt(charIndex));
            charIndex++;
        } else {
            clearInterval(interval);
            isTyping = false;
        }
    }

    function nextText() {
        currentIndex++;
        if (currentIndex < textArray.length) {
            clearScreen();
            charIndex = 0;
            isTyping = true;
            interval = setInterval(showNextChar, 35);
        } else if (callback) {
            callback();
        }
    }

    $(document).off('keydown click').on('keydown click', function(e) {
        if ((e.type === 'click' || e.key === 'Enter' || e.key === ' ') && !isTyping) {
            nextText();
        }
    });

    isTyping = true;
    interval = setInterval(showNextChar, 35);
}

// ========================== //
//        CHOICES HANDLER     //
// ========================== //

function showChoices(choices) {
    $('#choices-container').empty().show();
    choices.forEach(choice => {
        let button = $('<button>').text(choice.text).addClass('choice-button');
        button.click(() => {
            $('#choices-container').hide();
            clearScreen(); // Don't show the choice, just clear the screen
            typeText([choice.response]);
        });
        $('#choices-container').append(button);
    });
}

// ========================== //
//       PLAYER OBJECTS       //
// ========================== //

let playerState = {
    charisma: 0,
    intelligence: 0,
    perception: 0,
    loyalty: 0,
    sarcasm: 0,
    strength: 0,
    reflexes: 0,
    persuasion: 0,
    luck: 0,
    deception: 0,
}

//let playerEvents = {} ADD AS THE STORY PROGRESSES

// ========================== //
//        GAME SCENES         // git add . git push
// ========================== //

let storyEpilogue = [
    "It's your first year at college.",
    "You've always had a vague life.",
    "Honestly, you can't even remember what you did yesterday.",
    "You should probably get that checked out...",
    "Anyway, you're standing smack dab in the middle of the entrance--therefore making you the biggest inconvenience (and weirdo) ever.",
    "What do you do? (Hint: this is your first big decision. Make it count)"
];


let storyChoices = [
    {
        text: "Continue standing in everyone's way", 
        response: "You've got to be kidding me.", 
        effect: () => playerState.intelligence -= 1,
        nextChoices: [
            {
                text: "*stands there*", 
                response: [
                    "*Sigh*, you continue to stand there. Right in the entrance.",
                    "Students brush past you, some with the forced politeness of someone trying very hard not to shove you, others opting instead for a direct approach: bumping into you and moving on without a word."
                ],
                nextChoices: [
                    { text: "*sneeze*", response: "You sneeze. A small event in the grand scheme of things, but perhaps significant in ways you cannot yet comprehend." },
                    { text: "Walk into the hallway", response: "Finally, you make your way inside. About time." }
                ]
            }
        ]
    },
    {
        text: "No", 
        response: ["No?", "What. What do you mean no?", "You can't just say 'no'."],
        nextChoices: [
            { 
                text: "No", 
                response: ["So it's like that then huh?", "Trying to break the game this early on?", "Fine.", "Have it your way."] 
            },
            { 
                text: "Walk into the hallway", 
                response: [
                    "Thank you.", 
                    "It seems like you've come to your senses.", 
                    "Well then, you enter the hallway and take in the sights of your new educational facility."
                ] 
            }
        ]
    },
    {
        text: "Walk into the hallway", 
        response: ["You take a deep breath and step inside. The journey begins."]
    }
];