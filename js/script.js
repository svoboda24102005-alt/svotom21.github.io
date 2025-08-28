
let cenaPokoj = 0;


function vybratPokoj(nazev, cena) {
    document.getElementById("roomSelect").value = nazev;
    cenaPokoj = cena;
    let option = document.querySelector('option[value="'+nazev+'"]');
    let sleva = option.getAttribute("data-sleva");
    let slevaExistuje = false;
    if (sleva !== null) {
        slevaExistuje = true;
    
    }
    prepocitatCenu(slevaExistuje);
    document.getElementById("reservation").scrollIntoView({behavior: "smooth"});
}

// --- Zmena vyberu pokoje   ---
document.getElementById("roomSelect").addEventListener("change", function() {
    let cena = this.options[this.selectedIndex].getAttribute("data-price");
    cenaPokoj = cena ? parseInt(cena) : 0;
    let option = this.options[this.selectedIndex];
    let sleva = option.getAttribute("data-sleva");
    let slevaExistuje = false;
    if (sleva !== null) {
        slevaExistuje = true;
    
    }
    prepocitatCenu(slevaExistuje);
    
});


document.getElementById("nights").addEventListener("input", function(e) {
    let option = document.querySelector('#roomSelect option:checked');
    let sleva = option.getAttribute("data-sleva");
    let slevaExistuje = false;
    if (sleva !== null) {
        slevaExistuje = true;
        
    }
    prepocitatCenu(slevaExistuje); // zavoláš s vlastním parametrem
});

// --- pocitani ceny pri zmene noci ---



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




// vypocet ceny se slevou
function prepocitatCenu(slevaAktivni) {
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



