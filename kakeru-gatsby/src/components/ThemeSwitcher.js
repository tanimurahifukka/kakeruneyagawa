import React from "react"
import styled from "styled-components"

const ThemeSwitcherWrapper = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;
  display: flex;
  gap: 0.5rem;
`

const ThemeBtn = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &.active {
    border-color: #fff;
  }

  &:hover {
    transform: scale(1.1);
  }

  &[data-theme="1"] {
    background: linear-gradient(45deg, #4A148C, #FF6F00, #00ACC1);
  }

  &[data-theme="2"] {
    background: linear-gradient(45deg, #0066FF, #76FF03, #E91E63);
  }

  &[data-theme="3"] {
    background: linear-gradient(45deg, #1A237E, #FFB300, #00BFA5);
  }
`

const ThemeSwitcher = () => {
  const [activeTheme, setActiveTheme] = React.useState(1)

  const switchTheme = (theme) => {
    setActiveTheme(theme)
    
    const root = document.documentElement
    root.style.setProperty('--primary', `var(--theme${theme}-primary)`)
    root.style.setProperty('--secondary', `var(--theme${theme}-secondary)`)
    root.style.setProperty('--accent', `var(--theme${theme}-accent)`)
  }

  return (
    <ThemeSwitcherWrapper>
      {[1, 2, 3].map(theme => (
        <ThemeBtn
          key={theme}
          data-theme={theme}
          className={activeTheme === theme ? 'active' : ''}
          onClick={() => switchTheme(theme)}
          title={`テーマ${theme}`}
        />
      ))}
    </ThemeSwitcherWrapper>
  )
}

export default ThemeSwitcher