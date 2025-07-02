import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const ValuesSection = styled.section`
  background: var(--bg-light);
  position: relative;
  overflow: hidden;
`


const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 2;
`

const ValueCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  transform-perspective: 1000px;

  &:hover {
    transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    border-color: var(--secondary);
  }

  &::before {
    content: attr(data-kanji);
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 150px;
    font-family: 'Noto Serif JP', serif;
    opacity: 0.1;
    z-index: 0;
    color: var(--secondary);
    font-weight: 900;
    transition: all 0.3s ease;
  }

  &:hover::before {
    opacity: 0.2;
    transform: scale(1.1) rotate(5deg);
  }
`

const ValueContent = styled.div`
  position: relative;
  z-index: 1;
`

const ValueTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--secondary);
`

const ValueDescription = styled.div`
  color: var(--text-secondary);
  line-height: 1.8;
  font-family: 'Noto Serif JP', serif;
`

const Values = ({ values }) => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return

    // セクションタイトルのアニメーション
    const title = sectionRef.current.querySelector('.section-title')
    if (title) {
      gsap.timeline({
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
      .from(title, {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out"
      })
    }

    // バリューカードの3Dアニメーション
    cardsRef.current.forEach((card, i) => {
      if (!card) return

      // 初期状態を設定
      gsap.set(card, { opacity: 1, scale: 1, rotateY: 0 })
      
      const content = card.querySelector('.value-content')
      if (content) {
        gsap.set(content, { opacity: 1, y: 0 })
      }

      // スクロールトリガーアニメーション
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none none"
        }
      })

      tl.from(card, {
        duration: 1.5,
        rotateY: 90,
        opacity: 0,
        scale: 0.5,
        delay: i * 0.2,
        ease: "back.out(1.7)",
        transformPerspective: 1000
      })
      .from(content, {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power2.out"
      }, "-=0.8")

      // マウス追従3D効果
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        
        const rotateX = (y - centerY) / 10
        const rotateY = (centerX - x) / 10
        
        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 1000,
          transformOrigin: "center center"
        })
      })
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out"
        })
      })
    })
  }, [values])

  return (
    <ValuesSection ref={sectionRef} id="values">
      <h2 className="section-title">THREE VALUES</h2>
      <ValuesGrid>
        {values.map((value, index) => (
          <ValueCard 
            key={value.id} 
            data-kanji={value.frontmatter.kanji}
            ref={el => cardsRef.current[index] = el}
          >
            <ValueContent className="value-content">
              <ValueTitle>{value.frontmatter.title}</ValueTitle>
              <ValueDescription dangerouslySetInnerHTML={{ __html: value.html }} />
            </ValueContent>
          </ValueCard>
        ))}
      </ValuesGrid>
    </ValuesSection>
  )
}

export default Values