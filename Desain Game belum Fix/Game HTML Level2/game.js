//audio
const eatSound = document.getElementById("eatSound");
const crashSound = document.getElementById("crashSound");
const bodyCrashSound = document.getElementById("bodyCrashSound");
const backgroundMusic = document.getElementById("backgroundMusic");

// Ambil elemen canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ukuran grid dan tile
const gridSize = 20;
const tileCountX = canvas.width / gridSize;  // 1080 / 20 = 54 tile
const tileCountY = canvas.height / gridSize; // 600 / 20 = 30 tile

// Posisi awal ular (ditaruh di tengah canvas)
let snake = [{ x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2) }]; // Sekitar (27, 15)

// Posisi makanan
let food = { x: Math.floor(tileCountX / 2) + 5, y: Math.floor(tileCountY / 2) + 5 }; // Sekitar (32, 20)

// Array untuk menyimpan posisi batu
let rocks = [];

// Kecepatan ular (arah)
let dx = 0;
let dy = 0;

// Skor
let score = 0;

// Kecepatan game (frame per detik)
let speed = 15;

// Status game
let gameOver = false;
let gameOverTimer = 2; // Timer untuk animasi "Game Over"

// Status mute untuk musik
let isMusicMuted = false;

// Fungsi untuk spawn batu di posisi acak
function spawnRocks(count) {
    rocks = []; // Kosongkan array batu
    for (let i = 0; i < count; i++) {
        let rockX, rockY;
        do {
            rockX = Math.floor(Math.random() * tileCountX);
            rockY = Math.floor(Math.random() * tileCountY);
        } while (
            // Pastikan batu tidak spawn di posisi ular atau makanan
            snake.some(segment => segment.x === rockX && segment.y === rockY) ||
            (food.x === rockX && food.y === rockY)
        );
        rocks.push({ x: rockX, y: rockY });
    }
}

// Fungsi untuk menggambar kepala ular berbentuk segitiga
function drawSnakeHead(x, y, dx, dy) {
    ctx.fillStyle = "lime";
    ctx.beginPath();

    const headSize = gridSize - 2;
    const halfSize = headSize / 2;

    if (dx === 1) {
        ctx.moveTo(x * gridSize + headSize, y * gridSize + halfSize);
        ctx.lineTo(x * gridSize, y * gridSize);
        ctx.lineTo(x * gridSize, y * gridSize + headSize);
    } else if (dx === -1) {
        ctx.moveTo(x * gridSize, y * gridSize + halfSize);
        ctx.lineTo(x * gridSize + headSize, y * gridSize);
        ctx.lineTo(x * gridSize + headSize, y * gridSize + headSize);
    } else if (dy === 1) {
        ctx.moveTo(x * gridSize + halfSize, y * gridSize + headSize);
        ctx.lineTo(x * gridSize, y * gridSize);
        ctx.lineTo(x * gridSize + headSize, y * gridSize);
    } else if (dy === -1) {
        ctx.moveTo(x * gridSize + halfSize, y * gridSize);
        ctx.lineTo(x * gridSize, y * gridSize + headSize);
        ctx.lineTo(x * gridSize + headSize, y * gridSize + headSize);
    } else {
        ctx.fillRect(x * gridSize, y * gridSize, headSize, headSize);
        return;
    }

    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "red";
    const eyeSize = 3;
    if (dx === 1) {
        ctx.beginPath();
        ctx.arc(x * gridSize + headSize - 5, y * gridSize + 5, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x * gridSize + headSize - 5, y * gridSize + headSize - 5, eyeSize, 0, Math.PI * 2);
        ctx.fill();
    } else if (dx === -1) {
        ctx.beginPath();
        ctx.arc(x * gridSize + 5, y * gridSize + 5, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x * gridSize + 5, y * gridSize + headSize - 5, eyeSize, 0, Math.PI * 2);
        ctx.fill();
    } else if (dy === 1) {
        ctx.beginPath();
        ctx.arc(x * gridSize + 5, y * gridSize + headSize - 5, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x * gridSize + headSize - 5, y * gridSize + headSize - 5, eyeSize, 0, Math.PI * 2);
        ctx.fill();
    } else if (dy === -1) {
        ctx.beginPath();
        ctx.arc(x * gridSize + 5, y * gridSize + 5, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x * gridSize + headSize - 5, y * gridSize + 5, eyeSize, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Fungsi untuk menggambar ekor ular berbentuk segitiga lancip ke belakang
function drawSnakeTail(tailX, tailY, prevX, prevY) {
    ctx.fillStyle = "green";
    ctx.beginPath();

    const tailSize = gridSize - 2;
    const halfSize = tailSize / 2;

    const tailDx = tailX - prevX;
    const tailDy = tailY - prevY;

    if (tailDx === 1) {
        ctx.moveTo(tailX * gridSize, tailY * gridSize + halfSize);
        ctx.lineTo(tailX * gridSize + tailSize, tailY * gridSize);
        ctx.lineTo(tailX * gridSize + tailSize, tailY * gridSize + tailSize);
    } else if (tailDx === -1) {
        ctx.moveTo(tailX * gridSize + tailSize, tailY * gridSize + halfSize);
        ctx.lineTo(tailX * gridSize, tailY * gridSize);
        ctx.lineTo(tailX * gridSize, tailY * gridSize + tailSize);
    } else if (tailDy === 1) {
        ctx.moveTo(tailX * gridSize + halfSize, tailY * gridSize);
        ctx.lineTo(tailX * gridSize, tailY * gridSize + tailSize);
        ctx.lineTo(tailX * gridSize + tailSize, tailY * gridSize + tailSize);
    } else if (tailDy === -1) {
        ctx.moveTo(tailX * gridSize + halfSize, tailY * gridSize + tailSize);
        ctx.lineTo(tailX * gridSize, tailY * gridSize);
        ctx.lineTo(tailX * gridSize + tailSize, tailY * gridSize);
    } else {
        ctx.fillRect(tailX * gridSize, tailY * gridSize, tailSize, tailSize);
        return;
    }

    ctx.closePath();
    ctx.fill();
}

// Fungsi utama game loop
function gameLoop() {
    if (!gameOver) {
        updateSnake();
        if (!isMusicMuted && backgroundMusic.paused) {
            backgroundMusic.play(); // Mulai musik kalau game berjalan
        }
    }
    drawGame();
    if (gameOver) {
        gameOverTimer += 0.05;
        backgroundMusic.pause(); // Pause musik saat game over
    }
    setTimeout(gameLoop, 1000 / speed);
}

// Update posisi ular
function updateSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (head.x < 0 || head.x >= tileCountX || head.y < 0 || head.y >= tileCountY) {
        gameOver = true;
        gameOverTimer = 0;
        crashSound.currentTime = 0;
        crashSound.play();
        setTimeout(resetGame, 2000);
        return;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            gameOverTimer = 0;
            bodyCrashSound.currentTime = 0;
            bodyCrashSound.play();
            setTimeout(resetGame, 2000);
            return;
        }
    }

    for (let rock of rocks) {
        if (head.x === rock.x && head.y === rock.y) {
            gameOver = true;
            gameOverTimer = 0;
            crashSound.currentTime = 0;
            crashSound.play();
            setTimeout(resetGame, 2000);
            return;
        }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 5.5;
        spawnFood();
        eatSound.currentTime = 0;
        eatSound.play();
    } else {
        snake.pop();
    }
}

// Gambar game di canvas
function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "gray";
    rocks.forEach(rock => {
        ctx.fillRect(rock.x * gridSize, rock.y * gridSize, gridSize - 2, gridSize - 2);
    });

    snake.forEach((segment, index) => {
        if (index === 0) {
            drawSnakeHead(segment.x, segment.y, dx, dy);
        } else if (index === snake.length - 1 && snake.length > 1) {
            const prevSegment = snake[index - 1];
            drawSnakeTail(segment.x, segment.y, prevSegment.x, prevSegment.y);
        } else {
            ctx.fillStyle = "green";
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        }
    });

    if (!gameOver) {
        ctx.fillStyle = "red";
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    }
//score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Skor Anda: " + score, 20, 50);

    if (gameOver) {
        ctx.globalAlpha = Math.min(gameOverTimer, 2);
        const blink = Math.sin(gameOverTimer * 5) > 0 ? "red" : "darkred";
        ctx.font = "80px Arial";
        ctx.fillStyle = blink;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Ayo Main Lagi Gais!!", canvas.width / 2, canvas.height / 2 + 60);
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.globalAlpha = 1;
        ctx.textAlign = "start";
        ctx.textBaseline = "alphabetic";
    }
}

// Spawn makanan di posisi acak
function spawnFood() {
    food.x = Math.floor(Math.random() * tileCountX);
    food.y = Math.floor(Math.random() * tileCountY);

    for (let segment of snake) {
        if (food.x === segment.x && food.y === segment.y) {
            spawnFood();
            return;
        }
    }
    for (let rock of rocks) {
        if (food.x === rock.x && food.y === rock.y) {
            spawnFood();
            return;
        }
    }
}

// Reset game kalau kalah
function resetGame() {
    snake = [{ x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2) }];
    dx = 0;
    dy = 0;
    score = 0;
    gameOver = false;
    gameOverTimer = 5;
    spawnFood();
    spawnRocks(6);
    if (!isMusicMuted) {
        backgroundMusic.currentTime = 0; // Reset musik ke awal
        backgroundMusic.play(); // Mulai ulang musik
    }
}

// Kontrol ular pake keyboard
document.addEventListener("keydown", function(event) {
    if (gameOver && event.key === "Enter") {
        resetGame();
    } else if (!gameOver) {
        switch(event.key) {
            case "ArrowUp":
                if (dy !== 1) { dx = 0; dy = -1; }
                break;
            case "ArrowDown":
                if (dy !== -1) { dx = 0; dy = 1; }
                break;
            case "ArrowLeft":
                if (dx !== 1) { dx = -1; dy = 0; }
                break;
            case "ArrowRight":
                if (dx !== -1) { dx = 1; dy = 0; }
                break;
        }
    }

    // Kontrol mute/unmute musik dengan tombol 'M'
    if (event.key === "m" || event.key === "M") {
        if (isMusicMuted) {
            backgroundMusic.play();
            isMusicMuted = false;
        } else {
            backgroundMusic.pause();
            isMusicMuted = true;
        }
    }
});

// Spawn batu pertama kali saat game mulai
spawnRocks(1);

// Mulai musik saat game dimulai
backgroundMusic.volume = 0.5; // Volume musik (0.0 - 1.0)
if (!isMusicMuted) {
    backgroundMusic.play();
}

// Mulai game
gameLoop();