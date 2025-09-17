import {SPA} from "./spa.js";

const time = 5000

class UseCarousel {
    constructor(props) {
        this.props = props;
        this.index = 0;
        // Ð—Ð°Ð¿ÑƒÑÐºÐ°ÐµÐ¼ Ñ†Ð¸ÐºÐ» Ñ‚Ð¾Ð»ÑŒÐºÐ¾ ÐµÑÐ»Ð¸ ÐµÑÑ‚ÑŒ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ñ‹ Ð´Ð»Ñ ÐºÐ°Ñ€ÑƒÑÐµÐ»Ð¸
        if (document.querySelectorAll(this.props.selector).length > 0) {
            setTimeout(this.cycle.bind(this), this.props.time);
        }
    }

    cycle() {
        let arr = Array.from(document.querySelectorAll(this.props.selector));
        // Ð•ÑÐ»Ð¸ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð¾Ð² Ð¼ÐµÐ½ÑŒÑˆÐµ 2, ÐºÐ°Ñ€ÑƒÑÐµÐ»ÑŒ Ð½Ðµ Ð½ÑƒÐ¶Ð½Ð°
        if (arr.length < 2) {
            return;
        }

        let prev = this.index;
        let previous = arr[prev];

        this.index = this.index + 1 <= arr.length - 1 ? this.index + 1 : 0;
        let current = arr[this.index];

        previous.className = this.props.class_left;
        current.className = this.props.class_right;
        current.style.visibility = "visible";

        current.onanimationend = () => {
            previous.className = this.props.class_main;
            previous.style.visibility = "hidden";
            current.className = this.props.class_main;
            current.onanimationend = null;
            setTimeout(this.cycle.bind(this), this.props.time);
        }
    }
}


new UseCarousel({
    "selector": ".slides > img",
    "time": time,
    "class_right": "slide animated right",
    "class_left": "slide animated left",
    "class_main": "slide"
});


new UseCarousel({
    "selector": ".reviews-carousel-container > .review-card", // Ð¡ÐµÐ»ÐµÐºÑ‚Ð¾Ñ€ Ð´Ð»Ñ ÐºÐ°Ñ€Ñ‚Ð¾Ñ‡ÐµÐº Ð¾Ñ‚Ð·Ñ‹Ð²Ð¾Ð²
    "time": time * 1.8,
    "class_right": "review-card card review-animated right", // ÐšÐ»Ð°ÑÑÑ‹ Ð´Ð»Ñ Ð²Ñ…Ð¾Ð´ÑÑ‰ÐµÐ³Ð¾ Ð¾Ñ‚Ð·Ñ‹Ð²Ð°
    "class_left": "review-card card review-animated left",   // ÐšÐ»Ð°ÑÑÑ‹ Ð´Ð»Ñ ÑƒÑ…Ð¾Ð´ÑÑ‰ÐµÐ³Ð¾ Ð¾Ñ‚Ð·Ñ‹Ð²Ð°
    "class_main": "review-card card"                         // Ð‘Ð°Ð·Ð¾Ð²Ñ‹Ð¹ ÐºÐ»Ð°ÑÑ Ð´Ð»Ñ Ð¾Ñ‚Ð·Ñ‹Ð²Ð°
});


new SPA({
    select_buttons: document.querySelectorAll(".module2 .product"),
    tabs: document.querySelectorAll(".spa_tab"),
    active_tab: "cs2"
})


const taglineElement = document.getElementById('dynamic-tagline');
const slogans = [
    "Your favorite dlc provider you can trust.",
    "Lowest prices.",
    "Dominate your opponents, the easy way.",
    "Strong protection & Fast updates.",
    "Instant support, affordable prices."
];
const chars = "!<>-_\\/[]{}â€”=+*^?#________"; // Keep original chars

let currentSloganIndex = 0;
let charIndex = 0;
let isErasing = false;
let glitchInterval;
let typeInterval;
let cycleTimeout;

const eraseDelay = 15; // Slightly slower erase
const typeDelay = 25;  // Slightly slower type
const glitchDuration = 10;
const glitchCyclesPerChar = 3; // Fewer glitch cycles
const pauseBetweenSlogans = 3500; // Shorter pause

function getRandomChar() { return chars[Math.floor(Math.random() * chars.length)]; }

function typeEffect() {
    if (!taglineElement) return; // Exit if element not found
    const targetSlogan = slogans[currentSloganIndex];
    let currentText = targetSlogan.substring(0, charIndex);
    let glitchCount = 0;
    clearInterval(glitchInterval); clearInterval(typeInterval);

    function typeCharacter() {
        if (!taglineElement) return;
        if (charIndex >= targetSlogan.length) {
            clearTimeout(cycleTimeout);
            cycleTimeout = setTimeout(startErase, pauseBetweenSlogans);
            return;
        }
        glitchCount = 0; clearInterval(glitchInterval);
        glitchInterval = setInterval(() => {
            if (!taglineElement) { clearInterval(glitchInterval); return; }
            taglineElement.textContent = currentText + getRandomChar(); glitchCount++;
            if (glitchCount >= glitchCyclesPerChar) {
                clearInterval(glitchInterval);
                if (!taglineElement) return;
                taglineElement.textContent = currentText + targetSlogan[charIndex];
                charIndex++; currentText = targetSlogan.substring(0, charIndex);
                requestAnimationFrame ? requestAnimationFrame(() => setTimeout(typeCharacter, typeDelay)) : setTimeout(typeCharacter, typeDelay);
            }
        }, glitchDuration);
    }
    typeCharacter();
}

function eraseEffect() {
    if (!taglineElement) return;
    let currentText = taglineElement.textContent; clearInterval(typeInterval);
    typeInterval = setInterval(() => {
        if (!taglineElement) { clearInterval(typeInterval); return; }
        if (currentText.length > 0) {
            currentText = currentText.substring(0, currentText.length - 1);
            taglineElement.textContent = currentText + '_';
        } else {
            clearInterval(typeInterval);
            taglineElement.textContent = '_';
            isErasing = false; charIndex = 0;
            currentSloganIndex = (currentSloganIndex + 1) % slogans.length;
            clearTimeout(cycleTimeout);
            cycleTimeout = setTimeout(typeEffect, 300);
        }
    }, eraseDelay);
}

function startErase() {
    clearTimeout(cycleTimeout);
    clearInterval(glitchInterval);
    clearInterval(typeInterval);
    isErasing = true;
    eraseEffect();
}

if (taglineElement) {
    clearTimeout(cycleTimeout);
    clearInterval(glitchInterval);
    clearInterval(typeInterval);
    taglineElement.textContent = slogans[currentSloganIndex]; // Use currentSloganIndex here which is initially 0
    cycleTimeout = setTimeout(startErase, pauseBetweenSlogans);
}

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (!revealElements.length) return; // No elements to reveal

    const revealObserverOptions = {
        // root: null, // Use the viewport as the root
        // rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealObserverOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
