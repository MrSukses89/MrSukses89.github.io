const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bird = {
    x: 50,
    y: 150,
    width: 40,
    height: 30,
    gravity: 0.6,
    lift: -10,
    velocity: 0
};

const pipes = [];
const pipeWidth = 60;
const pipeGap = 100;
const pipeSpeed = 2;
let frame = 0;
let gameOver = false;
let score = 0;

function drawBird() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    ctx.fillStyle = "green";
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipeWidth, pipe.bottom);
    });
}

function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Cek tabrakan dengan tanah atau langit-langit
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        gameOver = true;
    }
}

function updatePipes() {
    if (frame % 90 === 0) {
        const top = Math.random() * (canvas.height - pipeGap - 100) + 50;
        pipes.push({ x: canvas.width, top: top, bottom: canvas.height - top - pipeGap });
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= pipeSpeed;

        // Cek tabrakan dengan pipa
        if (
            bird.x < pipes[i].x + pipeWidth &&
            bird.x + bird.width > pipes[i].x &&
            (bird.y < pipes[i].top || bird.y + bird.height > canvas.height - pipes[i].bottom)
        ) {
            gameOver = true;
        }

        // Hapus pipa yang sudah lewat
        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
            score++;
        }
    }
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over!", canvas.width / 2 - 80, canvas.height / 2);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBird();
    drawPipes();
    drawScore();

    updateBird();
    updatePipes();

    frame++;
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", () => {
    if (!gameOver) {
        bird.velocity = bird.lift;
    }
});

gameLoop();