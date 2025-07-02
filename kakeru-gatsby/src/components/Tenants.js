import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import gsap from "gsap"
import sunabacoLogo from "../images/sunabaco-logo.png"

const TenantsSection = styled.section`
  background: var(--bg-light);
  position: relative;
`

const FloorSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`

const FloorBtn = styled.button`
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--primary);
    transition: left 0.3s ease;
    z-index: -1;
  }

  &:hover::before,
  &.active::before {
    left: 0;
  }

  &.active {
    color: var(--text-primary);
  }
`

const TenantInfo = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
  opacity: ${props => props.active ? '1' : '0'};
  animation: ${props => props.active ? 'fadeIn 0.5s ease' : 'none'};
`

const TenantHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const TenantContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const TenantImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  ${props => props.floor === 3 && `
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  `}

  img {
    width: 100%;
    height: 100%;
    object-fit: ${props => props.floor === 3 ? 'contain' : 'cover'};
    transition: transform 0.3s ease;
    ${props => props.floor === 3 && `
      max-width: 80%;
      max-height: 80%;
    `}
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`

const TenantDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  font-family: 'Noto Serif JP', serif;

  h2 {
    color: var(--secondary);
    margin: 1.5rem 0 1rem;
    font-size: 1.1rem;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.8;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  li {
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
  }
`

const TenantName = styled.h3`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, var(--secondary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const TenantType = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
`

const Tenants = ({ tenants }) => {
  const [activeFloor, setActiveFloor] = useState(1)
  const tenantRefs = useRef([])

  useEffect(() => {
    const activeTenant = tenantRefs.current[activeFloor - 1]
    if (!activeTenant) return

    // テナント情報のアニメーション
    gsap.fromTo(activeTenant,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }
    )
  }, [activeFloor])

  // 画像のURLを取得する関数
  const getTenantImage = (floor) => {
    if (floor === 3) return sunabacoLogo
    return `https://images.unsplash.com/photo-${floor === 1 ? '1559305616-3f99cd43e353' : '1497366754035-f200968a6e72'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80`
  }

  return (
    <TenantsSection id="tenants">
      <h2 className="section-title">TENANTS</h2>
      
      <FloorSelector>
        {[1, 2, 3].map(floor => (
          <FloorBtn
            key={floor}
            className={activeFloor === floor ? 'active' : ''}
            onClick={() => setActiveFloor(floor)}
          >
            {floor}F
          </FloorBtn>
        ))}
      </FloorSelector>

      {tenants.map((tenant, index) => (
        <TenantInfo
          key={tenant.id}
          active={tenant.frontmatter.floor === activeFloor}
          ref={el => tenantRefs.current[tenant.frontmatter.floor - 1] = el}
        >
          <TenantHeader>
            <TenantName>{tenant.frontmatter.name}</TenantName>
            <TenantType>{tenant.frontmatter.type}</TenantType>
          </TenantHeader>
          <TenantContentWrapper>
            <TenantImage floor={tenant.frontmatter.floor}>
              <img 
                src={getTenantImage(tenant.frontmatter.floor)} 
                alt={`${tenant.frontmatter.name} - ${tenant.frontmatter.type}`}
              />
            </TenantImage>
            <TenantDetails>
              <div dangerouslySetInnerHTML={{ __html: tenant.html }} />
            </TenantDetails>
          </TenantContentWrapper>
        </TenantInfo>
      ))}
    </TenantsSection>
  )
}

export default Tenants