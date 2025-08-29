document.addEventListener('DOMContentLoaded', function() {
    // DOM要素の取得
    const addBtn = document.getElementById('add-btn');
    const resetBtn = document.getElementById('reset-btn');
    const randomTopBtn = document.getElementById('random-top-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('close-btn');
    const mainText = document.getElementById('main-text');
    const subtitle = document.getElementById('subtitle-text');
    const mainContainer = document.querySelector('.main-container');
    const textContainer = document.querySelector('.text-container');
    const buttonContainer = document.querySelector('.button-container');
    
    // 設定要素の取得
    const textInput = document.getElementById('text-input');
    const taglineInput = document.getElementById('tagline-input');
    const subtitleVisible = document.getElementById('subtitle-visible');
    const fontFamily = document.getElementById('font-family');
    const fontSize = document.getElementById('font-size');
    const letterSpacing = document.getElementById('letter-spacing');
    const subtextFontSize = document.getElementById('subtext-font-size');
    const subtextLetterSpacing = document.getElementById('subtext-letter-spacing');
    const textGap = document.getElementById('text-gap');
    const textColor = document.getElementById('text-color');
    const backgroundColor = document.getElementById('background-color');
    
    // 値表示要素の取得
    const fontSizeValue = document.getElementById('font-size-value');
    const letterSpacingValue = document.getElementById('letter-spacing-value');
    const subtextFontSizeValue = document.getElementById('subtext-font-size-value');
    const subtextLetterSpacingValue = document.getElementById('subtext-letter-spacing-value');
    const textGapValue = document.getElementById('text-gap-value');
    
    // カラープリセットとカスタムボタン
    const bgColorPresets = document.querySelectorAll('.color-section:first-child .color-preset');
    const textColorPresets = document.querySelectorAll('.color-section:last-child .color-preset');
    const bgCustomBtn = document.getElementById('bg-custom-btn');
    const textCustomBtn = document.getElementById('text-custom-btn');
    
    // プリセットボタン
    const presetBtns = document.querySelectorAll('.preset-btn');
    const randomBtn = document.getElementById('random-btn');
    const modalResetBtn = document.getElementById('modal-reset-btn');
    
    // ボタン自動非表示機能
    let buttonHideTimer;
    
    // ボタンを表示する関数
    function showButtons() {
        buttonContainer.classList.remove('hidden');
        clearTimeout(buttonHideTimer);
        buttonHideTimer = setTimeout(() => {
            buttonContainer.classList.add('hidden');
        }, 2000);
    }
    
    // ボタンを非表示にする関数
    function hideButtons() {
        buttonContainer.classList.add('hidden');
    }
    
    // ユーザー操作を検知してボタンを表示
    function resetButtonTimer() {
        showButtons();
    }
    
    // デフォルト値の設定
    const defaultSettings = {
        text: 'NAME',
        tagline: 'Make your name',
        subtitleVisible: true,
        fontFamily: 'Inter',
        fontSize: 48,
        letterSpacing: 6,
        subtextFontSize: 16,
        subtextLetterSpacing: 1,
        textGap: 10,
        textColor: '#1d1d1d',
        backgroundColor: '#e9e9e9'
    };
    
    // プリセット設定
    const presets = {
        minimal: {
            fontFamily: 'Inter',
            fontSize: 48, // 固定値
            letterSpacing: 6, // 固定値
            subtextFontSize: 16, // 固定値
            subtextLetterSpacing: 1, // 固定値
            textGap: 10, // 固定値
            textColor: '#1d1d1d',
            backgroundColor: '#ffffff',
            subtitleVisible: true
        },
        urban: {
            fontFamily: 'Arial',
            fontSize: 48, // 固定値
            letterSpacing: 6, // 固定値
            subtextFontSize: 16, // 固定値
            subtextLetterSpacing: 1, // 固定値
            textGap: 10, // 固定値
            textColor: '#000000',
            backgroundColor: '#e63b7a',
            subtitleVisible: true
        },
        tech: {
            fontFamily: 'Verdana',
            fontSize: 48, // 固定値
            letterSpacing: 6, // 固定値
            subtextFontSize: 16, // 固定値
            subtextLetterSpacing: 1, // 固定値
            textGap: 10, // 固定値
            textColor: '#96d35f',
            backgroundColor: '#000000',
            subtitleVisible: true
        },
        elegant: {
            fontFamily: 'Georgia',
            fontSize: 48, // 固定値
            letterSpacing: 6, // 固定値
            subtextFontSize: 16, // 固定値
            subtextLetterSpacing: 1, // 固定値
            textGap: 10, // 固定値
            textColor: '#5e30eb',
            backgroundColor: '#ebebeb',
            subtitleVisible: true
        }
    };
    
    // タイプライター効果の実装
    function typewriterEffect(element, text, speed = 100) {
        element.textContent = '';
        element.classList.remove('typewriter');
        
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(timer);
            }
        }, speed);
    }
    
    // スタイルを適用する関数
    function applyStyles(useTypewriter = false) {
        const text = textInput.value || defaultSettings.text;
        const tagline = taglineInput.value || defaultSettings.tagline;
        const fontFam = fontFamily.value;
        const fontSz = fontSize.value;
        const letterSp = letterSpacing.value;
        const subtextFontSz = subtextFontSize.value;
        const subtextLetterSp = subtextLetterSpacing.value;
        const gap = textGap.value;
        const textCol = textColor.value;
        const bgCol = backgroundColor.value;
        
        // メインテキストのスタイル適用
        mainText.style.fontFamily = fontFam;
        mainText.style.fontSize = fontSz + 'px';
        mainText.style.letterSpacing = letterSp + 'px';
        mainText.style.color = textCol;
        
        // サブテキストのスタイル適用
        subtitle.style.fontFamily = fontFam;
        subtitle.style.fontSize = subtextFontSz + 'px';
        subtitle.style.letterSpacing = subtextLetterSp + 'px';
        subtitle.style.color = textCol;
        
        // テキスト間隔の適用
        textContainer.style.gap = gap + 'px';
        
        // 背景色の適用
        document.body.style.backgroundColor = bgCol;
        
        // サブタイトルの表示/非表示
        if (subtitleVisible.checked) {
            subtitle.parentElement.classList.remove('hidden');
            subtitle.textContent = tagline;
        } else {
            subtitle.parentElement.classList.add('hidden');
        }
        
        // テキストの更新（タイプライター効果は特定の場合のみ）
        if (useTypewriter && mainText.textContent !== text) {
            typewriterEffect(mainText, text);
        } else {
            mainText.textContent = text;
        }
        
        // 値表示の更新
        fontSizeValue.textContent = fontSz + 'px';
        letterSpacingValue.textContent = letterSp + 'px';
        subtextFontSizeValue.textContent = subtextFontSz + 'px';
        subtextLetterSpacingValue.textContent = subtextLetterSp + 'px';
        textGapValue.textContent = gap + 'px';
    }
    
    // カラープリセット選択の更新
    function updateColorPresetSelection() {
        const currentBgColor = backgroundColor.value.toLowerCase();
        const currentTextColor = textColor.value.toLowerCase();
        
        // 背景色プリセットの選択状態更新
        bgColorPresets.forEach(preset => {
            const presetColor = preset.dataset.color.toLowerCase();
            if (presetColor === currentBgColor) {
                preset.classList.add('selected');
            } else {
                preset.classList.remove('selected');
            }
        });
        
        // テキスト色プリセットの選択状態更新
        textColorPresets.forEach(preset => {
            const presetColor = preset.dataset.color.toLowerCase();
            if (presetColor === currentTextColor) {
                preset.classList.add('selected');
            } else {
                preset.classList.remove('selected');
            }
        });
    }
    
    // 設定値をUIに反映する関数
    function updateUI(settings) {
        textInput.value = settings.text;
        taglineInput.value = settings.tagline;
        subtitleVisible.checked = settings.subtitleVisible !== undefined ? settings.subtitleVisible : true;
        fontFamily.value = settings.fontFamily;
        fontSize.value = settings.fontSize;
        letterSpacing.value = settings.letterSpacing;
        subtextFontSize.value = settings.subtextFontSize;
        subtextLetterSpacing.value = settings.subtextLetterSpacing;
        textGap.value = settings.textGap;
        textColor.value = settings.textColor;
        backgroundColor.value = settings.backgroundColor;
        
        updateColorPresetSelection();
        applyStyles(true);
    }
    
    // 色の輝度を計算する関数
    function getLuminance(color) {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }
    
    // 色のコントラスト比を計算する関数
    function getContrastRatio(color1, color2) {
        const lum1 = getLuminance(color1);
        const lum2 = getLuminance(color2);
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        return (brightest + 0.05) / (darkest + 0.05);
    }
    
    // 十分なコントラストがある色のペアを生成する関数
    function generateContrastingColors() {
        const colors = ['#ebebeb', '#000000', '#5e30eb', '#e63b7a', '#96d35f'];
        let backgroundColor, textColor;
        let attempts = 0;
        const maxAttempts = 50;
        
        do {
            backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            textColor = colors[Math.floor(Math.random() * colors.length)];
            attempts++;
        } while (getContrastRatio(backgroundColor, textColor) < 3.0 && attempts < maxAttempts);
        
        // 十分なコントラストが得られない場合は、確実に見える組み合わせを使用
        if (getContrastRatio(backgroundColor, textColor) < 3.0) {
            if (getLuminance(backgroundColor) > 0.5) {
                textColor = '#000000'; // 明るい背景には黒文字
            } else {
                textColor = '#ebebeb'; // 暗い背景には明るい文字
            }
        }
        
        return { backgroundColor, textColor };
    }
    
    // ランダム設定生成
    function generateRandomSettings() {
        const fonts = ['Inter', 'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana'];
        const { backgroundColor, textColor } = generateContrastingColors();
        
        return {
            text: textInput.value || 'NAME',
            tagline: taglineInput.value || 'Make your name',
            subtitleVisible: subtitleVisible.checked,
            fontFamily: fonts[Math.floor(Math.random() * fonts.length)],
            fontSize: 48, // 固定値
            letterSpacing: 6, // 固定値
            subtextFontSize: 16, // 固定値
            subtextLetterSpacing: 1, // 固定値
            textGap: 10, // 固定値
            textColor: textColor,
            backgroundColor: backgroundColor
        };
    }
    
    // モーダルを開く
    function openModal() {
        modalOverlay.classList.add('show');
    }
    
    // モーダルを閉じる
    function closeModal() {
        modalOverlay.classList.remove('show');
    }
    
    // リセット機能
    function resetSettings() {
        updateUI(defaultSettings);
    }
    
    // イベントリスナーの設定
    addBtn.addEventListener('click', openModal);
    resetBtn.addEventListener('click', resetSettings);
    closeBtn.addEventListener('click', closeModal);
    modalResetBtn.addEventListener('click', resetSettings);
    
    // モーダル外をクリックして閉じる
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // 設定変更時のリアルタイム更新
    textInput.addEventListener('input', function() {
        applyStyles(false);
    });
    taglineInput.addEventListener('input', function() {
        applyStyles(false);
    });
    subtitleVisible.addEventListener('change', function() {
        applyStyles(false);
    });
    fontFamily.addEventListener('change', function() {
        applyStyles(false);
    });
    fontSize.addEventListener('input', function() {
        applyStyles(false);
    });
    letterSpacing.addEventListener('input', function() {
        applyStyles(false);
    });
    subtextFontSize.addEventListener('input', function() {
        applyStyles(false);
    });
    subtextLetterSpacing.addEventListener('input', function() {
        applyStyles(false);
    });
    textGap.addEventListener('input', function() {
        applyStyles(false);
    });
    textColor.addEventListener('input', function() {
        applyStyles(false);
        updateColorPresetSelection();
    });
    backgroundColor.addEventListener('input', function() {
        applyStyles(false);
        updateColorPresetSelection();
    });
    
    // カラープリセットのイベントリスナー
    bgColorPresets.forEach(preset => {
        preset.addEventListener('click', function() {
            backgroundColor.value = this.dataset.color;
            applyStyles();
            updateColorPresetSelection();
        });
    });
    
    textColorPresets.forEach(preset => {
        preset.addEventListener('click', function() {
            textColor.value = this.dataset.color;
            applyStyles();
            updateColorPresetSelection();
        });
    });
    
    // カスタムカラーボタン
    bgCustomBtn.addEventListener('click', function() {
        backgroundColor.click();
    });
    
    textCustomBtn.addEventListener('click', function() {
        textColor.click();
    });
    
    // プリセットボタンのイベントリスナー
    presetBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const presetName = this.dataset.preset;
            const presetSettings = { 
                ...presets[presetName],
                text: textInput.value || defaultSettings.text,
                tagline: taglineInput.value || defaultSettings.tagline
            };
            
            // プリセットボタンの選択状態更新
            presetBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            
            updateUI(presetSettings);
        });
    });
    
    // ランダムボタン（モーダル内）
    randomBtn.addEventListener('click', function() {
        const randomSettings = generateRandomSettings();
        
        // プリセットボタンの選択状態をクリア
        presetBtns.forEach(b => b.classList.remove('selected'));
        
        updateUI(randomSettings);
    });
    
    // ランダムボタン（トップページ）
    randomTopBtn.addEventListener('click', function() {
        const randomSettings = generateRandomSettings();
        
        // プリセットボタンの選択状態をクリア
        presetBtns.forEach(b => b.classList.remove('selected'));
        
        updateUI(randomSettings);
        resetButtonTimer();
    });
    
    // ホバー効果を削除（ボタン位置ずれ防止）
    
    // ダブルクリックでモーダルを開く
    mainContainer.addEventListener('dblclick', openModal);
    
    // 中央テキストの直接編集機能
    mainText.addEventListener('input', function() {
        textInput.value = this.textContent;
        resetButtonTimer();
    });
    
    subtitle.addEventListener('input', function() {
        taglineInput.value = this.textContent;
        resetButtonTimer();
    });
    
    // Enterキーで編集完了
    mainText.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.blur();
        }
    });
    
    subtitle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.blur();
        }
    });
    
    // ユーザー操作でボタンを表示するイベントリスナー
    document.addEventListener('mousemove', resetButtonTimer);
    document.addEventListener('click', resetButtonTimer);
    document.addEventListener('keydown', resetButtonTimer);
    document.addEventListener('touchstart', resetButtonTimer);
    document.addEventListener('scroll', resetButtonTimer);
    
    // ページ読み込み時の初期化
    setTimeout(() => {
        updateUI(defaultSettings);
        showButtons(); // 初期表示
    }, 100);
});