// 游戏数据
const gameData = {
    currentScene: 0,
    soundEnabled: true,
    endings: [],
    story: {
        intro: {
            text: "📚 复旦图书馆的午后，阳光透过落地窗洒在书桌上...\n\n👀 你注意到对面坐着一个女生，她的手放在下面，时不时动一下...\n\n💭 你的心跳突然加快，大脑开始飞速运转...",
            choices: [
                { text: "🚪 立刻离开图书馆", action: "ending1" },
                { text: "🤝 礼貌询问是否需要帮助", action: "ending2" },
                { text: "📸 拿出手机拍摄取证", action: "ending3" },
                { text: "📖 假装没看见继续看书", action: "ending4" },
                { text: "🤫 小声提醒注意行为", action: "ending5" },
                { text: "👨‍💼 告诉图书馆管理员", action: "ending6" },
                { text: "🧻 递纸巾给她", action: "ending7" },
                { text: "🚨 直接报警", action: "ending8" },
                { text: "🗣️ 大声质问在做什么", action: "ending9" },
                { text: "🚶‍♂️ 换位置继续学习", action: "ending10" },
                { text: "🎧 戴上耳机隔绝一切", action: "ending11" }
            ]
        }
    },
    endings: {
        ending1: {
            title: "你没做你为什么要跑？",
            emoji: "🏃‍♂️",
            color: "#ef4444",
            story: "那名女生很疑惑，她不明白为什么好端端一个男生要跑，于是调取监控，发现你在逃离之前一直盯着她，于是怀疑你对她进行偷拍以及隔空性骚扰等行为，并曝光到网上"
        },
        ending2: {
            title: "男性凝视下的'善意'就是冒犯",
            emoji: "🤝",
            color: "#f97316",
            story: "你刚开口，女生立刻弹开并尖叫，称你未经允许靠近并试图肢体接触，周围人纷纷侧目。她哭诉你借着'关心'实施骚扰，校园号发文《警惕以善意包装的性别暴力》"
        },
        ending3: {
            title: "男性偷拍成性的铁证",
            emoji: "📸",
            color: "#eab308",
            story: "女生发现后立刻报警，称你恶意拍摄隐私部位。尽管你辩解是为了自证清白，但警方表示'女生在公共场合的任何动作都受保护，男性拍摄即构成侵权'，学校给予你记过处分"
        },
        ending4: {
            title: "对女性困境的冷漠纵容者",
            emoji: "📖",
            color: "#22c55e",
            story: "女生事后称自己当时身体不适，试图缓解疼痛，而你作为在场男性全程漠视，被指控'对女性痛苦视若无睹，是系统性压迫的帮凶'。校园论坛热帖将你打码照片挂出"
        },
        ending5: {
            title: "男性规训欲背后的权力霸凌",
            emoji: "🤫",
            color: "#06b6d4",
            story: "女生立刻反驳'我动自己的手关你什么事？'，随后在朋友圈发文《在图书馆被陌生男性教训'要注意行为'》，配图你的侧脸照。辅导员找你谈话要求反思"
        },
        ending6: {
            title: "借权力机构打压女性的加害者",
            emoji: "👨‍💼",
            color: "#8b5cf6",
            story: "管理员过来询问时，女生哭着说只是调整坐姿，你却'小题大做找管理员施压'。学生会发文声援女生，你被冠上'举报侠'标签，成为校园避雷对象"
        },
        ending7: {
            title: "物化女性的'施舍式'骚扰",
            emoji: "🧻",
            color: "#ec4899",
            story: "你递纸巾的动作被解读为'用小恩小惠试探边界'，女生将纸巾扔在地上怒斥。校园墙转发她的吐槽，配文'警惕男性用廉价物品实施精神控制'"
        },
        ending8: {
            title: "滥用公权力针对女性的施暴者",
            emoji: "🚨",
            color: "#dc2626",
            story: "警察到场后，女生哭诉自己只是整理衣物，你却小题大做浪费警力。妇联介入调查，学校对你进行约谈，要求你'深刻反思性别平等意识'并公开道歉"
        },
        ending9: {
            title: "公共场合对女性进行羞辱",
            emoji: "🗣️",
            color: "#7c2d12",
            story: "你的质问被定性为'当众羞辱女性身体自主权'，女生捂着脸跑开，随后在社交平台发文《被陌生男性当众逼问隐私》。校团委发文谴责你的行为"
        },
        ending10: {
            title: "空间侵占的隐性加害者",
            emoji: "🚶‍♂️",
            color: "#059669",
            story: "女生称你刻意换位置是'用回避姿态暗示她行为不当'，构成精神施压。校园博主发文《男性的'退避'不是尊重》，配图标注你'逃离'轨迹"
        },
        ending11: {
            title: "用冷漠构建性别隔离墙",
            emoji: "🎧",
            color: "#4f46e5",
            story: "女生事后表示当时希望有人能察觉她的窘迫，而你戴耳机的行为被解读为'主动切断沟通'。学生会发起'拒绝耳机式冷漠'倡议，你的行为被当作反面案例"
        }
    }
};

// 音效系统
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (!gameData.soundEnabled) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'click':
            oscillator.frequency.value = 800;
            gainNode.gain.value = 0.1;
            break;
        case 'success':
            oscillator.frequency.value = 1200;
            gainNode.gain.value = 0.15;
            break;
        case 'ending':
            oscillator.frequency.value = 600;
            gainNode.gain.value = 0.2;
            break;
    }
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

// 粒子效果
function createParticles(element) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        element.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
}

// 切换屏幕
function switchScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    playSound('click');
}

// 游戏状态
let gameState = {
    currentScene: 0,
    discoveredEndings: new Set()
};

// 开始游戏
function startGame() {
    gameState.currentScene = 0;
    switchScreen('game-screen');
    showScene('intro');
    updateProgress();
    createParticles(document.body);
}

// 显示场景
function showScene(sceneKey) {
    const scene = gameData.story[sceneKey];
    const storyText = document.getElementById('story-text');
    const choices = document.getElementById('choices');
    
    storyText.style.opacity = '0';
    choices.style.opacity = '0';
    
    setTimeout(() => {
        storyText.textContent = scene.text;
        storyText.style.opacity = '1';
        
        choices.innerHTML = '';
        scene.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;
            button.style.animationDelay = `${index * 0.1}s`;
            button.onclick = () => handleChoice(choice.action);
            choices.appendChild(button);
        });
        
        choices.style.opacity = '1';
    }, 300);
}

// 处理选择
function handleChoice(action) {
    playSound('success');
    
    if (action.startsWith('ending')) {
        showEnding(action);
    } else {
        showScene(action);
    }
    
    createParticles(document.querySelector('.choices'));
}

// 显示结局
function showEnding(endingKey) {
    const ending = gameData.endings[endingKey];
    gameState.discoveredEndings.add(endingKey);
    
    document.getElementById('ending-emoji').textContent = ending.emoji;
    document.getElementById('ending-name').textContent = ending.title;
    document.getElementById('ending-story').textContent = ending.story;
    document.getElementById('ending-title').style.color = ending.color;
    
    switchScreen('ending-screen');
    playSound('ending');
    createParticles(document.querySelector('.ending-content'));
    
    // 保存进度到本地存储
    localStorage.setItem('discoveredEndings', JSON.stringify([...gameState.discoveredEndings]));
    
    // 更新图鉴
    updateGallery();
}

// 重新开始
function restartGame() {
    switchScreen('start-screen');
    gameState.currentScene = 0;
}

// 显示图鉴
function showGallery() {
    switchScreen('gallery-screen');
    updateGallery();
}

// 关闭图鉴
function closeGallery() {
    switchScreen('ending-screen');
}

// 更新图鉴
function updateGallery() {
    const gallery = document.getElementById('gallery-grid');
    gallery.innerHTML = '';
    
    Object.keys(gameData.endings).forEach(key => {
        const ending = gameData.endings[key];
        const isUnlocked = gameState.discoveredEndings.has(key);
        
        const item = document.createElement('div');
        item.className = `gallery-item ${isUnlocked ? 'unlocked' : ''}`;
        
        item.innerHTML = `
            <div class="gallery-emoji">${isUnlocked ? ending.emoji : '❓'}</div>
            <div class="gallery-name">${isUnlocked ? ending.title : '未解锁'}</div>
            <div class="gallery-desc">${isUnlocked ? ending.story.substring(0, 50) + '...' : '继续探索以解锁更多结局'}</div>
        `;
        
        gallery.appendChild(item);
    });
}

// 更新进度
function updateProgress() {
    const progress = (gameState.discoveredEndings.size / Object.keys(gameData.endings).length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('current-stage').textContent = gameState.discoveredEndings.size + 1;
}

// 音效开关
function toggleSound() {
    gameData.soundEnabled = !gameData.soundEnabled;
    const icon = document.getElementById('sound-icon');
    icon.textContent = gameData.soundEnabled ? '🔊' : '🔇';
    localStorage.setItem('soundEnabled', gameData.soundEnabled);
}

// 键盘导航
document.addEventListener('keydown', (e) => {
    if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || 
        e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9' || e.key === '0') {
        const choiceButtons = document.querySelectorAll('.choice-btn');
        const index = parseInt(e.key) - 1;
        if (choiceButtons[index]) {
            choiceButtons[index].click();
        }
    }
});

// 触摸支持
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchStartY - touchEndY;
    if (Math.abs(swipeDistance) > 50) {
        // 可以添加滑动手势支持
    }
}

// 初始化
function init() {
    // 加载本地存储的数据
    const savedEndings = localStorage.getItem('discoveredEndings');
    if (savedEndings) {
        gameState.discoveredEndings = new Set(JSON.parse(savedEndings));
        updateGallery();
    }
    
    const savedSound = localStorage.getItem('soundEnabled');
    if (savedSound !== null) {
        gameData.soundEnabled = savedSound === 'true';
        document.getElementById('sound-icon').textContent = gameData.soundEnabled ? '🔊' : '🔇';
    }
    
    // 隐藏加载屏幕
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
    }, 1000);
    
    // 添加页面可见性检测
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // 页面隐藏时暂停音频
            audioContext.suspend();
        } else {
            // 页面显示时恢复音频
            audioContext.resume();
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 添加一些彩蛋
document.addEventListener('keydown', (e) => {
    // 连续按5次空格键触发彩蛋
    if (e.code === 'Space') {
        spaceCount = (spaceCount || 0) + 1;
        if (spaceCount === 5) {
            showEasterEgg();
            spaceCount = 0;
        }
    }
});

function showEasterEgg() {
    const emoji = ['🎉', '✨', '🌟', '💫', '⭐'];
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = emoji[Math.floor(Math.random() * emoji.length)];
            particle.style.position = 'fixed';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            particle.style.fontSize = '2rem';
            particle.style.pointerEvents = 'none';
            particle.style.animation = 'particleFloat 3s linear forwards';
            particle.style.zIndex = '1000';
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 3000);
        }, i * 100);
    }
}

// 添加振动反馈（移动设备支持）
function vibrate(pattern) {
    if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
    }
}