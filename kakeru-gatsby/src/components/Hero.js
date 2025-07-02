import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import gsap from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import heroBg from "../images/hero-bg.jpg"

gsap.registerPlugin(TextPlugin)

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const HeroBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${heroBg});
  background-size: cover;
  background-position: center;
  opacity: 0.3;
  filter: blur(2px) brightness(0.7);
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, 
      rgba(10, 10, 10, 0.7) 0%, 
      rgba(10, 10, 10, 0.5) 50%, 
      rgba(10, 10, 10, 0.8) 100%);
  }
`

const MorphShape = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.3;
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
`

const HeroTitle = styled.h1`
  font-family: 'Noto Serif JP', serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
`

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: var(--text-secondary);
  margin-bottom: 2rem;
`

const HeroTagline = styled.p`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  background: linear-gradient(45deg, var(--primary), var(--secondary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 3rem;
  animation: gradient-shift 5s ease infinite;
  background-size: 200% 200%;
`

const ScrollIndicator = styled.div`
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
`

const Hero = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const taglineRef = useRef(null)
  const morph1Ref = useRef(null)
  const morph2Ref = useRef(null)

  useEffect(() => {
    // タイトルアニメーション - 文字を分割してアニメーション
    if (titleRef.current) {
      const title = titleRef.current
      const text = title.innerText
      title.innerHTML = ''
      
      // 各文字をspanで包む
      text.split('').forEach((char, i) => {
        const span = document.createElement('span')
        span.textContent = char
        span.style.display = 'inline-block'
        title.appendChild(span)
      })
      
      // グリッチエフェクトを追加
      title.classList.add('glitch')
      
      // 文字ごとにアニメーション
      gsap.from(title.children, {
        duration: 0.5,
        opacity: 0,
        scale: 0.5,
        y: 50,
        stagger: 0.02,
        ease: "back.out(1.7)"
      })
    }

    // サブタイトルアニメーション
    if (subtitleRef.current) {
      gsap.from(subtitleRef.current, {
        duration: 1,
        opacity: 0,
        y: 30,
        delay: 0.5,
        ease: "power3.out"
      })
    }

    // タグラインアニメーション
    if (taglineRef.current) {
      gsap.from(taglineRef.current, {
        duration: 1,
        opacity: 0,
        scale: 0.8,
        delay: 0.8,
        ease: "power3.out"
      })
    }

    // モーフィングシェイプアニメーション
    if (morph1Ref.current && morph2Ref.current) {
      gsap.to(morph1Ref.current, {
        x: "random(-300, 300)",
        y: "random(-300, 300)",
        duration: "random(10, 15)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      gsap.to(morph2Ref.current, {
        x: "random(-300, 300)",
        y: "random(-300, 300)",
        duration: "random(15, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    }

    // スクロールインジケーターのバウンスアニメーション
    gsap.to('.scroll-indicator', {
      y: 20,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    })
  }, [])

  return (
    <HeroSection>
      <HeroBg />
      <MorphShape ref={morph1Ref} style={{ top: '20%', left: '10%' }} />
      <MorphShape ref={morph2Ref} style={{ bottom: '20%', right: '10%' }} />
      <HeroContent>
        <HeroTitle ref={titleRef}>KAKERU NEYAGAWA</HeroTitle>
        <HeroSubtitle ref={subtitleRef}>大阪府寝屋川市にできた新しい拠点</HeroSubtitle>
        <HeroTagline ref={taglineRef}>掛ける×架ける×駆ける＝無限の可能性</HeroTagline>
      </HeroContent>
      <ScrollIndicator className="scroll-indicator">
        <svg width="30" height="50" viewBox="0 0 30 50">
          <rect x="10" y="10" width="10" height="20" rx="5" stroke="white" strokeWidth="2" fill="none"/>
          <circle cx="15" cy="20" r="3" fill="white">
            <animate attributeName="cy" from="15" to="25" dur="1s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </ScrollIndicator>
    </HeroSection>
  )
}

export default Hero