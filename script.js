// ===== CONFIGURATION =====
const HINTS_PER_DAY = 5;
const STORAGE_KEY = 'quiz_app_data';

// ===== QUESTION BANK =====
const questions = [
    {
        question: "What is the capital city of India?",
        options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
        correct: 0,
        hint: "Seat of all three branches of the government.",
        category: "Geography"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1,
        hint: "It is named after the Roman god of war.",
        category: "Astronomy"
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Nikola Tesla", "Albert Einstein", "Isaac Newton", "Marie Curie"],
        correct: 1,
        hint: "Published in 1905 and 1915.",
        category: "Physics"
    },
    {
        question: "What is 144 divided by 12?",
        options: ["14", "10", "12", "18"],
        correct: 2,
        hint: "Think of a dozen dozens.",
        category: "Mathematics"
    },
    {
        question: "Which language is primarily used to create Android apps?",
        options: ["Swift", "Java", "Ruby", "C"],
        correct: 1,
        hint: "Runs on the JVM.",
        category: "Technology"
    },
    {
        question: "The Great Barrier Reef is located in which country?",
        options: ["New Zealand", "Australia", "Philippines", "Indonesia"],
        correct: 1,
        hint: "Near Queensland.",
        category: "Geography"
    },
    {
        question: "Which organ in the human body is responsible for filtering blood?",
        options: ["Heart", "Liver", "Kidneys", "Lungs"],
        correct: 2,
        hint: "Helps maintain fluid balance.",
        category: "Biology"
    },
    {
        question: "Which treaty created the United Nations?",
        options: ["Treaty of Paris", "Charter of San Francisco", "Treaty of Versailles", "Geneva Convention"],
        correct: 1,
        hint: "Signed on 26 June 1945.",
        category: "History"
    },
    {
        question: "What does HTTP stand for?",
        options: ["HyperText Transfer Protocol", "HighText Transfer Process", "Hyper Transfer Text Protocol", "Hyperlink Transfer Text"],
        correct: 0,
        hint: "Foundation of data communication for the web.",
        category: "Technology"
    },
    {
        question: "Which metal is liquid at room temperature?",
        options: ["Mercury", "Silver", "Copper", "Aluminum"],
        correct: 0,
        hint: "Used in thermometers.",
        category: "Chemistry"
    }
];

// ===== STATE MANAGEMENT =====
let currentUser = null;
let currentQuestionIndex = 0;
let selectedOption = null;
let gameData = loadGameData();

// ===== ANIMATED BACKGROUND =====
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let stars = [];
let animationPhase = 0;

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    stars = [];
    for (let i = 0; i < 80; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: 0.4 + Math.random() * 1.4,
            size: 1.5 + Math.random() * 2.5,
            drift: -0.2 + Math.random() * 0.4
        });
    }
}

function animateBackground() {
    animationPhase = (animationPhase + 0.01) % 1;
    
    const topHue = (animationPhase + 0.55) % 1;
    const bottomHue = (animationPhase + 0.05) % 1;
    
    const topColor = hslToRgb(topHue, 0.6, 0.35 + 0.25 * Math.sin(animationPhase * Math.PI));
    const bottomColor = hslToRgb(bottomHue, 0.7, 0.55 + 0.25 * Math.cos(animationPhase * Math.PI));
    
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, `rgb(${topColor[0]}, ${topColor[1]}, ${topColor[2]})`);
    gradient.addColorStop(1, `rgb(${bottomColor[0]}, ${bottomColor[1]}, ${bottomColor[2]})`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw overlay
    const overlayGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    overlayGradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
    overlayGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = overlayGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw and update stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        star.y += star.speed;
        star.x += star.drift;
        
        if (star.y > canvas.height || star.x < 0 || star.x > canvas.width) {
            star.x = Math.random() * canvas.width;
            star.y = -star.size;
            star.speed = 0.4 + Math.random() * 1.4;
        }
    });
    
    requestAnimationFrame(animateBackground);
}

function hslToRgb(h, s, l) {
    let r, g, b;
    
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// ===== DATA PERSISTENCE =====
function loadGameData() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : { users: {} };
    } catch (e) {
        return { users: {} };
    }
}

function saveGameData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));
    } catch (e) {
        console.error('Failed to save game data');
    }
}

function getUserData(username) {
    if (!gameData.users[username]) {
        gameData.users[username] = {
            username: username,
            score: 0,
            currentQuestionIndex: 0,
            answeredCorrectly: {},
            hintsUsedToday: 0,
            lastHintDate: null
        };
    }
    return gameData.users[username];
}

function getTodayString() {
    return new Date().toISOString().split('T')[0];
}

function getHintsRemaining(userData) {
    const today = getTodayString();
    if (userData.lastHintDate !== today) {
        userData.hintsUsedToday = 0;
        userData.lastHintDate = today;
    }
    return HINTS_PER_DAY - userData.hintsUsedToday;
}

// ===== UI MANAGEMENT =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===== LOGIN =====
document.getElementById('loginBtn').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim().toLowerCase();
    const statusEl = document.getElementById('loginStatus');
    
    if (!username) {
        statusEl.textContent = 'Username cannot be empty.';
        statusEl.style.color = '#ff6b6b';
        return;
    }
    
    currentUser = getUserData(username);
    currentQuestionIndex = currentUser.currentQuestionIndex % questions.length;
    
    updateProfileDisplay();
    refreshLeaderboard();
    displayQuestion();
    showScreen('quizScreen');
    
    statusEl.textContent = '';
});

// ===== QUESTION DISPLAY =====
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const questionEl = document.getElementById('questionText');
    const optionsEl = document.getElementById('optionsContainer');
    const hintEl = document.getElementById('hintText');
    const feedbackEl = document.getElementById('feedbackText');
    
    questionEl.textContent = `[${question.category}] ${question.question}`;
    questionEl.style.background = 'rgba(24, 34, 64, 0.8)';
    
    // Trigger glow animation
    animateQuestionGlow(questionEl);
    
    // Clear and create options
    optionsEl.innerHTML = '';
    selectedOption = null;
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => selectOption(index, btn));
        optionsEl.appendChild(btn);
    });
    
    hintEl.textContent = 'Hints appear here';
    feedbackEl.textContent = ' ';
    feedbackEl.style.background = 'rgba(18, 24, 48, 0.8)';
}

function selectOption(index, btnElement) {
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    btnElement.classList.add('selected');
    selectedOption = index;
}

function animateQuestionGlow(element) {
    let step = 0;
    const totalSteps = 40;
    const interval = setInterval(() => {
        const progress = step / totalSteps;
        const wave = Math.sin(Math.PI * progress);
        const baseColor = [24, 34, 64];
        const glowColor = [90, 132, 220];
        
        const r = Math.round(baseColor[0] + (glowColor[0] - baseColor[0]) * wave);
        const g = Math.round(baseColor[1] + (glowColor[1] - baseColor[1]) * wave);
        const b = Math.round(baseColor[2] + (glowColor[2] - baseColor[2]) * wave);
        
        element.style.background = `rgba(${r}, ${g}, ${b}, 0.8)`;
        
        step++;
        if (step > totalSteps) {
            clearInterval(interval);
            element.style.background = 'rgba(24, 34, 64, 0.8)';
        }
    }, 20);
}

// ===== ANSWER SUBMISSION =====
document.getElementById('submitBtn').addEventListener('click', () => {
    const feedbackEl = document.getElementById('feedbackText');
    const historyEl = document.getElementById('historyList');
    
    if (selectedOption === null) {
        feedbackEl.textContent = 'Please select an answer.';
        feedbackEl.style.color = '#ff6b6b';
        return;
    }
    
    const question = questions[currentQuestionIndex];
    const isCorrect = selectedOption === question.correct;
    
    if (isCorrect) {
        currentUser.score += 10;
        currentUser.answeredCorrectly[currentQuestionIndex] = true;
        feedbackEl.textContent = 'Correct! +10 points';
        feedbackEl.style.color = '#2ecc71';
        animateFeedback(feedbackEl, [46, 204, 113]);
        
        const li = document.createElement('li');
        li.textContent = `✔ ${question.question}`;
        historyEl.insertBefore(li, historyEl.firstChild);
        
        pulseElement(document.getElementById('profileScore'), [46, 204, 113]);
    } else {
        currentUser.answeredCorrectly[currentQuestionIndex] = false;
        feedbackEl.textContent = 'Incorrect. Try the next question.';
        feedbackEl.style.color = '#e74c3c';
        animateFeedback(feedbackEl, [231, 76, 60]);
        
        const li = document.createElement('li');
        li.textContent = `✘ ${question.question}`;
        historyEl.insertBefore(li, historyEl.firstChild);
    }
    
    updateProfileDisplay();
    refreshLeaderboard();
    saveGameData();
});

function animateFeedback(element, targetColor) {
    let step = 0;
    const totalSteps = 40;
    const baseColor = [18, 24, 48];
    
    const interval = setInterval(() => {
        const progress = step / totalSteps;
        const fade = Math.sin(Math.PI * progress);
        
        const r = Math.round(baseColor[0] + (targetColor[0] - baseColor[0]) * fade);
        const g = Math.round(baseColor[1] + (targetColor[1] - baseColor[1]) * fade);
        const b = Math.round(baseColor[2] + (targetColor[2] - baseColor[2]) * fade);
        
        element.style.background = `rgba(${r}, ${g}, ${b}, 0.8)`;
        
        step++;
        if (step > totalSteps) {
            clearInterval(interval);
            element.style.background = 'rgba(18, 24, 48, 0.8)';
        }
    }, 25);
}

function pulseElement(element, accentColor) {
    let step = 0;
    const totalSteps = 30;
    const baseColor = [255, 255, 255];
    
    const interval = setInterval(() => {
        const progress = step / totalSteps;
        const wave = Math.sin(Math.PI * progress);
        
        const r = Math.round(baseColor[0] + (accentColor[0] - baseColor[0]) * wave);
        const g = Math.round(baseColor[1] + (accentColor[1] - baseColor[1]) * wave);
        const b = Math.round(baseColor[2] + (accentColor[2] - baseColor[2]) * wave);
        
        element.style.color = `rgb(${r}, ${g}, ${b})`;
        
        step++;
        if (step > totalSteps) {
            clearInterval(interval);
            element.style.color = 'white';
        }
    }, 25);
}

// ===== NEXT QUESTION =====
document.getElementById('nextBtn').addEventListener('click', () => {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    currentUser.currentQuestionIndex = currentQuestionIndex;
    saveGameData();
    displayQuestion();
});

// ===== HINT USAGE =====
document.getElementById('hintBtn').addEventListener('click', () => {
    const hintEl = document.getElementById('hintText');
    const feedbackEl = document.getElementById('feedbackText');
    const hintsLeft = getHintsRemaining(currentUser);
    
    if (hintsLeft <= 0) {
        feedbackEl.textContent = 'No hints remaining for today.';
        feedbackEl.style.color = '#ff6b6b';
        return;
    }
    
    currentUser.hintsUsedToday++;
    currentUser.lastHintDate = getTodayString();
    
    const question = questions[currentQuestionIndex];
    hintEl.textContent = `Hint: ${question.hint}`;
    
    feedbackEl.textContent = `Hint used (${getHintsRemaining(currentUser)} left today)`;
    feedbackEl.style.color = '#3498db';
    
    updateProfileDisplay();
    pulseElement(document.getElementById('profileHints'), [241, 196, 15]);
    saveGameData();
});

// ===== SAVE & EXIT =====
document.getElementById('saveBtn').addEventListener('click', () => {
    saveGameData();
    const feedbackEl = document.getElementById('feedbackText');
    feedbackEl.textContent = 'Progress saved successfully!';
    feedbackEl.style.color = '#2ecc71';
});

// ===== PROFILE & LEADERBOARD =====
function updateProfileDisplay() {
    document.getElementById('profileName').textContent = capitalize(currentUser.username);
    document.getElementById('profileScore').textContent = currentUser.score;
    document.getElementById('profileHints').textContent = Math.max(0, getHintsRemaining(currentUser));
}

function refreshLeaderboard() {
    const leaderboardEl = document.getElementById('leaderboardList');
    leaderboardEl.innerHTML = '';
    
    const users = Object.values(gameData.users).sort((a, b) => b.score - a.score);
    
    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${capitalize(user.username)} - ${user.score} pts`;
        leaderboardEl.appendChild(li);
    });
    
    if (users.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No players yet';
        li.style.opacity = '0.5';
        leaderboardEl.appendChild(li);
    }
}

// ===== INITIALIZATION =====
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

initCanvas();
animateBackground();
