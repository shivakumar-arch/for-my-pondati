 // Global State Tracking parameters
let currentPageIndex = 0;
let currentHintIndex = 0;
const hints = [
    "Hint 1: oftenly not called only for konjifying used 😉",
    "Hint 2: we always put 🤫",
    "Hint 3: idhu koode candy pudika mudiyala, based on your size! 😂🤷‍♂️"
];

let audioCtx = null, musicInterval = null, isMusicPlaying = false;

// Web Audio API Synth initialization
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
    musicInterval = setInterval(() => { playTone(notes[index], 0.8, "triangle", 0.03); index = (index + 1) % notes.length; }, 600);
}
function toggleMusic() {
    initAudio(); const icon = document.getElementById('music-icon');
    if (!isMusicPlaying) { startMelodyLoop(); isMusicPlaying = true; icon.className = "fa-solid fa-volume-high text-lg text-emerald-500 animate-pulse"; playTone(523.25, 0.3); }
    else { clearInterval(musicInterval); isMusicPlaying = false; icon.className = "fa-solid fa-volume-xmark text-lg text-rose-500"; }
}

// Particle Floating Engine Layer
function createHeart() {
    const container = document.getElementById('heart-container'); if(!container) return;
    const heart = document.createElement('div'); heart.className = 'heart-particle fa-solid fa-heart text-rose-400/30';
    heart.style.left = Math.random() * 100 + 'vw'; heart.style.fontSize = (Math.random() * 18 + 10) + 'px';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's'; container.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
}
setInterval(createHeart, 450);

// Core Data Engine containing the custom 20 pages matrix layout configurations
const pageMatrix = [
    { type: "lock" }, // Handled uniquely via function router
    { emoji: "🥳", title: "Correct-u, My Pondati! ❤️", text: "You remembered it perfectly! Welcome to your exclusive secret layout space. Ready to run through the memory train?", btnText: "Let's Go! 🚀", action: () => renderNextPage() },
    { emoji: "👀", title: "Let's be totally honest...", text: "Ever since you crossed paths with me, my phone storage is 90% your candid snapshots, and my brain capacity is 100% filled with your thoughts.", btnText: "Next Complaint Please 🤭", action: () => renderNextPage() },
    { emoji: "😤", title: "Illegal Levels of Cuteness!", text: "It is honestly a certified crime how you gaze straight into my eyes and make me completely lose my line of thought. How do you do that?", btnText: "Because I am a Cute Rowdy 👑", action: () => renderNextPage() },
    { emoji: "🤫", title: "My Absolute Favorite Rule...", text: "No matter how hectic the day gets, sleeping on my chest peacefully is a mandatory daily ritual. You have no escaping rights from this!", btnText: "Deal Signed! 🤝", action: () => renderNextPage() },
    { emoji: "😋", title: "A Highly Spicy Confession! 🔥", text: "I have to say this out loud... I am deeply, completely obsessed with your super soft, incredibly cute nyam nyam! 🤭", btnText: "Heyyy Naughty! 😂", action: () => renderNextPage() },
    { emoji: "🔥", title: "Let's Talk About Your Favorites...", text: "Don't pretend! I know for a pure fact that you absolutely love my muttai more than anything else in this world! 😉", btnText: "Ayo True! 🙈", action: () => renderNextPage() },
    { emoji: "🍒", title: "The Structural Support Crew!", text: "And let's not leave out the legendary assistants... you love playing around with my tiny tingli tingli! Right or double right? 🏏", btnText: "Double Right! 😜", action: () => renderNextPage() },
    { emoji: "👑", title: "My Only Precious One", text: "You, my gorgeous bujjikutty, are the absolute queen holding full ownership rights over my heart, my mind, and everything in between.", btnText: "Aww stop blushing me 🥺", action: () => renderNextPage() },
    { type: "quiz" },
    { type: "slider" },
    { emoji: "🤪", title: "Quick Medical Fact Check!", text: "Scientists claim the human body structure is roughly 70% water... but checking your layout, you are clearly made of 100% fine Azhagi material and pure mischief!", btnText: "Hehe valid point! 😂", action: () => renderNextPage() },
    { emoji: "👑", title: "The Royal Enfield Check", text: "How would you rate your luxury travel experience sitting behind me on my Classic 350 motorcycle?", btnText: "10/10 Rowdy Experience! 🏍️", action: () => renderNextPage() },
    { emoji: "🧸", title: "Midnight Behavior Analysis", text: "Who is the absolute monster who suddenly gets aggressive hunger cravings at 2 AM and demands snacks right away?", btnText: "Me! Bring me food 🍕", action: () => renderNextPage() },
    { emoji: "🥊", title: "In Case Of A Cute Fight...", text: "Even if we have tiny arguments, who is the one who will immediately say sorry, hug you tightly, and clear the air?", btnText: "You, my sweet boy! 🥰", action: () => renderNextPage() },
    { emoji: "📸", title: "The Brain Storage Warning", text: "Just a reminder that you look incredibly beautiful when you get angry and pout your lips. I lock those moments safely in my heart.", btnText: "Keep locked forever! 🔒", action: () => renderNextPage() },
    { emoji: "📝", title: "The Permanent Contract", text: "By clicking next, you agree to always listen to my terrible jokes and let me tease you for the rest of our lives.", btnText: "I Accept the Terms 📜", action: () => renderNextPage() },
    { type: "promises" },
    { type: "proposal" },
    { type: "celebrate" }
];

// Universal Render Router mapping structural layout dynamics smoothly
function renderEngine() {
    const card = document.getElementById('dynamic-card');
    const data = pageMatrix[currentPageIndex];
    
    // Animation transition pulse reset
    card.className = "w-full bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-pink-100 text-center transition-all duration-300 scale-95 opacity-0";
    
    setTimeout(() => {
        if (data.type === "lock") {
            card.innerHTML = `<div class="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"><i class="fa-solid fa-lock text-rose-500 text-3xl animate-bounce"></i></div>
                <h2 class="text-2xl font-black text-slate-800 mb-6 leading-snug">Type my nickname called by you,<br><span class="text-rose-500">when you call that name i get "vekkam"</span><br><span class="text-xs text-slate-400 font-medium">(type without space)</span></h2>
                <input type="password" id="passcode-input" placeholder="Enter secret code..." class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-center font-bold text-slate-700 focus:outline-none focus:border-rose-400 focus:bg-white mb-2 text-lg">
                <p id="error-msg" class="text-red-500 text-sm font-semibold mb-4 hidden">Ayo! Wrong name. Try again! 🤭</p>
                <button onclick="validatePasscode()" class="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg cursor-pointer transition-transform active:scale-95">Unlock Secret Portal ✨</button>
                <div class="mt-4 border-t border-slate-100 pt-4"><button onclick="revealHint()" class="text-xs text-rose-400 font-bold underline cursor-pointer">Need a Hint? 🤔</button><div id="hint-box" class="mt-3 text-sm text-slate-600 font-medium bg-rose-50/50 p-3 rounded-xl border border-pink-100/50 hidden"></div></div>`;
        } else if (data.type === "quiz") {
            card.innerHTML = `<span class="text-5xl mb-4 block">😜</span><h2 class="text-2xl font-black text-slate-800 mb-4">A Quick Naughty Test!</h2><p class="text-slate-600 mb-6 font-medium">When do I look the most handsome according to you?</p>
                <div class="grid grid-cols-1 gap-3 text-left">
                    <button onclick="alert('Hehe, accurate! 😉'); renderNextPage()" class="p-4 bg-rose-50 border border-rose-200 text-rose-700 font-bold rounded-xl cursor-pointer hover:bg-rose-100">A) When you're teasing me relentlessly.</button>
                    <button onclick="alert('Aww, blushing real hard now! 🥺'); renderNextPage()" class="p-4 bg-rose-50 border border-rose-200 text-rose-700 font-bold rounded-xl cursor-pointer hover:bg-rose-100">B) When you smile looking directly at me.</button>
                </div>`;
        } else if (data.type === "slider") {
            card.innerHTML = `<span class="text-5xl mb-4 block" id="slider-emoji">❤️</span><h2 class="text-2xl font-black text-slate-800 mb-2">How much do you love me?</h2>
                <input type="range" id="love-slider" min="1" max="4" value="1" oninput="handleSliderChange(this.value)" class="w-full h-3 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-rose-500 my-4">
                <div id="slider-text" class="text-lg font-black text-rose-600 mb-8 h-8">I like you a decent amount... 🫣</div>
                <button onclick="renderNextPage()" class="px-8 py-4 bg-rose-500 text-white font-bold rounded-2xl shadow-lg cursor-pointer">Lock My Answer 🔒</button>`;
        } else if (data.type === "promises") {
            card.innerHTML = `<div class="text-center mb-4"><span class="text-5xl block">🤝</span></div><h2 class="text-2xl font-black text-slate-800 mb-6 text-center">My Promises to You, Pondati</h2>
                <ul class="space-y-4 text-slate-700 font-medium text-left mb-8">
                    <li class="flex items-start gap-3"><i class="fa-solid fa-heart text-rose-500 mt-1"></i><span>I promise to always listen to your long, cute rants.</span></li>
                    <li class="flex items-start gap-3"><i class="fa-solid fa-heart text-rose-500 mt-1"></i><span>I promise to protect you and back you up unconditionally.</span></li>
                    <li class="flex items-start gap-3"><i class="fa-solid fa-heart text-rose-500 mt-1"></i><span>I promise to keep choosing you, every single day.</span></li>
                </ul><button onclick="renderNextPage()" class="w-full py-4 bg-rose-500 text-white font-bold rounded-2xl shadow-lg text-center block cursor-pointer">Read My Heart's Big Question 💖</button>`;
        } else if (data.type === "proposal") {
            card.innerHTML = `<span class="text-6xl mb-4 block animate-pulse">💍</span><h2 class="text-3xl font-black text-slate-800 mb-4">Will you spend forever with me?</h2><p class="text-slate-600 mb-8 font-medium">You are my today, my tomorrow, and my permanent favorite distraction.</p>
                <div class="flex flex-row justify-center items-center gap-6 relative h-24 w-full" id="proposal-buttons-container">
                    <button onclick="triggerCelebrationSequence()" class="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold rounded-2xl shadow-lg text-xl cursor-pointer z-20">YES! 😭❤️</button>
                    <button id="no-btn" onmouseover="teleportNoButton()" onclick="teleportNoButton()" class="absolute px-6 py-3 bg-slate-200 text-slate-600 font-bold rounded-xl z-20 shadow-sm transition-all duration-150 ease-out whitespace-nowrap">No 😜</button>
                </div>`;
        } else if (data.type === "celebrate") {
            card.innerHTML = `<span class="text-6xl mb-4 block animate-bounce">🎉🏆💖</span><h2 class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500 mb-4">OMGGGG YES! 😍</h2>
                <p class="text-xl font-bold text-slate-800 mb-2">You are officially mine forever, Pondati! 🥂✨</p><p class="text-slate-600 font-medium">Get ready for infinite laughter, spicy teasing sessions, and endless love!</p>`;
        } else {
            // Standard generic rendering fallback engine mapping structured arrays
            card.innerHTML = `<span class="text-5xl mb-4 block">${data.emoji}</span><h2 class="text-2xl font-black text-slate-800 mb-4">${data.title}</h2><p class="text-slate-600 mb-8 leading-relaxed font-medium">${data.text}</p>
                <button onclick="pageMatrix[currentPageIndex].action()" class="px-8 py-4 bg-rose-500 text-white font-bold rounded-2xl shadow-lg cursor-pointer hover:bg-rose-600 transition-transform active:scale-95">${data.btnText}</button>`;
        }
        
        card.className = "w-full bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-pink-100 text-center transition-all duration-300 scale-100 opacity-100";
    }, 250);
}

// Router triggers
function renderNextPage() { currentPageIndex++; renderEngine(); playTone(587.33, 0.08); }

function validatePasscode() {
    const val = document.getElementById('passcode-input').value.trim().toLowerCase();
    if (val === "kuttyjetti") { renderNextPage(); }
    else { document.getElementById('error-msg').classList.remove('hidden'); playTone(150, 0.2, "sawtooth"); }
}

function revealHint() {
    const box = document.getElementById('hint-box'); box.classList.remove('hidden');
    if (currentHintIndex < hints.length) { box.innerHTML = hints[currentHintIndex]; currentHintIndex++; }
    else { box.innerHTML = "Ayooo! Last hint over! 🏴‍☠️<br>" + hints[hints.length - 1]; }
    playTone(440, 0.05);
}

function handleSliderChange(val) {
    const txt = document.getElementById('slider-text'), emj = document.getElementById('slider-emoji');
    if (val == 1) { txt.innerText = "I like you a decent amount... 🫣"; emj.innerText = "❤️"; }
    else if (val == 2) { txt.innerText = "You occupy my entire mind state! 🧠💖"; emj.innerText = "💖✨"; }
    else if (val == 3) { txt.innerText = "To the moon and past all the stars! 🚀🌕"; emj.innerText = "🪐❤️🔥"; }
    else if (val == 4) { txt.innerText = "INFINITY & BEYOND! Complete ownership! 👑🔥❤️"; emj.innerText = "👑💍❤️🛸"; playTone(880, 0.1); }
}

// BUG FIXED: Absolute layout positioning algorithm forces the runaway button completely away from the YES button region 
function teleportNoButton() {
    const btn = document.getElementById('no-btn');
    const container = document.getElementById('proposal-buttons-container');
    if (!btn || !container) return;

    const maxX = container.clientWidth - btn.clientWidth;
    
    // Generate random coordinates inside bounding box window spread safely
    let randomX = Math.floor(Math.random() * maxX) - (maxX / 2);
    let randomY = Math.floor(Math.random() * 100) - 50;

    // OVERLAP FIX SHIFT: If calculated value targets the center area where YES is sitting, forcefully push it away
    if (Math.abs(randomX) < 80 && Math.abs(randomY) < 40) {
        randomX += randomX >= 0 ? 85 : -85;
        randomY += randomY >= 0 ? 45 : -45;
    }

    btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    playTone(Math.random() * 300 + 300, 0.08, "square", 0.03);
}

function triggerCelebrationSequence() { for(let i=0; i<45; i++) setTimeout(createHeart, i * 30); renderNextPage(); }

// Fire initial view engine layout on boot
window.onload = () => { renderEngine(); };
