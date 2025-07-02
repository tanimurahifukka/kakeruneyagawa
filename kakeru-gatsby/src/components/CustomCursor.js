import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import gsap from "gsap"

const Cursor = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;
  border: 2px solid var(--secondary);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease;
  mix-blend-mode: difference;

  @media (max-width: 768px) {
    display: none;
  }
`

const CursorDot = styled.div`
  position: fixed;
  width: 4px;
  height: 4px;
  background: var(--accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;

  @media (max-width: 768px) {
    display: none;
  }
`

const CursorTrail = styled.div`
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.5;
  background: var(--secondary);
`

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const cursorTrailsRef = useRef([])

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current

    if (!cursor || !cursorDot) return

    // カーソルトレイル効果を作成
    const trails = []
    for (let i = 0; i < 5; i++) {
      const trail = document.createElement('div')
      trail.style.cssText = `
        position: fixed;
        width: ${20 - i * 3}px;
        height: ${20 - i * 3}px;
        border-radius: 50%;
        background: var(--secondary);
        pointer-events: none;
        z-index: ${9998 - i};
        opacity: ${0.5 - i * 0.1};
      `
      document.body.appendChild(trail)
      trails.push(trail)
      cursorTrailsRef.current.push(trail)
    }

    const moveCursor = (e) => {
      cursor.style.left = e.clientX - 10 + 'px'
      cursor.style.top = e.clientY - 10 + 'px'
      cursorDot.style.left = e.clientX - 2 + 'px'
      cursorDot.style.top = e.clientY - 2 + 'px'

      // トレイル効果
      trails.forEach((trail, index) => {
        gsap.to(trail, {
          x: e.clientX - trail.offsetWidth / 2,
          y: e.clientY - trail.offsetHeight / 2,
          duration: 0.1 + index * 0.05,
          ease: "power2.out"
        })
      })
    }

    document.addEventListener('mousemove', moveCursor)

    // ホバー効果の強化
    const addHoverEffect = () => {
      const links = document.querySelectorAll('a, button, .event-card, .value-card')
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          gsap.to(cursor, { scale: 1.5, duration: 0.3 })
          gsap.to(trails, { scale: 1.5, duration: 0.3, stagger: 0.02 })
        })
        link.addEventListener('mouseleave', () => {
          gsap.to(cursor, { scale: 1, duration: 0.3 })
          gsap.to(trails, { scale: 1, duration: 0.3, stagger: 0.02 })
        })
      })
    }

    // 初回実行とMutationObserverでの監視
    addHoverEffect()
    const observer = new MutationObserver(addHoverEffect)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      observer.disconnect()
      trails.forEach(trail => trail.remove())
    }
  }, [])

  return (
    <>
      <Cursor ref={cursorRef} />
      <CursorDot ref={cursorDotRef} />
    </>
  )
}

export default CustomCursor