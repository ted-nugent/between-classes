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

//death screen
//$("#restart-button").click(function (){
//    $(".chapter1").hide();
//    $("#death-screen").hide();
//    $(".title-screen").show();
//  $("body").css("background", "linear-gradient(to bottom, #d5e1f8, #e5f1ff)");
//});
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

$("#confirm").click(async function () {
    $(".customization-confirm").hide();
    $(".chapter1").show();
    $("body").css("background", "black");

    clearScreen(); 
    await typeText(storyEpilogue);  // Wait for the text to fully display first

    await waitForKeyPress();  // Wait for player input before showing choices
    showChoices(storyChoices, async function () {


        await waitForKeyPress(); // Another press before scene transition
        clearScreen();
        $("body").css("background", "white");
        $("body").append(
            '<img id="fade-image" src="images/hallway daytime.jpeg" style="display:none; position:fixed; width:100vw; height:100vh; top:0; left:0; z-index:-1;">'
        );
        $("#fade-image").fadeIn(2000);
    });
});


// ========================== //
//      Death Screen     //
// ========================== //
function deathScreen(deathCause) {
    return new Promise(resolve => {
        // Hide all elements except death screen and typewriter-test
        $("body *").not("#death-screen, #typewriter-test").hide();
        $("body").css("background", "black");

        // Show the death screen explicitly
        $("#death-screen").show().empty();
        $("#typewriter-test").show().empty();

        console.log("Death screen triggered. Cause:", deathCause); // Debugging log

        // Step 1: Wait for first key press
        waitForKeyPress().then(() => {
            console.log("First key press detected. Showing death cause...");

            // Step 2: Get and display death message
            let deathMessage = getDeathMessage(deathCause);
            console.log("Death message:", deathMessage); // Debugging log
            $("#typewriter-test").show().empty();
            console.log($("#typewriter-test").is(":visible"));
            typeText([deathMessage]).then(() => {
                console.log("Passing to typeText:", [deathMessage]);

                waitForKeyPress().then(() => {
                    console.log("Second key press detected. Returning to title screen.");

                    // Hide death screen and return to title
                    $("#death-screen").hide();
                    clearScreen();
                    $("body").css("background", "linear-gradient(to bottom, #d5e1f8, #e5f1ff)"); //this isnt showing
                    $(".title-screen", ".gametitle", ".button-container", ".credits").each(function() {
                        show();
                    });
                    resolve();
                });
            });
        });
    });
}
// ========================== //
//        DEATHMESSAGES       //
// ========================== //

function getDeathMessage(cause) {
    const deathMessages = {
        "trampled": "You were trampled to death. Maybe try moving?",
        "poisoned": "You drank the poison. The poison for Kuzco, the poison chosen especially to kill Kuzco, Kuzco's poison. That poison.",
        "drowned": "Maybe swimming lessons weren't such a bad idea.",
        "scorched": "You burned to death. Fire is hot, who knew?",
    };
    return deathMessages[cause] || "You died."
}



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

async function typeText(textArray) {
    for (let i = 0; i < textArray.length; i++) {
        $("#typewriter-test").empty();  // Clear previous text
        await typeSentence(textArray[i]); // Type one sentence at a time
        await waitForKeyPress();  // Wait for player input before typing the next one
    }
}

// Helper function to type one sentence letter by letter
function typeSentence(sentence) {
    return new Promise((resolve) => {
        let i = 0;
        let interval = setInterval(() => {
            if (i < sentence.length) {
                $("#typewriter-test").append(sentence.charAt(i));
                i++;
            } else {
                clearInterval(interval);
                resolve(); // Resolve the promise when done typing
            }
        }, 15);
    });
}

function clearScreen() {
    $('#typewriter-test').empty();
    $('#choices-container').empty().hide();
}

// ========================== //
//        CHOICES HANDLER     //
// ========================== //

function showChoices(choices, callback = null) {
    $("#choices-container").empty().show(); // Ensure choices container is visible

    choices.forEach((choice) => {
        let button = $("<button>")
            .text(choice.text)
            .addClass("choice-button");

            
        button.click(async () => {
            $("#choices-container").hide(); // Hide choices after selection
            await typeText(Array.isArray(choice.response) ? choice.response : [choice.response]); // Type response fully

            // If this choice leads to death, trigger the death screen
            if (choice.triggersDeath) {
                await deathScreen(choice.deathCause);
                return;
            }

            // If there are more choices after this, show them
            if (choice.nextChoices) {
                showChoices(choice.nextChoices, callback);
            } else if (callback) {
                callback(); // Call the callback if no more choices exist
            }
        });

        $("#choices-container").append(button);
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
    "Anyway, you're standing in the middle of the entrance--therefore making you the biggest inconvenience (and weirdo) ever.",
    "What do you do? (Hint: this is your first big decision. Make it count)"
];


let storyChoices = [
    {
        text: "*stands there*", 
        response: [
            "You've got to be kidding me.",
            "*Sigh*",
            "You stand there, inconveniencing everyone.",
            "After some soft shoulder brushes, they realize you aren't moving.",
            "It starts with a some shouldering, then elbow jabs.",
            "You find yourself face down on the floor.",
            "Nobody seems to care though as they continue forward, trampling you in the process.",
            "Congratulations.",
            "You died."
        ],
        effect: () => playerState.intelligence -= 1,
        triggersDeath: true,
        deathCause: "trampled"
    },
    {
        text: "No", 
        response: [
            "No?", "What. What do you mean no?", "You can't just say 'no'."
        ],
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
                ],
            },
        ],
    },
    {
        text: "Walk into the hallway", 
        response: ["You take a deep breath and step inside. The journey begins."],
    },
]