import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  :root {
    /* ダイナミック・グラデーション */
    --theme1-primary: #4A148C;
    --theme1-secondary: #FF6F00;
    --theme1-accent: #00ACC1;
    
    /* モダン・トライアド */
    --theme2-primary: #0066FF;
    --theme2-secondary: #76FF03;
    --theme2-accent: #E91E63;
    
    /* 洗練されたビジネスカラー */
    --theme3-primary: #1A237E;
    --theme3-secondary: #FFB300;
    --theme3-accent: #00BFA5;
    
    /* 現在のテーマ */
    --primary: var(--theme1-primary);
    --secondary: var(--theme1-secondary);
    --accent: var(--theme1-accent);
    
    /* 共通カラー */
    --bg-dark: #0a0a0a;
    --bg-light: #1a1a1a;
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg-dark);
    color: var(--text-primary);
    overflow-x: hidden;
    cursor: none;
  }

  /* スクロールインジケーター */
  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 50px;
    
    svg {
      width: 100%;
      height: 100%;
    }
  }

  /* セクション共通 */
  section {
    padding: 5rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-size: clamp(2rem, 5vw, 3rem);
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
  }

  /* グリッチエフェクト */
  .glitch {
    animation: glitch 2s infinite;
  }

  @keyframes glitch {
    0%, 100% {
      text-shadow: 
        0.05em 0 0 var(--secondary),
        -0.05em -0.025em 0 var(--accent),
        0.025em 0.05em 0 var(--primary);
    }
    15% {
      text-shadow: 
        0.05em 0 0 var(--secondary),
        -0.05em -0.025em 0 var(--accent),
        0.025em 0.05em 0 var(--primary);
    }
    16% {
      text-shadow: 
        -0.05em -0.025em 0 var(--secondary),
        0.025em 0.025em 0 var(--accent),
        -0.05em -0.05em 0 var(--primary);
    }
  }

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    body {
      cursor: auto;
    }
    
    .cursor,
    .cursor-dot {
      display: none;
    }
  }
`

export default GlobalStyle