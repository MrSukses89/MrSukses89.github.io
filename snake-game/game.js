// Audio
const eatSound = document.getElementById("eatSound");
const crashSound = document.getElementById("crashSound");
const bodyCrashSound = document.getElementById("bodyCrashSound");
const purpleCrashSound = document.getElementById("purpleCrashSound");
const blueRockSound = document.getElementById("blueRockSound");
const yellowRockSound = document.getElementById("yellowRockSound");
const whiteRockSound = document.getElementById("whiteRockSound");
const backgroundMusic = document.getElementById("backgroundMusic");

// Volume Controls
const musicVolumeSlider = document.getElementById("musicVolumeSlider");
const effectVolumeSlider = document.getElementById("effectVolumeSlider");
const musicDown = document.getElementById("musicDown");
const musicUp = document.getElementById("musicUp");
const effectDown = document.getElementById("effectDown");
const effectUp = document.getElementById("effectUp");

backgroundMusic.volume = musicVolumeSlider.value;
eatSound.volume = effectVolumeSlider.value;
crashSound.volume = effectVolumeSlider.value;
bodyCrashSound.volume = effectVolumeSlider.value;
purpleCrashSound.volume = effectVolumeSlider.value;
blueRockSound.volume = effectVolumeSlider.value;
yellowRockSound.volume = effectVolumeSlider.value;
whiteRockSound.volume = effectVolumeSlider.value;

musicVolumeSlider.addEventListener("input", () => {
    backgroundMusic.volume = musicVolumeSlider.value;
});
effectVolumeSlider.addEventListener("input", () => {
    eatSound.volume = effectVolumeSlider.value;
    crashSound.volume = effectVolumeSlider.value;
    bodyCrashSound.volume = effectVolumeSlider.value;
    purpleCrashSound.volume = effectVolumeSlider.value;
    blueRockSound.volume = effectVolumeSlider.value;
    yellowRockSound.volume = effectVolumeSlider.value;
    whiteRockSound.volume = effectVolumeSlider.value;
});

musicUp.addEventListener("click", () => {
    musicVolumeSlider.value = Math.min(1, parseFloat(musicVolumeSlider.value) + 0.1);
    backgroundMusic.volume = musicVolumeSlider.value;
});
musicDown.addEventListener("click", () => {
    musicVolumeSlider.value = Math.max(0, parseFloat(musicVolumeSlider.value) - 0.1);
    backgroundMusic.volume = musicVolumeSlider.value;
});
effectUp.addEventListener("click", () => {
    effectVolumeSlider.value = Math.min(1, parseFloat(effectVolumeSlider.value) + 0.1);
    eatSound.volume = effectVolumeSlider.value;
    crashSound.volume = effectVolumeSlider.value;
    bodyCrashSound.volume = effectVolumeSlider.value;
    purpleCrashSound.volume = effectVolumeSlider.value;
    blueRockSound.volume = effectVolumeSlider.value;
    yellowRockSound.volume = effectVolumeSlider.value;
    whiteRockSound.volume = effectVolumeSlider.value;
});
effectDown.addEventListener("click", () => {
    effectVolumeSlider.value = Math.max(0, parseFloat(effectVolumeSlider.value) - 0.1);
    eatSound.volume = effectVolumeSlider.value;
    crashSound.volume = effectVolumeSlider.value;
    bodyCrashSound.volume = effectVolumeSlider.value;
    purpleCrashSound.volume = effectVolumeSlider.value;
    blueRockSound.volume = effectVolumeSlider.value;
    yellowRockSound.volume = effectVolumeSlider.value;
    whiteRockSound.volume = effectVolumeSlider.value;
});

// Fungsi untuk menampilkan petunjuk
function showHowToPlay() {
    document.getElementById("howToPlayText").style.display = "block";
    isPaused = true;
}

// Fungsi untuk menyembunyikan petunjuk
function hideHowToPlay() {
    document.getElementById("howToPlayText").style.display = "none";
    isPaused = false;
}

// Kode game Snake
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("scoreText");
const gridSize = 20;
const tileCountX = canvas.width / gridSize;
const tileCountY = canvas.height / gridSize;

// Posisi awal ular
let snake = [{ x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2) }];

// Posisi makanan
let food = { x: Math.floor(tileCountX / 2) + 5, y: Math.floor(tileCountY / 2) + 5 };

// Array untuk menyimpan posisi batu
let rocks = [];
let blueRocks = [];
let purpleRocks = [];
let yellowRocks = [];
let whiteRocks = [];

// Kecepatan ular (arah)
let dx = 0;
let dy = 0;

// Skor
let score = 0;

// Kecepatan game
let speed = 14;

// Status game
let gameOver = false;
let gameOverTimer = 2;
let isPaused = false;

// Status mute untuk musik
let isMusicMuted = false;

// Variabel untuk kedipan mata
let blinkTimer = 0;
let blinkInterval = 0.5;

// Variabel untuk kepala membesar saat makan
let headGrowTimer = 0;
let headGrowDuration = 1;
let headGrowActive = false;

// Variabel untuk kedipan makanan
let foodBlinkTimer = 0;
const foodBlinkInterval = 1;

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
            yellowRocks.some(yellow => yellow.x === rockX && yellow.y === rockY) ||
            whiteRocks.some(white => white.x === rockX && white.y === rockY)
        );
        rocks.push({ x: rockX, y: rockY });
    }
}

// Fungsi untuk spawn batu biru
// ... (kode sebelumnya tetap sama sampai fungsi spawn)

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
            yellowRocks.some(yellow => yellow.x === rockX && yellow.y === rockY) ||
            whiteRocks.some(white => white.x === rockX && white.y === rockY)
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
            yellowRocks.some(yellow => yellow.x === blueX && yellow.y === blueY) ||
            whiteRocks.some(white => white.x === blueX && white.y === blueY)
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
            yellowRocks.some(yellow => yellow.x === purpleX && yellow.y === purpleY) ||
            whiteRocks.some(white => white.x === purpleX && white.y === purpleY)
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
            purpleRocks.some(purple => purple.x === yellowX && purple.y === yellowY) ||
            whiteRocks.some(white => white.x === yellowX && white.y === yellowY)
        );
        yellowRocks.push({ x: yellowX, y: yellowY });
    }
}

// Fungsi untuk spawn batu putih
function spawnWhiteRocks(count) {
    whiteRocks = [];
    for (let i = 0; i < count; i++) {
        let whiteX, whiteY;
        do {
            whiteX = Math.floor(Math.random() * tileCountX);
            whiteY = Math.floor(Math.random() * tileCountY);
        } while (
            snake.some(segment => segment.x === whiteX && segment.y === whiteY) ||
            (food.x === whiteX && food.y === whiteY) ||
            rocks.some(rock => rock.x === whiteX && rock.y === whiteY) || // Diperbaiki dari rockY
            blueRocks.some(blue => blue.x === whiteX && blue.y === whiteY) ||
            purpleRocks.some(purple => purple.x === whiteX && purple.y === whiteY) ||
            yellowRocks.some(yellow => yellow.x === whiteX && yellow.y === whiteY)
        );
        whiteRocks.push({ x: whiteX, y: whiteY });
    }
}

// ... (kode setelahnya tetap sama)

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
            ctx.arc(x * gridSize + 5, y * gridSize + headSize - 2, eyeSize, 0, Math.PI * 2);
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
let lastTime = 0;
function gameLoop(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = (timestamp - lastTime) / (1000 / speed);

    if (deltaTime >= 1) {
        if (!gameOver && !isPaused) {
            updateSnake();
            if (!isMusicMuted && backgroundMusic.paused) {
                backgroundMusic.play().catch(err => console.log("Error playing background music:", err));
            }
        }
        lastTime = timestamp;
    }

    drawGame();
    if (gameOver) {
        gameOverTimer += 0.05;
        backgroundMusic.pause();
    }

    // Update timer
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
    foodBlinkTimer += 0.05;

    requestAnimationFrame(gameLoop);
}

// Update posisi ular
function updateSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (head.x < 0 || head.x >= tileCountX || head.y < 0 || head.y >= tileCountY) {
        gameOver = true;
        gameOverTimer = 0;
        if (crashSound) {
            crashSound.currentTime = 0;
            crashSound.play().catch(err => console.log("Error playing crash sound:", err));
        }
        setTimeout(resetGame, 2000);
        return;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            gameOverTimer = 0;
            if (bodyCrashSound) {
                bodyCrashSound.currentTime = 0;
                bodyCrashSound.play().catch(err => console.log("Error playing body crash sound:", err));
            }
            setTimeout(resetGame, 2000);
            return;
        }
    }

    for (let rock of rocks) {
        if (head.x === rock.x && head.y === rock.y) {
            gameOver = true;
            gameOverTimer = 0;
            if (crashSound) {
                crashSound.currentTime = 0;
                crashSound.play().catch(err => console.log("Error playing crash sound:", err));
            }
            setTimeout(resetGame, 2000);
            return;
        }
    }

    for (let i = 0; i < blueRocks.length; i++) {
        if (blueRocks[i] && head.x === blueRocks[i].x && head.y === blueRocks[i].y) {
            speed = 20;
            blueRocks.splice(i, 1);
            spawnBlueRocks(1);
            if (blueRockSound) {
                blueRockSound.currentTime = 0;
                blueRockSound.play().catch(err => console.log("Error playing blue rock sound:", err));
            }
            break;
        }
    }

    for (let i = 0; i < purpleRocks.length; i++) {
        if (purpleRocks[i] && head.x === purpleRocks[i].x && head.y === purpleRocks[i].y) {
            speed = 25;
            purpleRocks.splice(i, 1);
            spawnPurpleRocks(1);
            if (purpleCrashSound) {
                purpleCrashSound.currentTime = 0;
                purpleCrashSound.play().catch(err => console.log("Error playing purple crash sound:", err));
            }
            break;
        }
    }

    for (let i = 0; i < yellowRocks.length; i++) {
        if (yellowRocks[i] && head.x === yellowRocks[i].x && head.y === yellowRocks[i].y) {
            speed = 14;
            yellowRocks.splice(i, 1);
            spawnYellowRocks(1);
            if (yellowRockSound) {
                yellowRockSound.currentTime = 0;
                yellowRockSound.play().catch(err => console.log("Error playing yellow rock sound:", err));
            }
            break;
        }
    }

    for (let i = 0; i < whiteRocks.length; i++) {
        if (whiteRocks[i] && head.x === whiteRocks[i].x && head.y === whiteRocks[i].y) {
            if (snake.length > 1) {
                snake.pop();
            }
            whiteRocks.splice(i, 1);
            spawnWhiteRocks(1);
            if (whiteRockSound) {
                whiteRockSound.currentTime = 0;
                whiteRockSound.play().catch(err => console.log("Error playing white rock sound:", err));
            }
            break;
        }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreText.textContent = score;
        spawnFood();
        if (eatSound) {
            eatSound.currentTime = 0;
            eatSound.play().catch(err => console.log("Error playing eat sound:", err));
        }
        headGrowActive = true;
        headGrowTimer = headGrowDuration;
    } else {
        snake.pop();
    }
}

// Gambar game di canvas
// ... (kode sebelumnya tetap sama sampai fungsi drawGame)

// Gambar game di canvas
function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "gray";
    rocks.forEach(rock => {
        ctx.fillRect(rock.x * gridSize, rock.y * gridSize, gridSize - 2, gridSize - 2);
    });

    ctx.fillStyle = "blue";
    blueRocks.forEach(blue => {
        ctx.fillRect(blue.x * gridSize, blue.y * gridSize, gridSize - 2, gridSize - 2);
    });

    ctx.fillStyle = "purple";
    purpleRocks.forEach(purple => {
        ctx.beginPath();
        ctx.moveTo(purple.x * gridSize + gridSize / 2, purple.y * gridSize + 2);
        ctx.lineTo(purple.x * gridSize + 2, purple.y * gridSize + gridSize - 2);
        ctx.lineTo(purple.x * gridSize + gridSize - 2, purple.y * gridSize + gridSize - 2);
        ctx.closePath();
        ctx.fill();
    });

    ctx.fillStyle = "yellow";
    yellowRocks.forEach(yellow => {
        ctx.fillRect(yellow.x * gridSize, yellow.y * gridSize, gridSize - 2, gridSize - 2);
    });

    ctx.fillStyle = "white";
    whiteRocks.forEach(white => {
        ctx.beginPath();
        ctx.arc(
            white.x * gridSize + gridSize / 2,
            white.y * gridSize + gridSize / 2,
            10,
            0,
            Math.PI * 2
        );
        ctx.fill();
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
        const shouldShowFood = Math.sin(foodBlinkTimer * Math.PI / foodBlinkInterval) > 0;
        if (shouldShowFood) {
            ctx.beginPath();
            ctx.arc(
                food.x * gridSize + gridSize / 2,
                food.y * gridSize + gridSize / 2,
                10,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    }

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

// ... (kode setelahnya tetap sama)

// Spawn makanan
function spawnFood() {
    food.x = Math.floor(Math.random() * tileCountX);
    food.y = Math.floor(Math.random() * tileCountY);

    if (
        snake.some(segment => segment.x === food.x && segment.y === food.y) ||
        rocks.some(rock => rock.x === food.x && rock.y === rock.y) ||
        blueRocks.some(blue => blue.x === food.x && blue.y === food.y) ||
        purpleRocks.some(purple => purple.x === food.x && purple.y === food.y) ||
        yellowRocks.some(yellow => yellow.x === food.x && yellow.y === food.y) ||
        whiteRocks.some(white => white.x === food.x && white.y === food.y)
    ) {
        spawnFood();
    }
}

// Reset game
function resetGame() {
    snake = [{ x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2) }];
    dx = 0;
    dy = 0;
    score = 0;
    scoreText.textContent = score;
    gameOver = false;
    gameOverTimer = 5;
    headGrowActive = false;
    speed = 14;
    isPaused = false;
    spawnFood();
    spawnRocks(6);
    spawnBlueRocks(2);
    spawnPurpleRocks(2);
    spawnYellowRocks(2);
    spawnWhiteRocks(2);
    if (!isMusicMuted) {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play().catch(err => console.log("Error resetting music:", err));
    }
}

// Fungsi navigasi
function startGame() {
    if (gameOver) resetGame();
    isPaused = false;
    if (!isMusicMuted && backgroundMusic.paused) {
        backgroundMusic.play().catch(err => console.log("Error playing music on start:", err));
    }
}

function pauseGame() {
    if (!gameOver) {
        isPaused = !isPaused;
        if (isPaused && !isMusicMuted) {
            backgroundMusic.pause();
        } else if (!isPaused && !isMusicMuted) {
            backgroundMusic.play().catch(err => console.log("Error resuming music on unpause:", err));
        }
    }
}

function toggleMusic() {
    if (isMusicMuted) {
        backgroundMusic.play().catch(err => console.log("Error toggling music:", err));
        isMusicMuted = false;
    } else {
        backgroundMusic.pause();
        isMusicMuted = true;
    }
}

// Kontrol ular pake keyboard
document.addEventListener("keydown", function(event) {
    if (gameOver && event.key === "Enter") {
        resetGame();
    } else if (!gameOver && !isPaused) {
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
        toggleMusic();
    }
});

// Inisialisasi
spawnRocks(2);
spawnBlueRocks(2);
spawnPurpleRocks(2);
spawnYellowRocks(2);
spawnWhiteRocks(2);
backgroundMusic.volume = 0.5;

// Mulai game
requestAnimationFrame(gameLoop);