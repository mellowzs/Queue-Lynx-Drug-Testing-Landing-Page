import React from 'react'
import Header from "../components/Header"
import Intro from './Intro.js'
import AboutUs from './AboutUs.js'
import ContactUs from './ContactUs.js'
import Footer from '../components/Footer.js'

function index() {
  return (
    <div>
      <Header />
      <Intro />
      <AboutUs />
      <ContactUs />
      <Footer />
    </div>
  )
}

export default index