// ==========================================
// unitData.js: Treasure Hunt 教材データ
// ==========================================

// --- スクリプトデータ (Scripts) ---
const unitScripts = {
    // ==========================================
    // Unit 1
    // ==========================================
    U01_P1_p1: "E-mail and the Internet have made the world smaller. Today, at your house or office, you can see news and shows from all around the world. You can also talk to people in foreign countries by using the Internet.",
    U01_P1_p2: "But does this new technology have any bad points? Yes, it does. These days, people spend much more time using the Internet than before. Some people sit in front of a computer all day. They do not try to meet people. But of course, face-to-face communication is sometimes necessary.",
    U01_P1_p3: "For example, what do you do if your friend is feeling down? You don’t need words to cheer up your friend. Just hug him or her. You cannot do this by sending e-mails. It is often difficult to touch someone’s heart with only text messages.",
    U01_P1_p4: "E-mail and the Internet have made communication easier. However, because of their convenience, we often forget that there are some other ways of communication.",
    U01_P1_p5: "Remember that even a smile can work much better than e-mails.",
    U01_P1_full: "E-mail and the Internet have made the world smaller. Today, at your house or office, you can see news and shows from all around the world. You can also talk to people in foreign countries by using the Internet. But does this new technology have any bad points? Yes, it does. These days, people spend much more time using the Internet than before. Some people sit in front of a computer all day. They do not try to meet people. But of course, face-to-face communication is sometimes necessary. For example, what do you do if your friend is feeling down? You don’t need words to cheer up your friend. Just hug him or her. You cannot do this by sending e-mails. It is often difficult to touch someone’s heart with only text messages. E-mail and the Internet have made communication easier. However, because of their convenience, we often forget that there are some other ways of communication. Remember that even a smile can work much better than e-mails."
};

// --- 和訳データ (Japanese Translations) ---
const unitTranslations = {
    // ==========================================
    // Unit 1
    // ==========================================
    U01_P1_p1: "Eメールとインターネットは世界をより小さくしました。今日では、自宅やオフィスにいながら、世界中のニュースや番組を見ることができます。また、インターネットを使って外国の人々と話すこともできます。",
    U01_P1_p2: "しかし、この新しい技術には悪い点があるのでしょうか。はい、あります。最近では、人々は以前よりもずっと多くの時間をインターネットを使って過ごしています。一日中コンピューターの前に座っている人もいます。彼らは人と会おうとしません。しかしもちろん、対面でのコミュニケーションが時には必要です。",
    U01_P1_p3: "例えば、もし友達が落ち込んでいる時、あなたはどうしますか。友達を元気づけるのに言葉は必要ありません。ただハグしてあげるだけです。これはEメールを送ることではできません。テキストメッセージだけで誰かの心に触れることはしばしば困難です。",
    U01_P1_p4: "Eメールとインターネットはコミュニケーションをより簡単にしました。しかし、その便利さゆえに、私たちは他のコミュニケーションの方法があることをしばしば忘れてしまいます。",
    U01_P1_p5: "笑顔でさえ、Eメールよりもずっと効果的であることを忘れないでください。",
    U01_P1_full: "Eメールとインターネットは世界をより小さくしました。今日では、自宅やオフィスにいながら、世界中のニュースや番組を見ることができます。また、インターネットを使って外国の人々と話すこともできます。<br><br>しかし、この新しい技術には悪い点があるのでしょうか。はい、あります。最近では、人々は以前よりもずっと多くの時間をインターネットを使って過ごしています。一日中コンピューターの前に座っている人もいます。彼らは人と会おうとしません。しかしもちろん、対面でのコミュニケーションが時には必要です。<br><br>例えば、もし友達が落ち込んでいる時、あなたはどうしますか。友達を元気づけるのに言葉は必要ありません。ただハグしてあげるだけです。これはEメールを送ることではできません。テキストメッセージだけで誰かの心に触れることはしばしば困難です。<br><br>Eメールとインターネットはコミュニケーションをより簡単にしました。しかし、その便利さゆえに、私たちは他のコミュニケーションの方法があることをしばしば忘れてしまいます。<br><br>笑顔でさえ、Eメールよりもずっと効果的であることを忘れないでください。"
};

// --- 単語データ (Vocabulary) ---
const unitVocab = {
    // ==========================================
    // Unit 1
    // ==========================================
    U01_P1: [
        { word: "e-mail", targetStrings: ["e-mail", "e-mails"], meaning: "Eメール", pronunciation: "ˈiː.meɪl" },
        { word: "Internet", targetStrings: ["Internet"], meaning: "インターネット", pronunciation: "ˈɪn.tə.net" },
        { word: "technology", targetStrings: ["technology"], meaning: "技術", pronunciation: "tekˈnɒl.ə.dʒi" },
        { word: "these days", targetStrings: ["these days"], meaning: "このごろ", pronunciation: "ðiːz deɪz" },
        { word: "all day", targetStrings: ["all day"], meaning: "一日中", pronunciation: "ɔːl deɪ" },
        { word: "communication", targetStrings: ["communication"], meaning: "コミュニケーション", pronunciation: "kəˌmjuː.nɪˈkeɪ.ʃən" },
        { word: "feeling down", targetStrings: ["feeling down", "feel down"], meaning: "落ち込んでいる、元気がない", pronunciation: "ˈfiː.lɪŋ daʊn" },
        { word: "cheer up", targetStrings: ["cheer up"], meaning: "…を励ます", pronunciation: "tʃɪər ʌp" },
        { word: "because of", targetStrings: ["because of"], meaning: "…のために", pronunciation: "bɪˈkɒz əv" },
        { word: "convenience", targetStrings: ["convenience"], meaning: "便利さ", pronunciation: "kənˈviː.ni.əns" }
    ]
};

// ==========================================
// ★ 自動「工事中」設定スクリプト
// Unit 2 〜 15 までは、データが入るまで自動的に「工事中です」と表示させます。
// （※後日データを追加する際は、ここより上に通常のデータを書き込めば上書きされます）
// ==========================================
for (let u = 2; u <= 15; u++) {
    let uStr = "U" + String(u).padStart(2, '0');
    // とりあえずPart1〜4、各5パラグラフ分を「工事中」で埋めておきます
    for (let p = 1; p <= 4; p++) {
        unitScripts[`${uStr}_P${p}_full`] = "※現在、このUnitは工事中です。";
        unitTranslations[`${uStr}_P${p}_full`] = "※現在、このUnitは工事中です。";
        for (let para = 1; para <= 5; para++) {
            unitScripts[`${uStr}_P${p}_p${para}`] = "※現在、このUnitは工事中です。";
            unitTranslations[`${uStr}_P${p}_p${para}`] = "※現在、このUnitは工事中です。";
        }
    }
}