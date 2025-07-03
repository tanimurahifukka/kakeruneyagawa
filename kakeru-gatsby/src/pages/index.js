import React, { useEffect } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import Values from "../components/Values"
import Events from "../components/Events"
import Tenants from "../components/Tenants"
import Footer from "../components/Footer"
import ParticleBackground from "../components/ParticleBackground"
import CustomCursor from "../components/CustomCursor"

const MainContent = styled.div`
  position: relative;
  z-index: 10;
`

const IndexPage = ({ data }) => {
  useEffect(() => {
    // GSAPアニメーションの初期化
    if (typeof window !== "undefined") {
      const gsap = require("gsap").default
      const ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger
      
      // ScrollTriggerのリフレッシュ
      ScrollTrigger.refresh()
    }
  }, [])

  const values = data.values.edges.map(edge => edge.node)
  const events = data.events.edges.map(edge => edge.node)
  const tenants = data.tenants.edges.map(edge => edge.node)

  return (
    <Layout>
      <ParticleBackground />
      <CustomCursor />
      <MainContent>
        <Hero />
        <Values values={values} />
        <Events events={events} />
        <Tenants tenants={tenants} />
        <Footer />
      </MainContent>
    </Layout>
  )
}

export const query = graphql`
  query HomePageQuery {
    values: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/values/" } }
      sort: { frontmatter: { order: ASC } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            kanji
            order
          }
        }
      }
    }
    events: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/events/" } }
      sort: { frontmatter: { order: ASC } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            date
            title
            location
            time
            tags
            order
          }
        }
      }
    }
    tenants: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/tenants/" } }
      sort: { frontmatter: { order: ASC } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            floor
            name
            type
            order
          }
        }
      }
    }
  }
`

export default IndexPage

export const Head = () => (
  <>
    <title>KAKERU NEYAGAWA - 掛ける×架ける×駆ける＝無限の可能性</title>
    <meta name="description" content="大阪府寝屋川市にある雑居ビル。異業種が集まり新たな価値を創造する場として、Cafe 6D、レンタルスペース、プログラミングスクールが入居。" />
  </>
)