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
const unitStructure = {
    1: { 1: [1,2,3,4,5] }, // Unit 1 は Part 1 のみで、パラグラフが5つ
    2: { 1: [1,2,3,4,5] }, // 以降も、工事中表示用にとりあえず枠だけ用意
    3: { 1: [1,2,3,4,5] },
    4: { 1: [1,2,3,4,5] },
    5: { 1: [1,2,3,4,5] },
    6: { 1: [1,2,3,4,5] },
    7: { 1: [1,2,3,4,5] },
    8: { 1: [1,2,3,4,5] },
    9: { 1: [1,2,3,4,5] },
    10: { 1: [1,2,3,4,5] },
    11: { 1: [1,2,3,4,5] },
    12: { 1: [1,2,3,4,5] },
    13: { 1: [1,2,3,4,5] },
    14: { 1: [1,2,3,4,5] },
    15: { 1: [1,2,3,4,5] }
};

// オーディオ要素
let audioPlayer = document.getElementById('mainAudioPlayer');
let successSound = document.getElementById('successSound');