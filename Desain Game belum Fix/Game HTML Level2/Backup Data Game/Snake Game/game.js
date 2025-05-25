// Audio
const eatSound = document.getElementById("eatSound");
const crashSound = document.getElementById("crashSound");
const bodyCrashSound = document.getElementById("bodyCrashSound");
const purpleCrashSound = document.getElementById("purpleCrashSound");
const blueRockSound = document.getElementById("blueRockSound");
const yellowRockSound = document.getElementById("yellowRockSound");
const backgroundMusic = document.getElementById("backgroundMusic");

// Fungsi untuk menampilkan petunjuk
function showHowToPlay() {
    document.getElementById("howToPlayText").style.display = "block";
}

// Fungsi untuk menyembunyikan petunjuk
function hideHowToPlay() {
    document.getElementById("howToPlayText").style.display = "none";
}

// Kode game Snake lainnya tetap sama...
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const tileCountX = canvas.width / gridSize;
const tileCountY = canvas.height / gridSize;
// ... (kode lainnya)

// Posisi awal ular
let snake = [{ x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2) }];

// Posisi makanan
let food = { x: Math.floor(tileCountX / 2) + 5, y: Math.floor(tileCountY / 2) + 5 };

// Array untuk menyimpan posisi batu abu-abu, biru, ungu, dan kuning
let rocks = [];
let blueRocks = [];
let purpleRocks = [];
let yellowRocks = [];

// Kecepatan ular (arah)
let dx = 0;
let dy = 0;

// Skor
let score = 0;

// Kecepatan game
let speed = 14; // Kecepatan awal

// Status game
let gameOver = false;
let gameOverTimer = 2;

// Status mute untuk musik
let isMusicMuted = false;

// Variabel untuk kedipan mata
let blinkTimer = 0;
let blinkInterval = 0.5;

// Variabel untuk kepala membesar saat makan
let headGrowTimer = 0;
let headGrowDuration = 1;
let headGrowActive = false;

// Fungsi untuk spawn batu abu-abu
function spawnRocks(count) {
    rocks = [];
    for (let i = 0; i < count; i++) {
        let rockX, rockY;
        do {
            rockX = Math.floor(Math.random() * tileCountX);
            rockY = Math.floor(Math.random() * tileCountY);
        } while (
            snake.some(segment => segment.x === rockX && segment.y === rockY) ||
            (food.x === rockX && food.y === rockY) ||
            blueRocks.some(blue => blue.x === rockX && blue.y === rockY) ||
            purpleRocks.some(purple => purple.x === rockX && purple.y === rockY) ||
            yellowRocks.some(yellow => yellow.x === rockX && yellow.y === rockY)
        );
        rocks.push({ x: rockX, y: rockY });
    }
}

// Fungsi untuk spawn batu biru
function spawnBlueRocks(count) {
    blueRocks = [];
    for (let i = 0; i < count; i++) {
        let blueX, blueY;
        do {
            blueX = Math.floor(Math.random() * tileCountX);
            blueY = Math.floor(Math.random() * tileCountY);
        } while (
            snake.some(segment => segment.x === blueX && segment.y === blueY) ||
            (food.x === blueX && food.y === blueY) ||
            rocks.some(rock => rock.x === blueX && rock.y === blueY) ||
            purpleRocks.some(purple => purple.x === blueX && purple.y === blueY) ||
            yellowRocks.some(yellow => yellow.x === blueX && yellow.y === blueY)
        );
        blueRocks.push({ x: blueX, y: blueY });
    }
}

// Fungsi untuk spawn batu ungu
function spawnPurpleRocks(count) {
    purpleRocks = [];
    for (let i = 0; i < count; i++) {
        let purpleX, purpleY;
        do {
            purpleX = Math.floor(Math.random() * tileCountX);
            purpleY = Math.floor(Math.random() * tileCountY);
        } while (
            snake.some(segment => segment.x === purpleX && segment.y === purpleY) ||
            (food.x === purpleX && food.y === purpleY) ||
            rocks.some(rock => rock.x === purpleX && rock.y === purpleY) ||
            blueRocks.some(blue => blue.x === purpleX && blue.y === purpleY) ||
            yellowRocks.some(yellow => yellow.x === purpleX && purple.y === purpleY)
        );
        purpleRocks.push({ x: purpleX, y: purpleY });
    }
}

// Fungsi untuk spawn batu kuning
function spawnYellowRocks(count) {
    yellowRocks = [];
    for (let i = 0; i < count; i++) {
        let yellowX, yellowY;
        do {
            yellowX = Math.floor(Math.random() * tileCountX);
            yellowY = Math.floor(Math.random() * tileCountY);
        } while (
            snake.some(segment => segment.x === yellowX && segment.y === yellowY) ||
            (food.x === yellowX && food.y === yellowY) ||
            rocks.some(rock => rock.x === yellowX && rock.y === yellowY) ||
            blueRocks.some(blue => blue.x === yellowX && blue.y === yellowY) ||
            purpleRocks.some(purple => purple.x === yellowX && purple.y === purpleY)
        );
        yellowRocks.push({ x: yellowX, y: yellowY });
    }
}

// Fungsi untuk menggambar kepala ular
function drawSnakeHead(x, y, dx, dy) {
    ctx.fillStyle = "lime";
    ctx.beginPath();

    let headSize = gridSize - 2;
    if (headGrowActive) {
        headSize = gridSize + 3;
    }
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
    let eyeSize = 3;
    if (headGrowActive) {
        eyeSize = 3;
    }
    const shouldBlink = Math.sin(blinkTimer * Math.PI * 2 / blinkInterval) > 0;

    if (shouldBlink) {
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
}

// Fungsi untuk menggambar ekor ular
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
            backgroundMusic.play();
        }
    }
    drawGame();
    if (gameOver) {
        gameOverTimer += 0.05;
        backgroundMusic.pause();
    }
    // Update blinkTimer dan headGrowTimer setiap frame
    blinkTimer += 0.05;
    if (blinkTimer >= blinkInterval) {
        blinkTimer = 0;
    }
    if (headGrowActive) {
        headGrowTimer -= 0.05;
        if (headGrowTimer <= 0) {
            headGrowActive = false;
        }
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

    // Cek jika ular memakan batu biru
    for (let i = 0; i < blueRocks.length; i++) {
        if (head.x === blueRocks[i].x && head.y === blueRocks[i].y) {
            speed = 20;
            blueRocks.splice(i, 1);
            spawnBlueRocks(1);
            blueRockSound.currentTime = 0;
            blueRockSound.play();
            break;
        }
    }

    // Cek jika ular memakan batu ungu
    for (let i = 0; i < purpleRocks.length; i++) {
        if (head.x === purpleRocks[i].x && head.y === purpleRocks[i].y) {
            speed = 25;
            purpleRocks.splice(i, 1);
            spawnPurpleRocks(1);
            purpleCrashSound.currentTime = 0;
            purpleCrashSound.play();
            break;
        }
    }

    // Cek jika ular memakan batu kuning
    for (let i = 0; i < yellowRocks.length; i++) {
        if (head.x === yellowRocks[i].x && head.y === yellowRocks[i].y) {
            speed = 14;
            yellowRocks.splice(i, 1);
            spawnYellowRocks(1);
            yellowRockSound.currentTime = 0; // Suara khusus untuk batu kuning
            yellowRockSound.play();
            break;
        }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        spawnFood();
        eatSound.currentTime = 0;
        eatSound.play();
        headGrowActive = true;
        headGrowTimer = headGrowDuration;
    } else {
        snake.pop();
    }
}

// Gambar game di canvas
function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gambar batu abu-abu
    ctx.fillStyle = "gray";
    rocks.forEach(rock => {
        ctx.fillRect(rock.x * gridSize, rock.y * gridSize, gridSize - 2, gridSize - 2);
    });

    // Gambar batu biru
    ctx.fillStyle = "blue";
    blueRocks.forEach(blue => {
        ctx.fillRect(blue.x * gridSize, blue.y * gridSize, gridSize - 2, gridSize - 2);
    });

    // Gambar batu ungu
    ctx.fillStyle = "purple";
    purpleRocks.forEach(purple => {
        ctx.fillRect(purple.x * gridSize, purple.y * gridSize, gridSize - 2, gridSize - 2);
    });

    // Gambar batu kuning
    ctx.fillStyle = "yellow";
    yellowRocks.forEach(yellow => {
        ctx.fillRect(yellow.x * gridSize, yellow.y * gridSize, gridSize - 2, gridSize - 2);
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
        // Gambar makanan sebagai lingkaran merah
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(
            food.x * gridSize + gridSize / 2,
            food.y * gridSize + gridSize / 2,
            gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    ctx.fillStyle = "yellow";
    ctx.font = "16px Arial";
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

// Spawn makanan
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
    for (let blue of blueRocks) {
        if (food.x === blue.x && food.y === blue.y) {
            spawnFood();
            return;
        }
    }
    for (let purple of purpleRocks) {
        if (food.x === purple.x && food.y === purple.y) {
            spawnFood();
            return;
        }
    }
    for (let yellow of yellowRocks) {
        if (food.x === yellow.x && food.y === yellow.y) {
            spawnFood();
            return;
        }
    }
}

// Reset game
function resetGame() {
    snake = [{ x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2) }];
    dx = 0;
    dy = 0;
    score = 0;
    gameOver = false;
    gameOverTimer = 5;
    headGrowActive = false;
    speed = 14; // Reset kecepatan ke nilai awal
    spawnFood();
    spawnRocks(6);
    spawnBlueRocks(2);
    spawnPurpleRocks(2);
    spawnYellowRocks(2);
    if (!isMusicMuted) {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
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

// Inisialisasi
spawnRocks(2);
spawnBlueRocks(2);
spawnPurpleRocks(2);
spawnYellowRocks(2);
backgroundMusic.volume = 0.5;
if (!isMusicMuted) {
    backgroundMusic.play();
}

// Mulai game
gameLoop();