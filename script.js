let currentHintIndex = 0;
const hints = [
    "Hint 1: oftenly not called only for konjifying used 😉",
    "Hint 2: we always put 🤫",
    "Hint 3: idhu koode candy pudika mudiyala, based on your size! 😂🤷‍♂️"
];
let audioCtx = null, musicInterval = null, isMusicPlaying = false;
function initAudio() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
function playTone(freq, duration, type = "sine", volume = 0.1) {
    if (!audioCtx) return;
    try {
        let osc = audioCtx.createOscillator(), gainNode = audioCtx.createGain();
        osc.type = type; osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
        osc.connect(gainNode); gainNode.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
}
function startMelodyLoop() {
    const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23, 392.00, 329.63];
    let index = 0;
    musicInterval = setInterval(() => { playTone(notes[index], 0.8, "triangle", 0.05); index = (index + 1) % notes.length; }, 600);
}
function toggleMusic() {
    initAudio(); const icon = document.getElementById('music-icon');
    if (!isMusicPlaying) { startMelodyLoop(); isMusicPlaying = true; icon.className = "fa-solid fa-volume-high text-lg text-emerald-500 animate-pulse"; playTone(523.25, 0.3); }
    else { clearInterval(musicInterval); isMusicPlaying = false; icon.className = "fa-solid fa-volume-xmark text-lg text-rose-500"; }
}
function createHeart() {
    const container = document.getElementById('heart-container'); if(!container) return;
    const heart = document.createElement('div'); heart.className = 'heart-particle fa-solid fa-heart text-rose-400/40';
    heart.style.left = Math.random() * 100 + 'vw'; heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's'; container.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
}
setInterval(createHeart, 400);
function showNextHint() {
    const hintBox = document.getElementById('hint-box'); hintBox.classList.remove('hidden');
    if (currentHintIndex < hints.length) { hintBox.innerHTML = hints[currentHintIndex]; currentHintIndex++; }
    else { hintBox.innerHTML = "Ayooo! Last hint over! 🏴‍☠️<br>" + hints[hints.length - 1]; }
    playTone(440, 0.05);
}
function checkPasscode() {
    const input = document.getElementById('passcode-input').value.trim().toLowerCase();
    if (input === "kuttyjetti") { nextPage(1, 2); }
    else { document.getElementById('error-msg').classList.remove('hidden'); playTone(150, 0.2, "sawtooth"); }
}
function nextPage(currentId, nextId) {
    const current = document.getElementById(`page-${currentId}`), next = document.getElementById(`page-${nextId}`);
    current.classList.add('scale-95', 'opacity-0', 'hidden'); next.classList.remove('hidden');
    setTimeout(() => next.classList.add('scale-100', 'opacity-100'), 50); playTone(587.33, 0.08);
}
function updateLoveSlider(val) {
    const txt = document.getElementById('slider-text'), emj = document.getElementById('slider-emoji');
    if (val == 1) { txt.innerText = "I like you a decent amount... 🫣"; emj.innerText = "❤️"; }
    else if (val == 2) { txt.innerText = "You occupy my entire mind state! 🧠💖"; emj.innerText = "💖✨"; }
    else if (val == 3) { txt.innerText = "To the moon and past all the stars! 🚀🌕"; emj.innerText = "🪐❤️🔥"; }
    else if (val == 4) { txt.innerText = "INFINITY & BEYOND! Complete ownership! 👑🔥❤️"; emj.innerText = "👑💍❤️🛸"; playTone(880, 0.1); }
}
function teleportNoButton() {
    const btn = document.getElementById('no-btn'), box = document.getElementById('proposal-buttons-container');
    const maxX = box.clientWidth - btn.clientWidth, randomX = Math.floor(Math.random() * maxX) - (maxX / 2);
    const randomY = Math.floor(Math.random() * 120) - 60; btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    playTone(Math.random() * 400 + 300, 0.08, "square", 0.03);
}
function celebrateSuccess() { for(let i=0; i<40; i++) setTimeout(createHeart, i * 30); nextPage(9, 10); }
