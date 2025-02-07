$(document).ready(function(){ //go customize
    $('#start-button').click(function() { 
        $('.title-screen').hide(); // Hide the title screen
        $('.customization-page').show(); // Show the customization page
        $('.customization-page').css('display', 'flex');
    });

    // Load Button Alert
    $('#load-button').click(function() {
        alert('Load screen coming soon!');
    });

    // Exit Button Alert
    $('#exit-button').click(function() {
        alert('Exiting the game!');
    });
})

$(document).ready(function(){ //go home
    $('#home-button').click(function(){
        $('.customization-page').hide();
        $('.title-screen').show();
    });
})

$(document).ready(function(){ //go home
    $("#home-button2").css({
        "text-align": "center",
        "justify-content": "center",
        "display": "flex",
        "transform": "translateX(2.3em)"
    });
    
    $('#home-button2').click(function(){
        $('.customization-confirm').hide();
        $('.title-screen').show();
    });
})

$(document).ready(function(){
    $("#confirm").click(function(){
        $('.customization-confirm').hide();
        $('.chapter1').show();
    });
})

$(document).ready(function(){
    $("#go-back").click(function(){
        $('.customization-confirm').hide();
        $('.customization-page').show();
    });
})

$(document).ready(function() {
    // Categories and their images
    const categories = ["Body Type", "Skin Tone", "Hair", "Tops", "Bottoms", "Accessories"];
    const images = {
        "Body Type": ["images/bodytype1.png", "images/bodytype2.png"],
        "Skin Tone": ["images/skintone1.png", "images/skintone2.png"],
        "Hair": ["images/hair1.png", "images/hair2.png"],
        "Tops": ["images/top1.png", "images/top2.png"],
        "Bottoms": ["images/bottom1.png", "images/bottom2.png"],
        "Accessories": ["images/accessory1.png", "images/accessory2.png"]
    };

    let currentCategoryIndex = 0;  // Tracks current category (Body, Skin Tone, etc.)
    let currentImageIndex = 0;     // Tracks which image is selected in the current category

    function updateCharacterDisplay() {
        // Update text to show current category
        $("#character-display").text(`Customizing: ${categories[currentCategoryIndex]}`);

        // Show the current image
        $("#character-img").attr("src", images[categories[currentCategoryIndex]][currentImageIndex]);
    }

    // Cycle images within the current category
    $("#prev-button").click(function() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
        } else {
            currentImageIndex = images[categories[currentCategoryIndex]].length - 1; // Loop to last image
        }
        updateCharacterDisplay();
    });

    $("#next-button").click(function() {
        if (currentImageIndex < images[categories[currentCategoryIndex]].length - 1) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0; // Loop to first image
        }
        updateCharacterDisplay();
    });

    // Move to the next category on confirm
    $("#confirm-button").click(function() {
        if (currentCategoryIndex < categories.length - 1) {
            currentCategoryIndex++;
            currentImageIndex = 0; // Reset to first image of new category
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
    // Initialize Display
    updateCharacterDisplay();
});

$(document).ready(function() {
    console.log("Game Loaded!");

    $("#confirm").click(function() {
        $(".customization-confirm").hide();
        $(".chapter1").show();
        $('body').css('background', 'black');
        
        clearScreen();
        typeText(epilogue, function() {
            showChoices(choices);
        });
    });
});

// Function to clear the screen before displaying new text
function clearScreen() {
    $('#typewriter-test').empty();
    $('#choices-container').empty().hide();
}

// Function to display text with a typewriter effect
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

// Function to display choices as buttons
function showChoices(choices) {
    $('#choices-container').empty().show();
    choices.forEach(choice => {
        let button = $('<button>').text(choice.text).addClass('choice-button');
        button.click(() => {
            $('#choices-container').hide();
            clearScreen(); // Don't show the choice, just clear the screen

            // Now show only the response
            typeText([choice.response]);
        });
        $('#choices-container').append(button);
    });
}

// Scene 2 Dialogue
let epilogue = [
    "It's your first year at college.",
    "So many choices...",
    "Are you ready?"
];

// Choices for Scene 2
let choices = [
    {
        text: "Yes",
        response: "Good luck."
    },
    {
        text: "No",
        response: "Too bad."
    }
];
