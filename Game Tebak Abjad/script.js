document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const tebakanInput = document.getElementById('tebakan');
    const cekButton = document.getElementById('cek');
    const pesan = document.getElementById('pesan');
    const jumlahTebakan = document.getElementById('jumlahTebakan');
    const mainLagiButton = document.getElementById('mainLagi');
    const titleButton = document.getElementById('titleButton');
    const canvasContainer = document.querySelector('.canvas-container');
    const startOptions = document.getElementById('startOptions');
    const startYesButton = document.getElementById('startYesButton');
    const startNoButton = document.getElementById('startNoButton');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const wrongSound = document.getElementById('wrongSound');
    const winSound = document.getElementById('winSound');

    let targetHuruf;
    let tebakanKe = 0;
    let gameSelesai = false;

    // Inisialisasi particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // Fungsi untuk memilih huruf acak (A-Z)
    function pilihHurufAcak() {
        const huruf = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return huruf[Math.floor(Math.random() * huruf.length)];
    }

    // Fungsi untuk memulai game
    function mulaiGame() {
        targetHuruf = pilihHurufAcak();
        tebakanKe = 0;
        gameSelesai = false;
        tebakanInput.value = '';
        pesan.textContent = '';
        jumlahTebakan.textContent = 'Jumlah tebakan: 0';
        mainLagiButton.style.display = 'none';
        tebakanInput.disabled = false;
        cekButton.disabled = false;
        canvasContainer.style.display = 'block';
        startOptions.style.display = 'none';
    }

    // Event listener untuk tombol Yes (dengan musik)
    startYesButton.addEventListener('click', () => {
        backgroundMusic.play();
        mulaiGame();
    });

    // Event listener untuk tombol No (tanpa musik)
    startNoButton.addEventListener('click', () => {
        mulaiGame();
    });

    // Event listener untuk tombol cek
    cekButton.addEventListener('click', () => {
        if (gameSelesai) return;

        const tebakan = tebakanInput.value.toUpperCase().trim();

        // Validasi input
        if (!/^[A-Z]$/.test(tebakan)) {
            pesan.textContent = 'Masukkan satu huruf dari A-Z!';
            tebakanInput.classList.add('shake');
            setTimeout(() => tebakanInput.classList.remove('shake'), 500);
            wrongSound.play();
            return;
        }

        tebakanKe++;
        jumlahTebakan.textContent = `Jumlah tebakan: ${tebakanKe}`;

        if (tebakan === targetHuruf) {
            pesan.textContent = `Selamat! Hurufnya adalah ${targetHuruf}!`;
            gameSelesai = true;
            tebakanInput.disabled = true;
            cekButton.disabled = true;
            mainLagiButton.style.display = 'block';
            winSound.play();
            backgroundMusic.pause(); // Hentikan musik latar saat menang
            backgroundMusic.currentTime = 0; // Reset musik ke awal
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else {
            const asciiTebakan = tebakan.charCodeAt(0);
            const asciiTarget = targetHuruf.charCodeAt(0);
            if (asciiTebakan < asciiTarget) {
                pesan.textContent = 'Terlalu Kecil Gais!';
            } else {
                pesan.textContent = 'Terlalu Besar Gais!';
            }
            wrongSound.play();
            tebakanInput.classList.add('shake');
            setTimeout(() => tebakanInput.classList.remove('shake'), 500);
        }

        tebakanInput.value = '';
    });

    // Event listener untuk input saat menekan Enter
    tebakanInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            cekButton.click();
        }
    });

    // Event listener untuk tombol main lagi
    mainLagiButton.addEventListener('click', () => {
        if (startYesButton.classList.contains('selected')) {
            backgroundMusic.play(); // Mainkan lagi musik jika opsi "Yes" dipilih
        }
        mulaiGame();
    });

    // Tambahan untuk melacak opsi musik
    startYesButton.addEventListener('click', () => {
        startYesButton.classList.add('selected');
        startNoButton.classList.remove('selected');
        backgroundMusic.play();
        mulaiGame();
    });

    startNoButton.addEventListener('click', () => {
        startNoButton.classList.add('selected');
        startYesButton.classList.remove('selected');
        backgroundMusic.pause();
        mulaiGame();
    });

    // Gambar latar belakang di canvas
    function drawBackground() {
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawBackground();
});