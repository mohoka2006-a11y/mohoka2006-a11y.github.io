const nextButtons = document.querySelectorAll('[data-next]');
const prevButtons = document.querySelectorAll('[data-prev]');
const pages = document.querySelectorAll('.page');
const balloonContainers = document.querySelectorAll('.balloon-container');
const confettiContainers = document.querySelectorAll('.confetti-container');
const giftBox = document.getElementById('giftBox');
const burstContainer = document.querySelector('.page-3 .confetti-container');
const playSongButton = document.getElementById('playSongButton');
const birthdayAudio = document.getElementById('birthdayAudio');

nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.dataset.next;
        showPage(target);
    });
});

prevButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.dataset.prev;
        showPage(target);
    });
});

function showPage(pageIndex) {
    pages.forEach(page => page.classList.remove('active'));
    const targetPage = document.querySelector(`.page-${pageIndex}`);
    if (targetPage) targetPage.classList.add('active');
}

function createBalloons() {
    balloonContainers.forEach(container => {
        for (let i = 0; i < 18; i += 1) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = `${Math.random() * 90 + 3}%`;
            balloon.style.top = `${Math.random() * 40 + 5}%`;
            balloon.style.transform = `scale(${0.9 + Math.random() * 0.5})`;
            balloon.style.animationDuration = `${8 + Math.random() * 6}s`;
            container.appendChild(balloon);
        }
    });
}

createBalloons();

function createConfetti() {
    confettiContainers.forEach(container => {
        for (let i = 0; i < 12; i += 1) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 92 + 4}%`;
            confetti.style.animationDuration = `${4 + Math.random() * 4}s`;
            confetti.style.animationDelay = `${Math.random() * 3}s`;
            confetti.style.height = `${1.2 + Math.random() * 1.2}rem`;
            confetti.style.width = `${0.5 + Math.random() * 0.8}rem`;
            container.appendChild(confetti);
        }
    });
}

function createBurstConfetti() {
    if (!burstContainer) return;
    burstContainer.innerHTML = '';
    const colors = ['#ffea58', '#ff7ce5', '#72fff7', '#95a3ff', '#c1f5ff', '#ee76ff'];
    for (let i = 0; i < 16; i += 1) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti burst';
        const angle = Math.random() * Math.PI * 2;
        const distance = 120 + Math.random() * 70;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        confetti.style.setProperty('--burst-x', `${x}px`);
        confetti.style.setProperty('--burst-y', `${y}px`);
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.background = colors[i % colors.length];
        burstContainer.appendChild(confetti);
    }
}

function handleGiftOpen() {
    createBurstConfetti();
}

if (giftBox) {
    giftBox.addEventListener('mouseenter', handleGiftOpen);
}
const audio = document.getElementById("birthdayAudio");

window.addEventListener("load", () => {
    audio.play().catch(() => {
        // Browser blocked autoplay.
        // Play immediately after first user interaction.
        document.addEventListener("click", () => {
            audio.play();
        }, { once: true });
    });
});