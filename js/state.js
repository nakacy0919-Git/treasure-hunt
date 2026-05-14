// ==========================================
// state.js: 状態管理・共通変数 (Treasure Hunt版)
// ==========================================
let currentUnit = 1;
let currentKey = "U01_P1_full";
let currentScore = 0;
let currentMode = ''; 
let isScriptOpen = false;
let isJapaneseOpen = false;

// フォントサイズ管理
let engFontSize = 24;
let jpnFontSize = 20;
let recFontSize = 28;

let targetText = "";
let recordStartTime = 0;
let lastSpokenText = "";

// js/state.js の unitStructure 部分を以下で上書きしてください
const unitStructure = {
    1: { 1: [1,2,3,4,5] },
    2: { 1: [1] },
    3: { 1: [1] },
    4: { 1: [1,2,3] },
    5: { 1: [1,2,3,4] },
    6: { 1: [1,2,3,4] },
    7: { 1: [1,2,3,4,5] },
    8: { 1: [1,2,3,4,5,6] },
    9: { 1: [1,2,3,4] },     // Unit 9 は 4段落
    10: { 1: [1,2,3,4,5] },  // Unit 10 は 5段落
    11: { 1: [1,2,3,4] },    // Unit 11 は 4段落
    12: { 1: [1,2,3,4] },    // Unit 12 は 4段落
    13: { 1: [1,2,3] },      // Unit 13 は 3段落
    14: { 1: [1,2,3,4] },    // Unit 14 は 4段落
    15: { 1: [1,2,3,4] }     // Unit 15 は 4段落
};

// オーディオ要素
let audioPlayer = document.getElementById('mainAudioPlayer');
let successSound = document.getElementById('successSound');