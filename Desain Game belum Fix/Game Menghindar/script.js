const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const skorDisplay = document.getElementById("skor");

const karakter = {
    x: 50,
    y: canvas.height / 2,
    lebar: 20,
    tinggi: 20,
    kecepatan: 5,
    arah: "kanan" // Arah awal pesawat
};

const rintangan = {
    x: canvas.width,
    y: Math.random() * (canvas.height - 20),
    lebar: 20,
    tinggi: 20,
    kecepatan: 3
};

let skor = 0;
let tombolAtas = false;
let tombolBawah = false;
let tombolKiri = false;
let tombolKanan = false;

function gambarKarakter() {
    ctx.fillStyle = "red";
    ctx.beginPath();

    if (karakter.arah === "kanan") {
        // Badan pesawat menghadap kanan
        ctx.moveTo(karakter.x, karakter.y + karakter.tinggi / 2); // Kiri tengah
        ctx.lineTo(karakter.x + karakter.lebar, karakter.y); // Kanan atas
        ctx.lineTo(karakter.x + karakter.lebar, karakter.y + karakter.tinggi); // Kanan bawah
        ctx.closePath();
        ctx.fill();
        // Sayap
        ctx.fillRect(karakter.x + karakter.lebar / 2, karakter.y - 5, 10, 5); // Atas
        ctx.fillRect(karakter.x + karakter.lebar / 2, karakter.y + karakter.tinggi, 10, 5); // Bawah
    } else if (karakter.arah === "kiri") {
        // Badan pesawat menghadap kiri
        ctx.moveTo(karakter.x + karakter.lebar, karakter.y + karakter.tinggi / 2); // Kanan tengah
        ctx.lineTo(karakter.x, karakter.y); // Kiri atas
        ctx.lineTo(karakter.x, karakter.y + karakter.tinggi); // Kiri bawah
        ctx.closePath();
        ctx.fill();
        // Sayap
        ctx.fillRect(karakter.x + karakter.lebar / 2 - 10, karakter.y - 5, 10, 5); // Atas
        ctx.fillRect(karakter.x + karakter.lebar / 2 - 10, karakter.y + karakter.tinggi, 10, 5); // Bawah
    } else if (karakter.arah === "atas") {
        // Badan pesawat menghadap atas
        ctx.moveTo(karakter.x + karakter.lebar / 2, karakter.y); // Tengah atas
        ctx.lineTo(karakter.x, karakter.y + karakter.tinggi); // Kiri bawah
        ctx.lineTo(karakter.x + karakter.lebar, karakter.y + karakter.tinggi); // Kanan bawah
        ctx.closePath();
        ctx.fill();
        // Sayap
        ctx.fillRect(karakter.x - 5, karakter.y + karakter.tinggi / 2, 5, 10); // Kiri
        ctx.fillRect(karakter.x + karakter.lebar, karakter.y + karakter.tinggi / 2, 5, 10); // Kanan
    } else if (karakter.arah === "bawah") {
        // Badan pesawat menghadap bawah
        ctx.moveTo(karakter.x + karakter.lebar / 2, karakter.y + karakter.tinggi); // Tengah bawah
        ctx.lineTo(karakter.x, karakter.y); // Kiri atas
        ctx.lineTo(karakter.x + karakter.lebar, karakter.y); // Kanan atas
        ctx.closePath();
        ctx.fill();
        // Sayap
        ctx.fillRect(karakter.x - 5, karakter.y + karakter.tinggi / 2 - 10, 5, 10); // Kiri
        ctx.fillRect(karakter.x + karakter.lebar, karakter.y + karakter.tinggi / 2 - 10, 5, 10); // Kanan
    }
}

function gambarRintangan() {
    ctx.fillStyle = "black";
    ctx.fillRect(rintangan.x, rintangan.y, rintangan.lebar, rintangan.tinggi);
}

function perbaruiGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Perbarui posisi karakter
    if (tombolAtas && karakter.y > 0) {
        karakter.y -= karakter.kecepatan;
        karakter.arah = "atas"; // Ubah arah ke atas
    }
    if (tombolBawah && karakter.y < canvas.height - karakter.tinggi) {
        karakter.y += karakter.kecepatan;
        karakter.arah = "bawah"; // Ubah arah ke bawah
    }
    if (tombolKiri && karakter.x > 0) {
        karakter.x -= karakter.kecepatan;
        karakter.arah = "kiri"; // Ubah arah ke kiri
    }
    if (tombolKanan && karakter.x < canvas.width - karakter.lebar) {
        karakter.x += karakter.kecepatan;
        karakter.arah = "kanan"; // Ubah arah ke kanan
    }

    // Perbarui posisi rintangan
    rintangan.x -= rintangan.kecepatan;
    if (rintangan.x < -rintangan.lebar) {
        rintangan.x = canvas.width;
        rintangan.y = Math.random() * (canvas.height - rintangan.tinggi);
        skor++;
        skorDisplay.textContent = skor;
    }

    // Cek tabrakan
    if (
        karakter.x < rintangan.x + rintangan.lebar &&
        karakter.x + karakter.lebar > rintangan.x &&
        karakter.y < rintangan.y + rintangan.tinggi &&
        karakter.y + karakter.tinggi > rintangan.y
    ) {
        alert("Game Over! Skor Anda: " + skor);
        skor = 0;
        skorDisplay.textContent = skor;
        karakter.x = 50;
        karakter.y = canvas.height / 2;
        karakter.arah = "kanan"; // Reset arah ke kanan
        rintangan.x = canvas.width;
    }

    gambarKarakter();
    gambarRintangan();
    requestAnimationFrame(perbaruiGame);
}

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") {
        tombolAtas = true;
    } else if (event.key === "ArrowDown") {
        tombolBawah = true;
    } else if (event.key === "ArrowLeft") {
        tombolKiri = true;
    } else if (event.key === "ArrowRight") {
        tombolKanan = true;
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowUp") {
        tombolAtas = false;
    } else if (event.key === "ArrowDown") {
        tombolBawah = false;
    } else if (event.key === "ArrowLeft") {
        tombolKiri = false;
    } else if (event.key === "ArrowRight") {
        tombolKanan = false;
    }
});

perbaruiGame();