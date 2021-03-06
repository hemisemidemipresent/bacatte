// Array to store our Snowflake objects
var snowflakes = [];

// Global variables to store our browser's window size
var browserWidth;
var browserHeight;

// Specify the number of snowflakes you want visible
var numberOfSnowflakes = 30;

// Flag to reset the position of the snowflakes
var resetPosition = false;

// Handle accessibility
var enableAnimations = false;
var reduceMotionQuery = matchMedia('(prefers-reduced-motion)');

// Handle animation accessibility preferences
function setAccessibilityState() {
    if (reduceMotionQuery.matches) {
        enableAnimations = false;
    } else {
        enableAnimations = true;
    }
}
setAccessibilityState();

reduceMotionQuery.addListener(setAccessibilityState);

//
// It all starts here...
//
function setup() {
    if (enableAnimations) {
        window.addEventListener('DOMContentLoaded', generateSnowflakes, false);
        window.addEventListener('resize', setResetFlag, false);
    }
}
setup();

//
// Constructor for our Snowflake object
//
function Snowflake(element, speed, xPos, yPos, angleSpeed) {
    // set initial snowflake properties
    this.element = element;
    this.speed = speed;
    this.xPos = xPos;
    this.yPos = yPos;
    this.scale = 1;
    this.angle = Math.random() * 360;
    this.angleSpeed = angleSpeed;
    // declare variables used for snowflake's motion
    this.counter = 0;
    this.sign = Math.random() < 0.5 ? 1 : -1;

    // setting an initial opacity and size for our snowflake
    this.element.style.opacity = 1;
}

//
// The function responsible for 'actually' moving our snowflake
//
Snowflake.prototype.update = function () {
    // using some trigonometry to determine our x and y position
    this.counter += this.speed / 5000;
    this.yPos += this.speed / 30;
    this.scale = 0.25;
    this.angle += this.angleSpeed;
    this.angle = this.angle % 360;
    // setting our snowflake's position
    setTransform(
        Math.round(this.xPos),
        Math.round(this.yPos),
        this.scale,
        this.element,
        this.angle
    );

    // if snowflake goes below the browser window, move it back to the top
    if (this.yPos > browserHeight) {
        let xpos = getPosition(330, browserWidth);
        this.xPos = xpos;
        this.yPos = -1000;
    }
};

//
// A performant way to set your snowflake's position and size
// Does the actual moving
function setTransform(xPos, yPos, scale, el, angle) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${scale}, ${scale}) rotate(${angle}deg)`;
}

//
// The function responsible for creating the snowflake
//
function generateSnowflakes() {
    // get our snowflake element from the DOM and store it
    var originalSnowflake = document.querySelector('.snowflake');

    // access our snowflake element's parent container
    var snowflakeContainer = originalSnowflake.parentNode;
    snowflakeContainer.style.display = 'block';

    // get our browser's size
    browserWidth = document.documentElement.clientWidth;
    browserHeight = document.documentElement.clientHeight;

    // create each individual snowflake
    for (var i = 0; i < numberOfSnowflakes; i++) {
        // clone our original snowflake and add it to snowflakeContainer
        var snowflakeClone = originalSnowflake.cloneNode(true);
        let src = generateImgSrc();

        snowflakeClone.setAttribute('src', src);
        snowflakeContainer.appendChild(snowflakeClone);

        // set our snowflake's initial position and related properties
        var initialXPos = getPosition(50, browserWidth);
        var initialYPos = getPosition(50, browserHeight);
        if (src.includes('bacatte')) {
            var angleSpeed = 0;
            console.log(angleSpeed);
        } else {
            var angleSpeed = Math.random();
        }
        var speed = 100 + Math.random() * 250;

        // create our Snowflake object
        var snowflakeObject = new Snowflake(
            snowflakeClone,
            speed,
            initialXPos,
            initialYPos,
            angleSpeed
        );
        snowflakes.push(snowflakeObject);
    }

    // remove the original snowflake because we no longer need it visible
    snowflakeContainer.removeChild(originalSnowflake);

    moveSnowflakes();
}

//
// Responsible for moving each snowflake by calling its update function
//
function moveSnowflakes() {
    if (enableAnimations) {
        for (var i = 0; i < snowflakes.length; i++) {
            var snowflake = snowflakes[i];
            snowflake.update();
        }
    }

    // Reset the position of all the snowflakes to a new value
    if (resetPosition) {
        browserWidth = document.documentElement.clientWidth;
        browserHeight = document.documentElement.clientHeight;

        for (var i = 0; i < snowflakes.length; i++) {
            var snowflake = snowflakes[i];

            snowflake.xPos = getPosition(50, browserWidth);
            snowflake.yPos = getPosition(50, browserHeight);
        }

        resetPosition = false;
    }

    requestAnimationFrame(moveSnowflakes);
}

//
// This function returns a number between (maximum - offset) and (maximum + offset)
//
function getPosition(offset, size) {
    return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
}

//
// Trigger a reset of all the snowflakes' positions
//
function setResetFlag(e) {
    resetPosition = true;
}

function generateImgSrc() {
    let arr = [
        './img/bacatte.png',
        './img/octopus0.png',
        './img/octopus1.png',
        './img/fbbkm.png',
    ];
    return arr[Math.floor(Math.random() * arr.length)];
}
