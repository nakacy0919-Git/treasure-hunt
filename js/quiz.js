// ==========================================
// quiz.js: 多機能単語テスト
// ==========================================

let quizQuestions = [];
let currentQuizIndex = 0;
let quizScore = 0;
let quizMode = 1; 
let isTimerEnabled = true;
let quizTimer = null;
let timeLeft = 50; 

let quizRecognition = null;
let isQuizTransitioning = false; 

function startVocabQuiz() {
    resetAppMode();
    currentMode = 'quiz';
    if (quizRecognition) { try { quizRecognition.stop(); } catch(e){} }
    clearInterval(quizTimer); 

    const mainOverlay = document.getElementById('mainOverlay');
    const title = document.getElementById('overlayTitle');
    const targetDisplay = document.getElementById('targetTextDisplay');

    if (mainOverlay) mainOverlay.style.display = 'flex';
    if (title) title.innerText = "📝 Treasure Hunt Quiz";
    
    document.getElementById('fontControls').style.display = 'none';
    document.getElementById('speechResultWindow').style.display = 'none';
    targetDisplay.style.display = 'block';

    targetDisplay.innerHTML = `
        <div class="quiz-menu-container">
            <h2 class="quiz-menu-title">モードを選択してください</h2>
            
            <button class="quiz-mode-btn btn-mode-1" onclick="setupQuizData(1)">
                🔠 4択クイズ (英→日)
                <span class="quiz-mode-subtxt">意味をリストから選択します</span>
            </button>

            <button class="quiz-mode-btn btn-mode-2" onclick="setupQuizData(2)">
                🎙️ Voice Speaking (日→英)
                <span class="quiz-mode-subtxt">正しい英単語を発音して回答します</span>
            </button>

            <div style="margin-top:30px; font-size:1.6rem; font-weight:900; color:#444; font-family:'Noto Sans JP', sans-serif;">
                <label style="cursor:pointer; display:flex; align-items:center; gap:12px;">
                    <input type="checkbox" id="timerToggle" ${isTimerEnabled ? 'checked' : ''} onchange="isTimerEnabled=this.checked" style="width:28px; height:28px; cursor:pointer;"> 
                    ⏱️ 5秒制限を有効にする
                </label>
            </div>
        </div>
    `;
}

function setupQuizData(mode) {
    quizMode = mode;
    const baseKey = currentKey.split('_').slice(0, 2).join('_'); 
    
    // ★修正：lesson から unit へ
    const currentVocabArray = (typeof unitVocab !== 'undefined') ? unitVocab[baseKey] : null;

    if (!currentVocabArray || currentVocabArray.length === 0) {
        alert("このパートに登録された単語データが見つかりません。");
        return;
    }

    let allMeaningsPool = [];
    if (typeof unitVocab !== 'undefined') {
        Object.values(unitVocab).forEach(vArray => {
            vArray.forEach(v => {
                if (v.meaning) allMeaningsPool.push(v.meaning);
            });
        });
    }
    allMeaningsPool = [...new Set(allMeaningsPool)]; 

    quizQuestions = currentVocabArray.map(v => {
        let choices = [v.meaning]; 
        let fakes = allMeaningsPool.filter(m => m !== v.meaning);
        fakes.sort(() => 0.5 - Math.random());
        choices = choices.concat(fakes.slice(0, 3));
        
        let dummyCount = 1;
        while(choices.length < 4) { choices.push("（ダミー選択肢 " + dummyCount++ + "）"); }
        choices.sort(() => 0.5 - Math.random()); 
        
        let hintStr = v.word ? v.word.charAt(0) : "?";
        return { word: v.word, correct: v.meaning, choices: choices, hint: hintStr };
    });

    quizQuestions.sort(() => 0.5 - Math.random());
    currentQuizIndex = 0;
    quizScore = 0;
    renderQuizQuestion();
}

function renderQuizQuestion() {
    if (currentMode !== 'quiz') {
        clearInterval(quizTimer);
        return; 
    }

    clearInterval(quizTimer);
    isQuizTransitioning = false; 
    const display = document.getElementById('targetTextDisplay');
    
    if (currentQuizIndex >= quizQuestions.length) {
        renderQuizResult();
        return;
    }

    const q = quizQuestions[currentQuizIndex];
    let html = `
        <div style="text-align:center; padding: 20px;">
            <div style="font-size: 1.4rem; font-family:'Nunito', sans-serif; color: #888; font-weight:900; margin-bottom: 15px;">Question ${currentQuizIndex + 1} / ${quizQuestions.length}</div>
    `;

    if (isTimerEnabled && quizMode === 1) {
        html += `<div class="timer-container"><div id="tBar" class="timer-bar"></div></div>`;
    }

    const safeCorrect = q.correct ? q.correct.replace(/'/g, "\\'") : "";
    const safeWord = q.word ? q.word.replace(/'/g, "\\'") : "";

    if (quizMode === 1) {
        html += `
            <div style="font-size: 4.5rem; font-weight: 900; color: #333; margin-bottom: 40px; font-family: 'Nunito', sans-serif;">${q.word}</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 900px; margin: 0 auto;">
                ${q.choices.map(c => {
                    const safeChoice = c ? c.replace(/'/g, "\\'") : "";
                    return `<button class="quiz-choice-btn" onclick="checkAnswer1(this, '${safeChoice}', '${safeCorrect}')" style="padding:25px 20px; border-radius:15px; border:2px solid #ddd; font-weight:900; font-size:1.5rem; font-family:'Noto Sans JP', sans-serif; cursor:pointer; background:#fff; transition:0.2s; box-shadow:0 4px 6px rgba(0,0,0,0.05); color:#333;">${c}</button>`;
                }).join('')}
            </div>
        `;
        display.innerHTML = html;
        if(typeof playWordAudio === 'function') playWordAudio(q.word);
        startTimer();
    } else {
        html += `
            <div style="font-size: 1.6rem; color: #ff4b4b; font-weight: 900; font-family:'Noto Sans JP', sans-serif; margin-bottom:10px;">意味に合う英語を発音してください</div>
            <div style="font-size: 4rem; font-weight: 900; color: #333; margin-bottom: 30px; font-family:'Noto Sans JP', sans-serif;">${q.correct}</div>
            
            <div id="quizSpeechBox" style="min-height:120px; background:#fff5f8; border:4px dashed #ff9a9e; border-radius:20px; padding:20px; margin-bottom:15px; font-size:3.5rem; font-weight:900; font-family:'Nunito', sans-serif; color:#ff4b4b; display:flex; align-items:center; justify-content:center; text-align:center;">
                🎙️ Listening...
            </div>
            
            <div id="quizHintArea" style="min-height:40px; font-size:1.8rem; font-weight:900; font-family:'Nunito', sans-serif; color:#888;"></div>
            
            <div style="display:flex; justify-content:center; gap:20px; margin-top:10px;">
                <button class="hint-btn" onclick="showQuizHint('${q.hint}')" style="padding:15px 40px; font-size:1.3rem; font-weight:900; border-radius:30px; font-family:'Noto Sans JP', sans-serif; background:#f0f0f0; border:2px solid #ccc; cursor:pointer; box-shadow:0 4px 6px rgba(0,0,0,0.05);">💡 ヒントを出す</button>
            </div>
            <div style="margin-top:15px; font-size:1.1rem; color:#888; font-weight:bold;">※マイクに向かって「Skip」または「Next」と言うとパスできます</div>
        `;
        display.innerHTML = html;
        
        setTimeout(() => startQuizSpeech(q.word), 100);
    }
}

function startTimer() {
    if (!isTimerEnabled) return;
    timeLeft = 50;
    const bar = document.getElementById('tBar');
    
    quizTimer = setInterval(() => {
        if (currentMode !== 'quiz') {
            clearInterval(quizTimer);
            return;
        }

        timeLeft--;
        if (bar) bar.style.width = (timeLeft * 2) + "%";
        if (timeLeft <= 0) {
            clearInterval(quizTimer);
            handleTimeOut();
        }
    }, 100);
}

function handleTimeOut() {
    if (currentMode !== 'quiz') return;
    currentQuizIndex++;
    renderQuizQuestion();
}

function checkAnswer1(btn, selected, correct) {
    clearInterval(quizTimer);
    const buttons = btn.parentElement.querySelectorAll('button');
    buttons.forEach(b => b.style.pointerEvents = 'none');

    if (selected === correct) {
        btn.style.background = '#4caf50'; btn.style.color = 'white'; btn.style.borderColor = '#4caf50';
        quizScore++;
        if (typeof successSound !== 'undefined' && successSound) successSound.play().catch(e=>{});
    } else {
        btn.style.background = '#f44336'; btn.style.color = 'white'; btn.style.borderColor = '#f44336';
        buttons.forEach(b => {
            if (b.innerText === correct) {
                b.style.background = '#4caf50'; b.style.color = 'white'; b.style.borderColor = '#4caf50';
            }
        });
    }

    setTimeout(() => { 
        if (currentMode === 'quiz') {
            currentQuizIndex++; 
            renderQuizQuestion(); 
        }
    }, 1200);
}

function startQuizSpeech(targetWord) {
    const box = document.getElementById('quizSpeechBox');
    
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        if(box) box.innerText = "ブラウザが未対応です";
        return;
    }

    if (quizRecognition) {
        quizRecognition.onend = null;
        try { quizRecognition.abort(); } catch(e){}
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    quizRecognition = new SpeechRec();
    quizRecognition.lang = 'en-US';
    quizRecognition.interimResults = true;
    quizRecognition.continuous = true; 

    const cleanTarget = targetWord.toLowerCase().replace(/[.,!?'’"\-]/g, '').trim();
    
    let stemmedTarget = cleanTarget;
    if (cleanTarget.length > 3) { 
        stemmedTarget = cleanTarget.replace(/(es|s|ed|d|ing)$/, '');
    }

    quizRecognition.onresult = (e) => {
        if (isQuizTransitioning || currentMode !== 'quiz') return;

        let finalTrans = '';
        let interimTrans = '';
        for (let i = 0; i < e.results.length; i++) {
            if (e.results[i].isFinal) finalTrans += e.results[i][0].transcript + ' ';
            else interimTrans += e.results[i][0].transcript;
        }
        
        let fullTranscript = (finalTrans + interimTrans).toLowerCase();
        if (box) box.innerText = fullTranscript || "🎙️ Listening...";

        let cleanTranscript = fullTranscript.replace(/[.,!?'’"\-]/g, '');

        if (cleanTranscript.includes('skip') || cleanTranscript.includes('next')) {
            isQuizTransitioning = true;
            quizRecognition.stop();
            handleSkip2(targetWord);
            return;
        }

        if (cleanTarget && (cleanTranscript.includes(cleanTarget) || cleanTranscript.includes(stemmedTarget))) {
            isQuizTransitioning = true;
            quizRecognition.stop();
            handleCorrect2(fullTranscript, targetWord);
        }
    };

    quizRecognition.onend = () => { 
        if (currentMode === 'quiz' && quizMode === 2 && !isQuizTransitioning) { 
            setTimeout(() => { try { quizRecognition.start(); } catch(err) {} }, 250); 
        }
    };
    
    try { 
        quizRecognition.start(); 
    } catch(err) {}
}

function handleCorrect2(transcript, targetWord) {
    const box = document.getElementById('quizSpeechBox');
    if (box) {
        box.style.background = '#e8f5e9';
        box.style.borderColor = '#4caf50';
        box.style.color = '#4caf50';
        box.innerText = `${transcript} (OK!)`;
    }
    quizScore++;
    if (typeof successSound !== 'undefined' && successSound) successSound.play().catch(e=>{});
    
    setTimeout(() => { 
        if (currentMode === 'quiz') {
            currentQuizIndex++; 
            renderQuizQuestion(); 
        }
    }, 1200);
}

function handleSkip2(targetWord) {
    const box = document.getElementById('quizSpeechBox');
    if (box) {
        box.style.background = '#ffebee';
        box.style.borderColor = '#f44336';
        box.style.color = '#f44336';
        box.innerHTML = `Skipped...<br><span style="font-size:2rem; color:#333; display:block; margin-top:10px;">正解: <b>${targetWord}</b></span>`;
    }
    
    setTimeout(() => { 
        if (currentMode === 'quiz') {
            currentQuizIndex++; 
            renderQuizQuestion(); 
        }
    }, 1500);
}

function showQuizHint(letter) {
    const area = document.getElementById('quizHintArea');
    if (area) area.innerText = `ヒント: 頭文字は "${letter.toUpperCase()}" です`;
}

function renderQuizResult() {
    isQuizTransitioning = true;
    if (quizRecognition) { try { quizRecognition.stop(); } catch(e){} }

    const display = document.getElementById('targetTextDisplay');
    let percent = Math.round((quizScore / quizQuestions.length) * 100);
    display.innerHTML = `
        <div style="text-align:center; padding: 50px; font-family:'Nunito', sans-serif;">
            <div style="font-size: 2.5rem; font-weight:900; color:#333;">Quiz Result</div>
            <div style="font-size: 6rem; font-weight: 900; color: ${percent >= 80 ? '#4caf50' : '#764ba2'}; margin: 20px 0;">${percent}%</div>
            <p style="font-size: 1.8rem; font-weight:bold; color:#555;">${quizScore} / ${quizQuestions.length} Correct</p>
            <button onclick="startVocabQuiz()" style="margin-top:40px; padding: 20px 50px; font-size:1.5rem; font-weight:900; border-radius:40px; border:none; background:#333; color:white; cursor:pointer; font-family:'Noto Sans JP', sans-serif; box-shadow:0 5px 15px rgba(0,0,0,0.2);">メニューに戻る</button>
        </div>
    `;
    if (percent >= 80 && typeof fireConfetti === 'function') fireConfetti();
}