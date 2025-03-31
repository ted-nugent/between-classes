// ========================== //
//        NAVIGATION          //
// ========================== //

// Title Screen Navigation
$('#start-button').click(function() { 
    $('.title-screen').hide();
    $('.customization-page').show().css('display', 'flex');
    $('#character-img').show().css('display', 'block');
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

const categories = ["Body", "Shoes", "Bottoms", "Tops", "Hair"];
const images = {
    "Body": ["./images/Body_1.jpeg", "./images/Body_2.jpeg", "./images/Body_3.jpeg", "./images/Body_4.jpeg", "./images/Body_5.jpeg"],
    "Shoes": ["./images/BLANK.jpeg", "./images/Shoes_1.jpeg", "./images/Shoes_2.jpeg", "./images/Shoes_3.jpeg"],
    "Bottoms": ["./images/BLANK.jpeg", "./images/Bottom_1.jpeg", "./images/Bottom_2.jpeg", "./images/Bottom_3.jpeg", "./images/Bottom_4.jpeg"],
    "Tops": ["./images/BLANK.jpeg", "./images/Top_1.jpeg", "./images/Top_2.jpeg", "./images/Top_3.jpeg", "./images/Top_4.jpeg"],
    "Hair": ["./images/BLANK.jpeg", "./images/Hair_1.jpeg", "./images/Hair_2.jpeg", "./images/Hair_3.jpeg", "./images/Hair_4.jpeg", "./images/Hair_5.jpeg", "./images/Hair_6.jpeg"]
};

let currentCategoryIndex = 0;
let currentImageIndex = 0;

let finalCharacterSelection = {
    "Body":"",
    "Shoes":"",
    "Bottoms": "",
    "Tops": "",
    "Hair": "",
};

// Assuming `categories` contains ["Body", "Shoes", "Bottoms", "Tops", "Hair"]
function initializeCharacterSelection() {
    categories.forEach(category => {
        if (images[category] && images[category].length > 0) {
            finalCharacterSelection[category] = images[category][0]; // Set default to the first image
        } else {
            console.warn(`No images found for category: ${category}`);
        }
    });

    console.log("Initialized Character Selection:", finalCharacterSelection);
}

// Call this function when the page loads
initializeCharacterSelection();


function updateCharacterDisplay() {
    let category = categories[currentCategoryIndex];

    let imgSrc = categories[currentCategoryIndex];//images[categories[currentCategoryIndex]][currentImageIndex]; 


    console.log("Updating Image Source:", imgSrc); // Debugging

    if (!imgSrc) {
        console.error("Image not found for category:", categories[currentCategoryIndex]);
    } else {
        $("#character-img").attr("src", imgSrc);
    }

    $("#character-caption").text(`Customizing: ${category}`);
}

function setSelection(category, imagePath){
    if (finalCharacterSelection.hasOwnProperty(category)) { 
        finalCharacterSelection[category] = imagePath; // Overwrite previous selection
    } else {
        console.error(`Category "${category}" does not exist.`);
    }
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
        setSelection(categories[currentCategoryIndex], currentImageIndex); //new -- setSelection first then reset using lines of code below
        currentCategoryIndex++;
        currentImageIndex = 0;
        updateCharacterDisplay();
        //update finalCharacterSelection as well. 
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
    await typeSentence(storyEpilogue, "#typewriter-test");  // Wait for the text to fully display first

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
        // Hide everything except death-related elements
        $("body *").not("#death-screen, #typewriter-test, #death-text").hide();

        // Debugging: Log what is being hidden
        $("body *").not("#death-screen, #typewriter-test, #death-text").each(function() {
            console.log("Hiding:", this);
        });

        $("body").css("background", "black");

        // Show the death screen explicitly
        $("#death-screen").show();
        $("#death-text").show(); // Ensure death message area is visible

        console.log("Death screen triggered. Cause:", deathCause);

        // Step 1: Wait for first key press
        waitForKeyPress().then(() => {
            console.log("First key press detected. Showing death cause...");

            // Step 2: Get and display death message
            let deathMessage = getDeathMessage(deathCause);
            console.log("Death message:", deathMessage);

            $("#death-text").show().css({ "display": "block", "visibility": "visible", "opacity": "1" }).empty();
            console.log("#death-text visible?", $("#death-text").is(":visible"));

            typeSentence(deathMessage, "#death-text").then(() => {
                console.log("Passing to typeText:", deathMessage);

                waitForKeyPress().then(() => {
                    console.log("Second key press detected. Returning to title screen.");

                    // Hide death screen and return to title
                    $("#death-screen").hide();
                    $("body").css("background", "linear-gradient(to bottom, #d5e1f8, #e5f1ff)"); 

                    // Fix: Correctly show title elements
                    $("#title-screen, .gametitle, .button-container, .credits").each(function() {
                        $(this).show();
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
    return deathMessages[cause] || "Try again."
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
async function typeSentence(sentences, targetId = "#typewriter-test") {
    if (!Array.isArray(sentences)) {
        sentences = [sentences];  // Convert single sentence to array
    }

    for (let i = 0; i < sentences.length; i++) {
        $(targetId).empty();  // Clear previous text

        await new Promise((resolve) => {
            let sentence = sentences[i];
            let j = 0;
            let interval = setInterval(() => {
                if (typeof sentence !== 'string') {
                    sentence = String(sentence);
                }
                if (j < sentence.length) {
                    $(targetId).append(sentence.charAt(j));
                    j++;
                } else {
                    clearInterval(interval);
                    console.log("Finished typing:", sentence);
                    resolve();  // Move to next sentence
                }
            }, 15);
        });

        await waitForKeyPress();  // Wait for player to continue
    }
}

function clearScreen(target) {
    $(target).empty();
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
            await typeSentence(Array.isArray(choice.response) ? choice.response : [choice.response]); // Type response fully

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