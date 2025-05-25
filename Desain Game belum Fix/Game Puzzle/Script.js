const container = document.getElementById('game-container');
const winMessage = document.getElementById('win-message');
const imageSelect = document.getElementById('image-select');
const imageUpload = document.getElementById('image-upload');
const size = 4; // 4x4 grid
const tileSize = 98; // pixel size per tile
let pieces = [];
let imageData = []; // Simpan data gambar asli
let selectedPiece = null; // Track piece yang dipilih
let currentImage = 1; // Default gambar lingkaran
let uploadedImage = null; // Simpan gambar yang diupload

// Cek apakah elemen ada
if (!container || !winMessage || !imageSelect || !imageUpload) {
    console.error('Required elements not found:', { container, winMessage, imageSelect, imageUpload });
    alert('Error: Element "game-container", "win-message", "image-select", atau "image-upload" tidak ditemukan. Periksa HTML.');
    throw new Error('Missing required elements');
}

// Generate image on canvas based on selection
function generateImage(imageType) {
    const canvas = document.createElement('canvas');
    canvas.width = tileSize * size;
    canvas.height = tileSize * size;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (imageType == 1) {
        // Gambar 1: Lingkaran dengan gradient
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, 192
        );
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.5, 'yellow');
        gradient.addColorStop(1, 'green');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 192, 0, Math.PI * 2);
        ctx.fill();
    } else if (imageType == 2) {
        // Gambar 2: Persegi dengan gradient
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, 192
        );
        gradient.addColorStop(0, 'blue');
        gradient.addColorStop(0.5, 'purple');
        gradient.addColorStop(1, 'red');

        ctx.fillStyle = gradient;
        ctx.fillRect(
            canvas.width / 2 - 192,
            canvas.height / 2 - 192,
            384, 384
        );
    } else if (imageType == 3 && uploadedImage) {
        // Gambar 3: Gambar yang diupload
        ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
    }

    return canvas;
}

// Load uploaded image
function loadUploadedImage() {
    const file = imageUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                uploadedImage = img; // Simpan gambar yang diupload
                if (currentImage == 3) {
                    init(3); // Render ulang puzzle dengan gambar yang diupload
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Initialize puzzle
function init(imageType = currentImage) {
    const image = generateImage(imageType);
    pieces = [];
    imageData = [];
    container.innerHTML = '';

    let number = 0;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.dataset.number = number.toString(); // Nomor unik per piece
            piece.dataset.correctNumber = number.toString(); // Nomor yang bener sesuai urutan awal

            // Potong gambar dari canvas dan simpan data
            const canvas = document.createElement('canvas');
            canvas.width = tileSize;
            canvas.height = tileSize;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, x * tileSize, y * tileSize, tileSize, tileSize, 0, 0, tileSize, tileSize);
            const imgUrl = canvas.toDataURL();
            piece.style.backgroundImage = `url(${imgUrl})`;
            imageData.push({ number: number.toString(), url: imgUrl });

            piece.addEventListener('click', () => swapPiece(piece));
            container.appendChild(piece);
            pieces.push(piece);
            number++;
        }
    }
    // Pastikan pesan kemenangan disembunyikan saat mulai
    if (winMessage) winMessage.classList.add('hidden');
    console.log('Game initialized, pieces:', pieces.map(p => p.dataset.number));
    
    // Shuffle otomatis pas awal
    shuffle();
}

// Fungsi untuk ganti gambar
function changeImage() {
    currentImage = parseInt(imageSelect.value);
    console.log('Changing image to:', currentImage);
    if (currentImage == 3 && !uploadedImage) {
        alert('Silakan upload gambar terlebih dahulu!');
    } else {
        init(currentImage);
    }
}

// Swap pieces (cuma swap data, gak ubah posisi di DOM)
function swapPiece(piece) {
    if (!selectedPiece) {
        // Pilih piece pertama
        selectedPiece = piece;
        piece.style.border = '2px solid yellow'; // Highlight piece yang dipilih
    } else {
        // Swap background image
        const tempImg = selectedPiece.style.backgroundImage;
        selectedPiece.style.backgroundImage = piece.style.backgroundImage;
        piece.style.backgroundImage = tempImg;

        // Swap nomor (dataset.number)
        const tempNumber = selectedPiece.dataset.number;
        selectedPiece.dataset.number = piece.dataset.number;
        piece.dataset.number = tempNumber;

        // Reset selection
        selectedPiece.style.border = '1px solid #ddd'; // Kembali ke border default
        selectedPiece = null;
    }
    console.log('After swap, DOM order:', Array.from(container.children).map(child => child.dataset.number));
}

// Shuffle pieces (cuma swap data, gak ubah posisi di DOM)
function shuffle() {
    const children = Array.from(container.children);
    for (let i = children.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        
        // Swap background image
        const tempImg = children[i].style.backgroundImage;
        children[i].style.backgroundImage = children[j].style.backgroundImage;
        children[j].style.backgroundImage = tempImg;

        // Swap nomor (dataset.number)
        const tempNumber = children[i].dataset.number;
        children[i].dataset.number = children[j].dataset.number;
        children[j].dataset.number = tempNumber;
    }
    // Pastikan pesan kemenangan disembunyikan saat shuffle
    if (winMessage) {
        winMessage.classList.add('hidden');
        console.log('Shuffle done, DOM order:', Array.from(container.children).map(child => child.dataset.number));
    }
}

// Check if won
function checkWin() {
    // Urutan nomor yang bener: 0, 1, 2, ..., 15
    const correctOrder = Array.from({ length: size * size }, (_, i) => i.toString());
    // Ambil urutan nomor dari pieces berdasarkan posisi di DOM
    const currentOrder = Array.from(container.children).map(child => child.dataset.number);
    
    // Debug visual urutan
    console.log('Visual check - container children:', Array.from(container.children).map((child, idx) => ({
        index: idx,
        number: child.dataset.number
    })));
    
    // Bandingin urutan saat ini sama yang bener
    const won = correctOrder.every((num, index) => {
        const match = num === currentOrder[index];
        console.log(`Piece ${index} - expected: ${num}, got: ${currentOrder[index]}, match: ${match}`);
        return match;
    });
    console.log('Win condition result:', won);
    console.log('Current order from DOM:', currentOrder);
    
    if (winMessage) {
        if (won) {
            console.log('Win condition met, showing win message');
            winMessage.textContent = 'Selamat Anda Berhasil';
            winMessage.classList.remove('wrong');
            winMessage.classList.remove('hidden');
        } else {
            console.log('Not won yet, showing wrong message');
            winMessage.textContent = 'Gambar Anda Masih Salah!';
            winMessage.classList.add('wrong');
            winMessage.classList.remove('hidden');
        }
    }
}

// Fungsi untuk tombol Cek
function checkPuzzle() {
    console.log('Cek button clicked');
    checkWin();
}

// Start game
init();