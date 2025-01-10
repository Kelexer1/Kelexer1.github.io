const text = "Hows it going...<br>I'm Thomas";
const typingSpeed = 100;
let index = 0;

function typeEffect() {
    const typingDiv = document.getElementById("intro-text");
    const textArray = text.match(/(<[^>]+>|[^<])/g);

    if (index < textArray.length) {
        typingDiv.innerHTML += textArray[index];
        index++;
        setTimeout(typeEffect, typingSpeed)
    } else {
        typingDiv.classList.add("FinishedTyping");
    }
}

window.onload = typeEffect;