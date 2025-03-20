// const getrokkenNummerP = document.querySelector("#getrokkenNummerP");
// const trekNummerKnop = document.querySelector("#trekNummerKnop");
// let getrokkenNummerLijst = [];


const bingoGeluid = new Audio('bingo_audio.mp3');


// // function trekNummer() {
// //     let getrokkenNummer = Math.ceil(Math.random() * 50);
// //     getrokkenNummerP.textContent = "Getrokken nummer:" + getrokkenNummer;
// //     getrokkenNummerLijst.push(getrokkenNummer);
// //     console.log(getrokkenNummerLijst);
// // }



// // trekNummerKnop.addEventListener("click", trekNummer);



// // Pak de elementen uit de HTML
// let kaart = document.querySelector("#kaart");


// // Maak de bingo-kaart
// function maakKaart() {
//     for (let i = 0; i < 25; i++) {
//         let nummer = Math.floor(Math.random() * 60) + 1; // Genereer een nummer tussen 1 en 75
//         let vakje = document.createElement("div");
//         vakje.className = "bingo-cel";
//         vakje.innerText = nummer;

//         // Klik om te markeren
//         vakje.addEventListener("click", function() {
//             vakje.classList.add("marked");
//         });

//         kaart.appendChild(vakje);
//     }
// }


// // Start het spel
// maakKaart();





// AUDIO


// Controleer of het getrokken nummer op de kaart staat
// function nummerOpKaart(nummer) {
//     let cellen = document.querySelectorAll(".bingo-cel");
//     for (let cel of cellen) {
//         if (parseInt(cel.innerText) === nummer) {
//             return true; // Nummer is gevonden op de kaart
//         }
//     }
//     return false; // Nummer niet gevonden
// }

// // Trek een nummer en speel geluid als het op de kaart staat
// function trekNummer() {
//     let getrokkenNummer = Math.ceil(Math.random() * 50);
//     getrokkenNummerP.textContent = "Getrokken nummer: " + getrokkenNummer;
//     getrokkenNummerLijst.push(getrokkenNummer);
//     console.log(getrokkenNummerLijst);

//     // Controleer of het nummer op de kaart staat en speel geluid af
//     if (nummerOpKaart(getrokkenNummer)) {
//         bingoGeluid.play();
//     }
// }

// // Start het spel
// trekNummerKnop.addEventListener("click", trekNummer);






const getrokkenNummerP = document.querySelector("#getrokkenNummerP");
const trekNummerKnop = document.querySelector("#trekNummerKnop");
let getrokkenNummerLijst = [];
let gemarkeerdeVakjes = 0;

// Timer-instellingen
let resterendeTijd = 180; // 3 minuten in seconden
let timerElement = document.querySelector("#timer");

// Start het spel
function startSpel() {
    maakKaart();
    startTimer();
}

// Timer starten
function startTimer() {
    const timer = setInterval(() => {
        resterendeTijd--;
        timerElement.textContent = `Tijd: ${resterendeTijd} seconden`;

        // Stop timer en toon resultaat als de tijd op is
        if (resterendeTijd <= 0) {
            clearInterval(timer);
            alert(`Tijd is om! Je hebt ${gemarkeerdeVakjes} vakjes gemarkeerd.`);
        }
    }, 1000); // Elke seconde updaten
}

// Trek een nieuw nummer
function trekNummer() {
    let getrokkenNummer = Math.ceil(Math.random() * 60);
    getrokkenNummerP.textContent = "Getrokken nummer: " + getrokkenNummer;
    getrokkenNummerLijst.push(getrokkenNummer);
    controleerNummer(getrokkenNummer);
}

// Controleer of het getrokken nummer op de kaart staat
function controleerNummer(nummer) {
    let cellen = document.querySelectorAll(".bingo-cel");
    cellen.forEach(cel => {
        if (parseInt(cel.innerText) === nummer && !cel.classList.contains("marked")) {
            cel.addEventListener("click", function() {
                cel.classList.add("marked");
                gemarkeerdeVakjes++;
            }, { once: true }); // Zorgt ervoor dat je maar één keer kunt klikken
        }
    });
}

// Maak de bingo-kaart
function maakKaart() {
    let kaart = document.querySelector("#kaart");
    kaart.innerHTML = ""; // Leeg de kaart bij een nieuwe start

    for (let i = 0; i < 25; i++) {
        let nummer = Math.floor(Math.random() * 60) + 1;
        let vakje = document.createElement("div");
        vakje.className = "bingo-cel";
        vakje.innerText = nummer;
        vakje.addEventListener("click", function() {
            vakje.classList.add("marked");
        });

        kaart.appendChild(vakje);
    }
}
       
 

function nummerOpKaart(nummer) {
        let cellen = document.querySelectorAll(".bingo-cel");
        for (let cel of cellen) {
            if (parseInt(cel.innerText) === nummer) {
                return true; // Nummer is gevonden op de kaart
            }
        }
        return false; // Nummer niet gevonden
    }
    
    // Trek een nummer en speel geluid als het op de kaart staat
    function trekNummer() {
        let getrokkenNummer = Math.ceil(Math.random() * 50);
        getrokkenNummerP.textContent = "Getrokken nummer: " + getrokkenNummer;
        getrokkenNummerLijst.push(getrokkenNummer);
        console.log(getrokkenNummerLijst);
    
        // Controleer of het nummer op de kaart staat en speel geluid af
        if (nummerOpKaart(getrokkenNummer)) {
            bingoGeluid.play();
        }
    }

// Event listener om te starten met nummer trekken
trekNummerKnop.addEventListener("click", trekNummer);

// Start het spel
startSpel();
