
let cenaPokoj = 0;


function vybratPokoj(nazev, cena) {
    document.getElementById("roomSelect").value = nazev;
    cenaPokoj = cena;
    prepocitatCenu();
    document.getElementById("reservation").scrollIntoView({behavior: "smooth"});
}

// --- Zmena vyberu pokoje   ---
document.getElementById("roomSelect").addEventListener("change", function() {
    let cena = this.options[this.selectedIndex].getAttribute("data-price");
    cenaPokoj = cena ? parseInt(cena) : 0;
    prepocitatCenu();
});


document.getElementById("nights").addEventListener("input", prepocitatCenu);

// --- pocitani ceny pri zmene noci ---
function prepocitatCenu() {
    let noci = parseInt(document.getElementById("nights").value) || 1;
    let soucet = cenaPokoj * noci;
    document.getElementById("totalPrice").innerText = "Celková cena: " + soucet + " Kč";
}


document.getElementById("reservationForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let data = new FormData(this);
    data.append("price", cenaPokoj);

    // preposlani na php
    fetch("reservation.php", {
        method: "POST",
        body: data
    })
    .then(r => r.text())
    .then(msg => {
        document.getElementById("modalMessage").textContent = msg;
        document.getElementById("confirmationModal").style.display = "flex";
    })
    .catch(() => {
        document.getElementById("modalMessage").textContent = "Nastala chyba při odeslání.";
        document.getElementById("confirmationModal").style.display = "flex";
    });

    this.reset();
    document.getElementById("totalPrice").textContent = "Celková cena: 0 Kč";
    cenaPokoj = 0;
});

function closeModal() {
    document.getElementById("confirmationModal").style.display = "none";
}


let faqBtns = document.querySelectorAll(".faq-question");
faqBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        let odpoved = btn.nextElementSibling;
        if (odpoved.style.display === "block") {
            odpoved.style.display = "none";
        } else {
            odpoved.style.display = "block";
        }
    });
});

// --- karusel na premium pokoje ---
let track = document.querySelector(".carousel-track");
if(track){
    let slides = track.children;
    let index = 0;

    function posun(smer){
        index += smer;
        if(index < 0) index = slides.length - 1;
        if(index >= slides.length) index = 0;
        track.style.transform = "translateX(-" + (index*100) + "%)";
    }

    let prev = document.querySelector(".prev");
    let next = document.querySelector(".next");
    if(prev && next){
        prev.addEventListener("click", () => posun(-1));
        next.addEventListener("click", () => posun(1));
    }
}


let countdown = document.getElementById("countdown");
let slevaAktivni = true; 

if(countdown){
    let konec = new Date().getTime() + 7*24*60*60*1000; // +7 dní

    function odpocti(){
        let ted = new Date().getTime();
        let rozdil = konec - ted;

        if(rozdil <= 0){
            countdown.textContent = "Sleva skončila!";
            slevaAktivni = false;       
            prepocitatCenu();           
            return;
        }

        let d = Math.floor(rozdil/(1000*60*60*24));
        let h = Math.floor((rozdil%(1000*60*60*24))/(1000*60*60));
        let m = Math.floor((rozdil%(1000*60*60))/(1000*60));
        let s = Math.floor((rozdil%(1000*60))/1000);

        countdown.textContent = "Sleva končí za " + d+"d " + h+"h " + m+"m " + s+"s";
    }

    odpocti();
    setInterval(odpocti, 1000);
}

// vypocet ceny se slevou
function prepocitatCenu() {
    let noci = parseInt(document.getElementById("nights").value) || 1;
    let soucet = cenaPokoj * noci;

    if (slevaAktivni) {
        let sleva = 0.2; // 20% sleva
        let cenaPoSleve = Math.floor(soucet * (1 - sleva));
        document.getElementById("totalPrice").innerHTML =
            "Celková cena: <s>" + soucet + " Kč</s> " + cenaPoSleve + " Kč";
    } else {
        document.getElementById("totalPrice").textContent =
            "Celková cena: " + soucet + " Kč";
    }
}


document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", function(e){
        e.preventDefault();
        let cil = document.querySelector(this.getAttribute("href"));
        if(cil) cil.scrollIntoView({behavior: "smooth"});
    });
});


// hambrugr na mobil
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// po kliknutí na odkaz v menu se menu schová
document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});