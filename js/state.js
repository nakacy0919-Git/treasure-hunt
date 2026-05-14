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

// ★ Unit 1〜15の構造データ
// ※今回のTreasure Huntは「各Unitにつき Part 1のみで構成」されています。
// js/state.js 内の unitStructure の修正
const unitStructure = {
    1: { 1: [1,2,3,4,5] },
    2: { 1: [1] },         // Unit 2 は会話文なので Full text のみ
    3: { 1: [1] },         // Unit 3 は会話文なので Full text のみ
    4: { 1: [1,2,3] },     // Unit 4 は 3段落
    5: { 1: [1,2,3,4] },   // Unit 5 は 4段落
    6: { 1: [1,2,3,4] },   // Unit 6 は 4段落
    7: { 1: [1,2,3,4,5] }, // Unit 7 は 5段落
    8: { 1: [1,2,3,4,5,6] }, // Unit 8 は 6段落
    9: { 1: [1] },
    10: { 1: [1] },
    11: { 1: [1] },
    12: { 1: [1] },
    13: { 1: [1] },
    14: { 1: [1] },
    15: { 1: [1] }
};

// オーディオ要素
let audioPlayer = document.getElementById('mainAudioPlayer');
let successSound = document.getElementById('successSound');