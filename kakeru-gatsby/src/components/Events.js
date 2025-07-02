import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const EventsSection = styled.section`
  background: var(--bg-dark);
  position: relative;
`

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
`

const EventCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  opacity: 1 !important;
  visibility: visible !important;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, var(--primary), var(--secondary), var(--accent));
    border-radius: 20px;
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: transparent;
  }

  &:hover::before {
    opacity: 0.3;
  }
`

const EventDate = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--primary);
  color: var(--text-primary);
  border-radius: 25px;
  font-weight: bold;
  margin-bottom: 1rem;
`

const EventTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--secondary);
`

const EventLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
`

const EventTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
`

const EventDescription = styled.div`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`

const EventTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const EventTag = styled.span`
  padding: 0.3rem 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  font-size: 0.8rem;
  color: var(--accent);
`

const Events = ({ events }) => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return

    // イベントカードのアニメーション
    cardsRef.current.forEach((card, i) => {
      if (!card) return

      // 初期状態を設定
      gsap.set(card, { opacity: 1, y: 0, scale: 1 })
      
      const cardElements = {
        date: card.querySelector('.event-date'),
        location: card.querySelectorAll('.event-location, .event-time, .event-description'),
        tags: card.querySelectorAll('.event-tag')
      }

      Object.values(cardElements).flat().forEach(el => {
        if (el) gsap.set(el, { opacity: 1 })
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none none",
          once: true
        }
      })
      .from(card, {
        duration: 1,
        y: 50,
        opacity: 0,
        scale: 0.9,
        delay: i * 0.15,
        ease: "power3.out"
      })
      .from(cardElements.date, {
        duration: 0.5,
        x: -20,
        opacity: 0,
        ease: "power2.out"
      }, "-=0.5")
      .from(cardElements.location, {
        duration: 0.6,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3")
      .from(cardElements.tags, {
        duration: 0.4,
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        ease: "back.out(1.7)"
      }, "-=0.2")
    })
  }, [events])

  return (
    <EventsSection ref={sectionRef} id="events">
      <h2 className="section-title">UPCOMING EVENTS</h2>
      <EventsGrid>
        {events.map((event, index) => (
          <EventCard key={event.id} ref={el => cardsRef.current[index] = el}>
            <EventDate className="event-date">{event.frontmatter.date}</EventDate>
            <EventTitle>{event.frontmatter.title}</EventTitle>
            <EventLocation className="event-location">
              <span>📍</span>
              <span>{event.frontmatter.location}</span>
            </EventLocation>
            <EventTime className="event-time">
              <span>🕐</span>
              <span>{event.frontmatter.time}</span>
            </EventTime>
            <EventDescription className="event-description" dangerouslySetInnerHTML={{ __html: event.html }} />
            <EventTags>
              {event.frontmatter.tags.map((tag, index) => (
                <EventTag key={index} className="event-tag">{tag}</EventTag>
              ))}
            </EventTags>
          </EventCard>
        ))}
      </EventsGrid>
    </EventsSection>
  )
}

export default Events