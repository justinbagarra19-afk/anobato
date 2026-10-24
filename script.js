const screens = { 
    question: document.getElementById('question-screen'), 
    celebration: document.getElementById('celebration-screen'), 
    flower: document.getElementById('flower-screen') 
};

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const speechBubble = document.getElementById('speech-bubble');
const noCounter = document.getElementById('count-val');

let noCount = 0;

const noMessages = [
    "suree kna ba?",
    "hmm",
    "hmmmpp",
    "kahit 10% lng?",
    "5%?",
    "hayst haystt",
    "weeee",
    "kahit 🤏🏻?????",
    "final na?",
    "wala na??",
    "tamlay",
    "lah lahh"
];




function spawnParticles(containerId, symbols) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'heart-particle';
        particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 5000);
    }, 300);
}

function createHearts() { spawnParticles('hearts-bg', ['💗']); }

function moveNoButton() {
    noCount++;
    noCounter.innerText = noCount;
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
    
    // Display No Message
    const noMsg = noMessages[Math.floor(Math.random() * noMessages.length)];
    speechBubble.innerText = noMsg;
    speechBubble.classList.add('show');
    
    // Hide the bubble after 4 seconds (Increased from 2.5s)
    setTimeout(() => {
        speechBubble.classList.remove('show');
    }, 4000);
    
    const scale = 1 + (noCount * 0.2);
    yesBtn.style.transform = `scale(${scale})`;
}

async function handleYes() {
    screens.question.classList.remove('active');
    screens.celebration.classList.add('active');
    spawnParticles('celeb-bg', ['💗', '🌸', '🌼', '🌻', '✨']);
    const celebSub = document.getElementById('celeb-subtext');
    const nextBtn = document.getElementById('next-date-btn');
    setTimeout(() => {
        celebSub.classList.remove('hidden');
        celebSub.classList.add('fade-in');
    }, 1500);
    setTimeout(() => {
        nextBtn.classList.remove('hidden');
        nextBtn.classList.add('fade-in');
    }, 3000);
}

function bloomFlower() {
    gsap.set("#stem", { strokeDasharray: 100, strokeDashoffset: 100 });
    gsap.set("#leaf-left", { strokeDasharray: 50, strokeDashoffset: 50 });
    gsap.set("#leaf-right", { strokeDasharray: 50, strokeDashoffset: 50 });
    gsap.set("#petals-group", { opacity: 0, scale: 0 });
    gsap.set(".petal", { scale: 0, transformOrigin: "50% 50%" });
    gsap.set("#flower-center", { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
    
    const tl = gsap.timeline();
    tl.to("#stem", { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" })
      .to("#leaf-left", { strokeDashoffset: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.5")
      .to("#leaf-right", { strokeDashoffset: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.3")
      .to("#petals-group", { opacity: 1, scale: 1, duration: 0.5 })
      .to(".petal", { scale: 1, duration: 0.6, stagger: 0.1, ease: "elastic.out(1, 0.5)" }, "-=0.2")
      .to("#flower-center", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out" });
}

document.getElementById('next-date-btn').onclick = () => {
    screens.celebration.classList.remove('active');
    screens.flower.classList.add('active');
    bloomFlower();
};

noBtn.onmouseover = moveNoButton;
noBtn.onclick = moveNoButton; 
yesBtn.onclick = handleYes;

createHearts();

// --- MUSIC PLAYER LOGIC (EDIT THIS PART) ---
const lyricsData = [
    { time: 1, text: "Sa pagpikit ng aking mata" },
    { time: 7, text: "Ikaw pa rin ang nakikita" },
    { time: 13, text: "Ang yakap mo" },
    { time: 16, text: "Hanap ko sa t'wina" },
    { time: 23, text: "Ako'y nagtataka naiiba" },
    { time: 31, text: "Ang aking nadarama" },
    { time: 37, text: "Buhay ko'y nagkagulo" },
    { time: 43, text: "Mula nang ika'y iwanan ko" },
    { time: 50, text: "Sana'y may bukas pa" },
    { time: 58, text: "Aasahan sa pag-ibig mo" },
    { time: 63, text: "At nang muli kang" },
    { time: 70, text: "Mahagkan sa labi" },
    { time: 76, text: "Maghihintay ako" },
    { time: 81, text: "Sa muling pagtibok" },
    { time: 87, text: "Ng puso mo" },
    { time: 93, text: "At 'di na muling" },
    { time: 97, text: "Magkamaling iwanan ka" },
];

const musicUrl = 'music.mp3';
const bgMusic = new Audio(musicUrl);
bgMusic.loop = true;

const mBtn = document.getElementById('music-btn');
const progressBar = document.getElementById('music-progress');
const lyricsContainer = document.getElementById('lyrics-text');

function renderLyrics() {
    if (!lyricsContainer) return;
    lyricsContainer.innerHTML = '';
    lyricsData.forEach((line, index) => {
        const div = document.createElement('div');
        div.className = 'lyric-line';
        div.id = `line-${index}`;
        div.innerText = line.text;
        lyricsContainer.appendChild(div);
    });
}

function togglePlay() {
    if (bgMusic.paused) {
        bgMusic.play().catch(() => { console.log("Playback blocked"); });
        mBtn.innerText = '□';
    } else {
        bgMusic.pause();
        mBtn.innerText = '▷';
    }
}

mBtn.onclick = togglePlay;
renderLyrics();

bgMusic.addEventListener('timeupdate', () => {
    if (progressBar) {
        const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
        progressBar.style.width = progress + '%';
    }

    const currentTime = bgMusic.currentTime;
    lyricsData.forEach((line, index) => {
        const element = document.getElementById(`line-${index}`);
        if (!element) return;
        const nextTime = lyricsData[index + 1] ? lyricsData[index + 1].time : bgMusic.duration;
        if (currentTime >= line.time && currentTime < nextTime) {
            element.classList.add('active');
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            element.classList.remove('active');
        }
    });
});

document.getElementById('prev-btn').onclick = () => { bgMusic.currentTime -= 10; };
document.getElementById('next-btn').onclick = () => { bgMusic.currentTime += 10; };


// --- Flower Interaction Logic ---
const flowerContainer = document.querySelector('.flower-container');
const flowerSvg = document.getElementById('flower-svg');

const flowerBubble = document.getElementById('flower-speech-bubble');

if (flowerContainer && flowerSvg) {
    // Track plucked petals
    let totalPetals = document.querySelectorAll('.petal').length;
    let pluckedCount = 0;

    flowerContainer.onmouseenter = () => {
        gsap.to("#flower-svg", { 
            rotation: 5, 
            duration: 1, 
            repeat: 1, 
            yoyo: true, 
            ease: "sine.inOut" 
        });
    };
    
let bubbleTimeout;
    flowerSvg.addEventListener('click', (e) => {
        const target = e.target;
        if (target && (target.classList.contains('petal') || target.closest('.petal'))) {
            const petal = target.classList.contains('petal') ? target : target.closest('.petal');
            
            if (petal.getAttribute('data-plucked') === 'true') return;
            petal.setAttribute('data-plucked', 'true');
            
            e.stopPropagation();
            pluckedCount++;

            if (flowerBubble) {
                flowerBubble.style.opacity = '0';
                clearTimeout(bubbleTimeout);
                if (pluckedCount < totalPetals) {
                    bubbleTimeout = setTimeout(() => {
                        flowerBubble.style.opacity = '1';
                    }, 4000);
                }
            }

            gsap.to(petal, {
                y: 200 + Math.random() * 100, 
                x: (Math.random() - 0.5) * 50,
                rotation: Math.random() * 360,
                opacity: 0,
                duration: 2,
                ease: "power1.in",
                onComplete: () => {
                    petal.style.pointerEvents = 'none';
                }
            });

            if (pluckedCount === totalPetals) {
                const modal = document.getElementById('penalty-modal');
                modal.classList.add('show');
                gsap.fromTo(".modal-box", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out" });
            }
        }
    });

    flowerContainer.onclick = (e) => {
        gsap.to(".petal", { 
            scale: 1.2, 
            duration: 0.2, 
            yoyo: true, 
            repeat: 1, 
            ease: "power1.inOut" 
        });
        gsap.to("#flower-center", { 
            scale: 1.3, 
            duration: 0.2, 
            yoyo: true, 
            repeat: 1, 
            ease: "power1.inOut" 
        });
        const heart = document.createElement('div');
        heart.innerText = '💗';
        heart.style.position = 'absolute';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '100';
        heart.style.transform = 'translate(-50%, -50%)';
        const contentArea = document.querySelector('#flower-screen .music-player-card');
        if (contentArea) contentArea.appendChild(heart);
        gsap.to(heart, { y: -100, x: (Math.random() - 0.5) * 100, opacity: 0, duration: 1.5, ease: "power1.out", onComplete: () => heart.remove() });
    };
}

document.getElementById('close-penalty').onclick = () => {
    // Replace 'YOUR_INSTAGRAM_HANDLE' with your actual IG username
    window.location.href = 'https://www.instagram.com/';
};