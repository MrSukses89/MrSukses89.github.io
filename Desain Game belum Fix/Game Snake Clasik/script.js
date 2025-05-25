// Elemen DOM
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const gameOverDisplay = document.getElementById("gameOver");
const startYesButton = document.getElementById("startYesButton");
const startNoButton = document.getElementById("startNoButton");
const startOptions = document.getElementById("startOptions");
const canvasContainer = document.querySelector(".canvas-container");
const backgroundMusic = document.getElementById("backgroundMusic");
const eatSound = document.getElementById("eatSound");
const gameOverSound = document.getElementById("gameOverSound");

// Variabel game
let snake = [{ x: 10, y: 10 }]; // Posisi awal ular
let food = { x: 0, y: 0 };
let dx = 1; // Arah default: kanan
let dy = 0;
let score = 0;
let gridSize = 20; // Ukuran kotak
let isMusicMuted = false;
let gameLoop;

// Fungsi mulai game
function startGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 1;
    dy = 0;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    gameOverDisplay.style.display = "none";
    spawnFood();

    // Lanjutkan musik kalau nggak muted dan udah pause
    if (!isMusicMuted && backgroundMusic.paused) {
        backgroundMusic.play()
            .then(() => console.log("Musik dilanjutkan"))
            .catch(err => console.log("Gagal melanjutkan musik:", err));
    }

    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(update, 100); // Update tiap 100ms
}

// Fungsi spawn makanan
function spawnFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize));
    food.y = Math.floor(Math.random() * (canvas.height / gridSize));
    // Pastiin makanan nggak spawn di badan ular
    snake.forEach(segment => {
        if (segment.x === food.x && segment.y === food.y) {
            spawnFood();
        }
    });
}

// Fungsi gambar game
function draw() {
    // Bersihin canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar ular
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });

    // Gambar makanan
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

// Fungsi update game
function update() {
    // Pindah ular
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Cek nabrak dinding
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        gameOver();
        return;
    }

    // Cek nabrak badan
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    // Tambah kepala
    snake.unshift(head);

    // Cek makan makanan
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
        spawnFood();
        eatSound.currentTime = 0;
        eatSound.play()
            .then(() => console.log("Suara makan diputar"))
            .catch(err => console.log("Gagal memutar suara makan:", err));
    } else {
        snake.pop(); // Hapus ekor kalau nggak makan
    }

    draw();
}

// Fungsi game over
function gameOver() {
    clearInterval(gameLoop);
    gameOverDisplay.style.display = "block";
    backgroundMusic.pause();
    gameOverSound.currentTime = 0;
    gameOverSound.play()
        .then(() => console.log("Suara game over diputar"))
        .catch(err => console.log("Gagal memutar suara game over:", err));
}

// Kontrol keyboard
document.addEventListener("keydown", function(event) {
    switch (event.key) {
        case "ArrowUp":
            if (dy === 0) { dx = 0; dy = -1; }
            break;
        case "ArrowDown":
            if (dy === 0) { dx = 0; dy = 1; }
            break;
        case "ArrowLeft":
            if (dx === 0) { dx = -1; dy = 0; }
            break;
        case "ArrowRight":
            if (dx === 0) { dx = 1; dy = 0; }
            break;
        case "Enter":
            if (gameOverDisplay.style.display === "block") {
                startGame();
            }
            break;
        case "m":
        case "M":
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
            break;
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
    startGame();
});

// Tombol Start No (tanpa musik)
startNoButton.addEventListener("click", function() {
    startOptions.style.display = "none";
    canvasContainer.style.display = "block";
    isMusicMuted = true;
    backgroundMusic.pause();
    console.log("Game mulai tanpa musik");
    startGame();
});

// Set volume audio
backgroundMusic.volume = 0.5;
eatSound.volume = 0.7;
gameOverSound.volume = 0.7;