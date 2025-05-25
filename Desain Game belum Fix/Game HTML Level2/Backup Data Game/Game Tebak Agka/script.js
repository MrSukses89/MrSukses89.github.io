// Variabel global game
let angkaRahasia;
let jumlahTebakan;
let borderColor = "green";

// Elemen DOM
const tebakanInput = document.getElementById("tebakan");
const cekButton = document.getElementById("cek");
const pesan = document.getElementById("pesan");
const jumlahTebakanDisplay = document.getElementById("jumlahTebakan");
const mainLagiButton = document.getElementById("mainLagi");
const backgroundMusic = document.getElementById("backgroundMusic");
const wrongSound = document.getElementById("wrongSound");
const winSound = document.getElementById("winSound");
const startYesButton = document.getElementById("startYesButton");
const startNoButton = document.getElementById("startNoButton");
const startOptions = document.getElementById("startOptions");
const canvasContainer = document.querySelector(".canvas-container");

// Variabel kontrol musik
let isMusicMuted = false;

// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variabel animasi bingkai
let startTime = null;
const cycleDuration = 5000;

// Inisialisasi partikel
particlesJS("particles-js", {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: "#888888" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: false },
        move: { enable: true, speed: 2, direction: "none", random: true, out_mode: "out" }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }
    }
});

// Fungsi mulai game
function mulaiGame() {
    angkaRahasia = Math.floor(Math.random() * 100) + 1;
    jumlahTebakan = 0;
    tebakanInput.value = "";
    pesan.innerHTML = "";
    pesan.classList.remove("win-message");
    pesan.classList.remove("error-message");
    pesan.classList.remove("shake");
    jumlahTebakanDisplay.textContent = "";
    cekButton.disabled = false;
    mainLagiButton.style.display = "none";
    tebakanInput.focus();
    borderColor = "green";

    // Berhentiin suara kemenangan
    winSound.pause();
    winSound.currentTime = 0;

    // Lanjutkan musik latar kalau nggak muted
    if (!isMusicMuted && backgroundMusic.paused) {
        backgroundMusic.play()
            .then(() => console.log("Musik dilanjutkan"))
            .catch(err => console.log("Gagal melanjutkan musik:", err));
    }
}

// Fungsi cek tebakan (tetap sama, fade udah di CSS)
function cekTebakan() {
    const tebakan = tebakanInput.value.trim();

    if (tebakan === "" || isNaN(tebakan)) {
        pesan.innerHTML = "Masukkan tebakan dulu!";
        pesan.classList.add("error-message");
        pesan.classList.remove("win-message");
        pesan.classList.add("shake");
        wrongSound.currentTime = 0;
        wrongSound.play()
            .then(() => console.log("Suara salah diputar"))
            .catch(err => console.log("Gagal memutar suara salah:", err));
        borderColor = "red";
        setTimeout(() => pesan.classList.remove("shake"), 500);
        return;
    }

    const tebakanAngka = parseInt(tebakan);
    jumlahTebakan++;

    if (tebakanAngka < angkaRahasia) {
        pesan.textContent = "Terlalu kecil! Coba lagi.";
        pesan.classList.remove("error-message");
        pesan.classList.remove("win-message");
        pesan.classList.add("shake");
        wrongSound.currentTime = 0;
        wrongSound.play()
            .then(() => console.log("Suara salah diputar"))
            .catch(err => console.log("Gagal memutar suara salah:", err));
        borderColor = Math.abs(tebakanAngka - angkaRahasia) <= 10 ? "yellow" : "red";
        setTimeout(() => pesan.classList.remove("shake"), 500);
    } else if (tebakanAngka > angkaRahasia) {
        pesan.textContent = "Terlalu besar! Coba lagi.";
        pesan.classList.remove("error-message");
        pesan.classList.remove("win-message");
        pesan.classList.add("shake");
        wrongSound.currentTime = 0;
        wrongSound.play()
            .then(() => console.log("Suara salah diputar"))
            .catch(err => console.log("Gagal memutar suara salah:", err));
        borderColor = Math.abs(tebakanAngka - angkaRahasia) <= 10 ? "yellow" : "red";
        setTimeout(() => pesan.classList.remove("shake"), 500);
    } else {
        pesan.innerHTML = '<span class="highlight">Selamat!</span><br>Anda telah berhasil menebak angka ' + angkaRahasia + ' dalam ' + jumlahTebakan + ' tebakan!';
        pesan.classList.add("win-message");
        pesan.classList.remove("error-message");
        cekButton.disabled = true;
        mainLagiButton.style.display = "block";
        backgroundMusic.pause();
        winSound.currentTime = 0;
        winSound.play()
            .then(() => console.log("Suara menang diputar"))
            .catch(err => console.log("Gagal memutar suara menang:", err));
        borderColor = "green";
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    jumlahTebakanDisplay.textContent = `Jumlah tebakan: ${jumlahTebakan}`;
    tebakanInput.value = "";
}

// Fungsi gambar bingkai
function drawBorder(blurRadius) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = blurRadius;
    ctx.beginPath();
    ctx.rect(20, 20, canvas.width - 40, canvas.height - 40);
    ctx.stroke();
}

// Fungsi animasi bingkai
function animate(timestamp) {
    if (!startTime) startTime = timestamp;

    const elapsed = timestamp - startTime;
    const progress = (elapsed % cycleDuration) / cycleDuration;
    const blurRadius = 9.8 + 4.9 * Math.sin(progress * 2 * Math.PI);

    drawBorder(blurRadius);
    requestAnimationFrame(animate);
}

// Event listener
cekButton.addEventListener("click", cekTebakan);

tebakanInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        if (cekButton.disabled) {
            mulaiGame();
        } else {
            cekTebakan();
        }
    }
});

mainLagiButton.addEventListener("click", mulaiGame);

// Kontrol musik dengan tombol "M"
document.addEventListener("keyup", function(event) {
    if (event.key === "m" || event.key === "M") {
        if (isMusicMuted) {
            backgroundMusic.play()
                .then(() => console.log("Musik unmute"))
                .catch(err => console.log("Gagal unmute musik:", err));
            isMusicMuted = false;
        } else {
            backgroundMusic.pause();
            console.log("Musik dimute");
            isMusicMuted = true;
        }
    }
});

// Tombol Start Yes (dengan musik)
startYesButton.addEventListener("click", function() {
    startOptions.style.display = "none";
    canvasContainer.style.display = "block";
    if (!isMusicMuted) {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play()
            .then(() => console.log("Musik mulai diputar"))
            .catch(err => console.log("Gagal memutar musik:", err));
    }
    mulaiGame();
    requestAnimationFrame(animate);
});

// Tombol Start No (tanpa musik)
startNoButton.addEventListener("click", function() {
    startOptions.style.display = "none";
    canvasContainer.style.display = "block";
    isMusicMuted = true;
    backgroundMusic.pause();
    console.log("Game mulai tanpa musik");
    mulaiGame();
    requestAnimationFrame(animate);
});

// Set volume audio
backgroundMusic.volume = 0.5;
wrongSound.volume = 0.7;
winSound.volume = 0.7;