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

$("#confirm").click(function() {
    $(".customization-confirm").hide();
    $(".chapter1").show();
    $('body').css('background', 'black');

    clearScreen();
    typeText(storyEpilogue, function() {
        showChoices(storyChoices);
        
    });

    setTimeout(function() {
        $('body').css('background', 'white');

        // Step 3: Append the image properly with correct syntax
        $("body").append('<img id="fade-image" src="images/hallway daytime.jpeg" style="display:none; position:fixed; width:100vw; height:100vh; top:0; left:0; z-index:-1;">');

        // Step 4: Fade in the image
        $("#fade-image").fadeIn(2000);
    }, 10000); // Delay of 1 second after storyEpilogue
});

// ========================== //
//      TYPEWRITER EFFECT     //
// ========================== //

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
//        GAME SCENES         //
// ========================== //

let storyEpilogue = [
    "It's your first year at college.",
    "So many choices...",
    "Are you ready?"
];

let storyChoices = [
    {
        text: "Yes",
        response: "Good luck."
    },
    {
        text: "No",
        response: "Too bad."
    }
];

