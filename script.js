const music = document.getElementById('bg-music');
const popup = document.getElementById('anniversary-popup');
const heartSection = document.getElementById('heart-section');
const heartOuter = document.getElementById('heart-outer');
const heartFill = document.getElementById('heart-fill');
const heartInstruction = document.getElementById('heart-instruction');
const heartHolding = document.getElementById('heart-holding');

const gachaSection = document.getElementById('gacha-section');
const gachaMachine = document.getElementById('gacha-machine');
const gachaGameArea = document.getElementById('gacha-game-area');
const gachaQuestion = document.getElementById('gacha-question');
const gachaNumberInput = document.getElementById('gacha-answer-number');
const gachaButtons = document.getElementById('gacha-answer-buttons');
const gachaSuccessPopup = document.getElementById('gacha-success-popup');
const gachaSuccessText = document.getElementById('gacha-success-text');

const puzzleSection = document.getElementById('puzzle-section');
const puzzleGrid = document.getElementById('puzzle-grid');
const letterContainer = document.getElementById('letter-container');

let holdTimer;
let holdProgress = 0;
let gachaStep = 1;

// เริ่มต้น: ให้คลิกที่ไหนก็ได้บนจอเพื่อเปิดเพลงและเริ่มเข้าสู่หน้าแรก
document.body.addEventListener('click', () => {
    if (music.paused) {
        music.play().catch(() => {});
    }
}, { once: true });

// ขั้นตอนที่ 1: แสดงป๊อปอัปคำอวยพร 3 วินาที แล้วไปหน้ากดหัวใจ
setTimeout(() => {
    popup.classList.add('hidden');
    heartSection.classList.remove('hidden');
}, 3000);

// ขั้นตอนที่ 2: เกมกดหัวใจค้างไว้
function startHolding(e) {
    e.preventDefault();
    heartInstruction.classList.add('hidden');
    heartHolding.classList.remove('hidden');
    
    holdTimer = setInterval(() => {
        holdProgress += 2;
        heartFill.style.height = holdProgress + '%';
        if (holdProgress >= 100) {
            clearInterval(holdTimer);
            heartSection.classList.add('hidden');
            initGacha();
        }
    }, 50);
}

function stopHolding() {
    clearInterval(holdTimer);
    if (holdProgress < 100) {
        holdProgress = 0;
        heartFill.style.height = '0%';
        heartInstruction.classList.remove('hidden');
        heartHolding.classList.add('hidden');
    }
}

heartOuter.addEventListener('mousedown', startHolding);
heartOuter.addEventListener('mouseup', stopHolding);
heartOuter.addEventListener('touchstart', startHolding);
heartOuter.addEventListener('touchend', stopHolding);

// ขั้นตอนที่ 3: เกมตู้กาชาปอง
function initGacha() {
    gachaSection.classList.remove('hidden');
    showGachaQuestion();
}

gachaMachine.addEventListener('click', () => {
    gachaMachine.classList.add('hidden');
    gachaGameArea.classList.remove('hidden');
});

function showGachaQuestion() {
    if (gachaStep === 1) {
        gachaQuestion.innerText = "เราคบกันมาวันที่เท่าไหร่? (ใส่ตัวเลข เช่น 15)";
        gachaNumberInput.classList.remove('hidden');
    } else if (gachaStep === 2) {
        gachaQuestion.innerText = "ครบรอบกี่ปีแล้ว? (ใส่ตัวเลข)";
        gachaNumberInput.value = '';
        gachaNumberInput.classList.remove('hidden');
    } else if (gachaStep === 3) {
        gachaQuestion.innerText = "แฟนรักเค้าไหม?";
        gachaNumberInput.classList.add('hidden');
        gachaButtons.classList.remove('hidden');
    }
}

gachaNumberInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const val = gachaNumberInput.value.trim();
        if (gachaStep === 1 && val !== "") {
            passGachaStep();
        } else if (gachaStep === 2 && val !== "") {
            passGachaStep();
        }
    }
});

function checkGachaAnswer(answer) {
    if (answer === 'รัก' || answer === 'รักมาก') {
        passGachaStep();
    }
}

function passGachaStep() {
    gachaGameArea.classList.add('hidden');
    gachaSuccessPopup.classList.remove('hidden');
    gachaSuccessText.innerText = "เก่งมากก! 🎉";

    setTimeout(() => {
        gachaSuccessPopup.classList.add('hidden');
        gachaStep++;
        if (gachaStep <= 3) {
            gachaMachine.classList.remove('hidden');
            showGachaQuestion();
        } else {
            gachaSection.classList.add('hidden');
            initPuzzle();
        }
    }, 1500);
}

// ขั้นตอนที่ 4: เกมจิ๊กซอว์และจดหมาย
function initPuzzle() {
    puzzleSection.classList.remove('hidden');
    puzzleGrid.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.addEventListener('click', () => {
            piece.style.opacity = '0';
            piece.style.pointerEvents = 'none';
            checkPuzzleComplete();
        });
        puzzleGrid.appendChild(piece);
    }
}

function checkPuzzleComplete() {
    const remainingPieces = puzzleGrid.querySelectorAll('.puzzle-piece[style*="opacity: 0"]');
    if (remainingPieces.length === 9) {
        puzzleGrid.classList.add('hidden');
        document.getElementById('puzzle-image').style.display = 'none';
        showLetter();
    }
}

function showLetter() {
    letterContainer.classList.remove('hidden');
    const lines = [
        "สุขสันต์วันครบรอบ 2 ปีนะตัวเล็ก ❤️",
        "ขอบคุณที่อยู่ข้างกันมาตลอดในทุกๆ วันนะ",
        "เธอคือความสุขและรอยยิ้มของเค้าเสมอ",
        "อาจจะมีงอนกันบ้าง ซุ่มซ่ามใส่กันบ้าง",
        "แต่เค้ารักเธอคนนี้ที่สุดเลยรู้ไหม?",
        "ขอให้เราจับมือกันแบบนี้ไปนานๆ เลยนะ",
        "รักแฟนที่สุดในโลกเล้ยยย! 🥰✨"
    ];

    lines.forEach((text, index) => {
        const p = document.getElementById(`letter-line-${index + 1}`);
        if (p) p.innerText = text;
    });
}
