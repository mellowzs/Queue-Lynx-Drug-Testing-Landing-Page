import React from 'react'
import Header from "../components/Header"
import Intro from './Intro.js'
import AboutUs from './AboutUs.js'

function index() {
  return (
    <div>
      <Header />
      <Intro />
      <AboutUs />
    </div>
  )
}

export default index