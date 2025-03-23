const bingoGeluid = new Audio('bingo_audio.mp3');
const getrokkenNummerP = document.querySelector("#getrokkenNummerP");
const trekNummerKnop = document.querySelector("#trekNummerKnop");
const timerElement = document.querySelector("#timer");

let getrokkenNummerLijst = [];
let gemarkeerdeVakjes = 0;
let resterendeTijd = 120;


// Start het spel
function startSpel() {
    maakKaart();
    startTimer();
}


// Bingo kaart maken
function maakKaart() {
    let kaart = document.querySelector("#kaart");

    for (let i = 0; i < 25; i++) {
        let nummer = Math.ceil(Math.random() * 60) + 1;
        let vakje = document.createElement("div");
        vakje.className = "vakje";
        vakje.innerText = nummer;

        kaart.appendChild(vakje);
    }
}


// Timer starten
function startTimer() {
    const timer = setInterval(() => {
        resterendeTijd--;
        timerElement.textContent = `Tijd: ${resterendeTijd} seconden`;

        // Stop timer en toon een melding
        if (resterendeTijd <= 0) {
            clearInterval(timer);
            // https://www.w3schools.com/jsref/met_win_alert.asp
            alert(`Tijd is om! Je hebt ${gemarkeerdeVakjes} vakjes gemarkeerd.`);
        }
    }, 1000); // Elke seconde updaten
}



// BRON: ChatGPT , Prompt: hoe kan ik controleren of de getrokken nummer op de kaart staat? 

// Controleer of het getrokken nummer op de kaart staat
function nummerOpKaart(nummer) {
    let vakjes = document.querySelectorAll(".vakje");
    for (let vakje of vakjes) {
        if (parseInt(vakje.innerText) === nummer) {
            return true; // Nummer is gevonden op de kaart
        }
    }
    return false; // Nummer niet gevonden
}


// Een nummer trekken en alleen getrokken nummer is klikbaar
function trekNummer() {
    let getrokkenNummer = Math.ceil(Math.random() * 60);
    getrokkenNummerP.textContent = "Getrokken nummer: " + getrokkenNummer;
    getrokkenNummerLijst.push(getrokkenNummer);
    maakNummerKlikbaar(getrokkenNummer);
    if (nummerOpKaart(getrokkenNummer)) {
        bingoGeluid.play();
        // https://www.w3schools.com/jsref/met_audio_play.asp
    }
}

function maakNummerKlikbaar(nummer) {
    let vakjes = document.querySelectorAll(".vakje");
    

    // Getrokken nummer zoeken en klikbaar maken
    vakjes = document.querySelectorAll(".vakje");
    vakjes.forEach(vakje => {
        if (parseInt(vakje.innerText) === nummer) {
            vakje.addEventListener("click", () => {
                vakje.style.backgroundColor = "lightgreen";
                gemarkeerdeVakjes++;
            }, { once: true });
        }
    });
}

trekNummerKnop.addEventListener("click", trekNummer);

startSpel();