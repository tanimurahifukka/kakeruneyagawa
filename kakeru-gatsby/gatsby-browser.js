import React from "react"
import GlobalStyle from "./src/styles/GlobalStyle"

export const wrapRootElement = ({ element }) => (
  <>
    <GlobalStyle />
    {element}
  </>
)

// GSAPの初期化
export const onClientEntry = () => {
  // GSAPのプラグインを登録
  if (typeof window !== "undefined") {
    const gsap = require("gsap").default
    const ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger
    const TextPlugin = require("gsap/TextPlugin").TextPlugin
    const CustomEase = require("gsap/CustomEase").CustomEase
    const ScrollToPlugin = require("gsap/ScrollToPlugin").ScrollToPlugin
    
    gsap.registerPlugin(ScrollTrigger, TextPlugin, CustomEase, ScrollToPlugin)
  }
}