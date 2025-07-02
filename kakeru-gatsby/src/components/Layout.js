import React from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet"

const LayoutWrapper = styled.div`
  min-height: 100vh;
  position: relative;
`

const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&family=Noto+Serif+JP:wght@900&display=swap" rel="stylesheet" />
      </Helmet>
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
    </>
  )
}

export default Layout