// --- ตัวแปรควบคุม ---
let currentStep = 1;
let isHolding = false;
let gachaCount = 0;
const bgMusic = document.getElementById('bg-music');

// --- ฟังก์ชันเริ่มเล่นเพลง ---
function startMusic() {
    bgMusic.play();
}

// --- ฟังชั่นเริ่มการทำงาน ---
window.onload = function() {
    // --- 1. พื้นหลังและจุดพลุ ---
    setTimeout(startStep2, 5000); // ไปยังขั้นตอนที่ 2 หลังจาก 5 วินาที
};

// --- 2. ป๊อปอัปคำอวยพร ---
