// Teks pesan. Menambahkan <strong> untuk penekanan (diubah di CSS)
const text = `“<strong>happy level up our mother!</strong>”\n\nhari ini adalah hari yang sangat spesial bagi ibu, gatau mau bilang apa, tapi mau ngucapinn berribu-ribuu <strong>terimakasih</strong> sama ibuu, terimakasih karena ibu selalu sabar menghadapi kami, terimakasih untuk semua yang telah ibu berikan kepada kami semua, semuuaaa kebaikan ibu akan selalu kami ingat dan akan kami kenang!\n\nselain itu, kita juga mau ngucapin berribu-ribuu <strong>maaf</strong> sama ibuu, maaf atas semua kesalahan ucapan atau sikap kita yang bikin ibu sedih dan sakit hati.\n\njaga kesehatan yaa ibuu, ibu tau ga? banyakk lohh yang sayang bangett sama ibuu, beberapa orang itu adalah kitaa ❤️.\n\nsemoga ibu selalu dikelilingi oleh orang-orang yang baik, selalu diberi kebahagiaan oleh Allah, dan teruslah berbaik hati, bersinar, dan menjadi inspirasi bagi banyak orang! ibu jangan lupa berdo'a untuk diri sendiri dan segala do'a yang terbaik dari kita untuk ibu!\n\n<strong>We Love You Ibuu!!</strong> ❤️❤️❤️`;

const btn = document.getElementById('btn-start');
const title = document.getElementById('title');
const card = document.getElementById('card');
const typingElement = document.getElementById('typing-text');

// --- Buat Awan Secara Otomatis dengan variasi ukuran ---
for (let i = 0; i < 8; i++) {
    let cloud = document.createElement('div');
    cloud.className = 'cloud';
    
    // Variasi ukuran awan
    const sizeRatio = Math.random() * 0.5 + 0.5; // 0.5 to 1.0
    cloud.style.width = (100 * sizeRatio) + 'px';
    cloud.style.height = (40 * sizeRatio) + 'px';
    
    cloud.style.top = Math.random() * 60 + '%'; // Distribusi vertikal
    cloud.style.left = (Math.random() * -100 - 50) + 'px'; // Mulai dari luar layar kiri
    
    // Kecepatan lambat dan halus
    cloud.style.animationDuration = (Math.random() * 15 + 25) + 's'; 
    cloud.style.animationDelay = (Math.random() * 20) + 's';
    
    // Atur pseudo-elements via JS tidak bisa mudah, jadi kita biarkan CSS handle standardnya, 
    // atau gunakan SVG untuk awan yang lebih kompleks. Untuk ini, CSS standard cukup.
    
    document.getElementById('clouds-container').appendChild(cloud);
}

// --- Fungsi membuat kelopak bunga jatuh (Lebih Halus) ---
function createFlower() {
    const flowers = ['🌸', '🌼', '🌺', '🌷', '✨', '🤍'];
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
    
    // Posisi horizontal acak
    flower.style.left = Math.random() * 100 + 'vw';
    
    // Ukuran acak
    flower.style.fontSize = (Math.random() * 10 + 15) + 'px'; 
    
    // Durasi jatuh acak (antara 3s sampai 6s) agar tidak seragam
    const duration = (Math.random() * 3 + 3);
    flower.style.animationDuration = duration + 's';
    
    // Sedikit transparansi acak
    flower.style.opacity = Math.random() * 0.5 + 0.5;

    document.body.appendChild(flower);
    
    // Hapus element setelah animasi selesai agar tidak memberatkan memori
    setTimeout(() => flower.remove(), duration * 1000);
}

// --- Fungsi efek mengetik (DIPERLAMBAT) ---
function typeWriter(text, i, cb) {
    if (i < text.length) {
        // Ambil karakter saat ini
        let char = text.charAt(i);
        
        // Cek jika mendapati '<' (awal HTML tag seperti <strong>)
        if (char === '<') {
            // Temukan penutup tag '>'
            let closingTagIndex = text.indexOf('>', i);
            if (closingTagIndex !== -1) {
                // Masukkan seluruh tag sekaligus agar tidak muncul mentah
                typingElement.innerHTML += text.substring(i, closingTagIndex + 1);
                // Lanjutkan dari setelah tag
                i = closingTagIndex + 1;
                typeWriter(text, i, cb);
                return; // Exit function saat ini
            }
        }
        
        // Masukkan karakter biasa
        typingElement.innerHTML += char;
        
        // Scroll otomatis ke bawah di dalam card saat teks bertambah (untuk mobile)
        card.scrollTop = card.scrollHeight;

        // KECEPATAN KETIK (ms per karakter). Diubah dari 40ms menjadi 75ms.
        let typingSpeed = 75; 
        
        // Berikan jeda sedikit lebih lama jika bertemu koma, titik, atau tanda seru
        if (char === ',' || char === '.' || char === '!') {
            typingSpeed = 400;
        } else if (char === '\n') {
            typingSpeed = 600; // Jeda baris baru
        }

        setTimeout(() => typeWriter(text, i + 1, cb), typingSpeed);
    } else if (cb) {
        cb();
    }
}

// --- Event Listener saat tombol diklik ---
btn.addEventListener('click', () => {
    // Sembunyikan tombol dengan halus
    btn.style.opacity = '0';
    setTimeout(() => btn.style.display = 'none', 500);

    // Tampilkan Judul dan Kartu dengan transisi CSS yang halus
    setTimeout(() => {
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
        
        card.style.display = 'block';
        // Trigger reflow untuk animasi transition scale & opacity
        void card.offsetWidth; 
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    }, 600);

    // Letusan Confetti Pertama (Pink & Emas)
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF69B4', '#FFD700', '#FFFFFF', '#87CEEB']
    });

    // Mulai hujan bunga perlahan
    const flowerInterval = setInterval(createFlower, 400);

    // Mulai animasi mengetik pesan (diberi jeda agar kartu muncul dulu)
    setTimeout(() => {
        typeWriter(text, 0, () => {
            // Confetti Akhir saat teks selesai (Semburan pelan)
            confetti({
                particleCount: 150,
                velocity: 25,
                spread: 360,
                origin: { y: 0.5 },
                gravity: 0.8
            });
            // Opsional: hentikan hujan bunga setelah teks selesai atau biarkan terus mengalir
            // clearInterval(flowerInterval); 
        });
    }, 2000); // Jeda sebelum mengetik dimulai
});