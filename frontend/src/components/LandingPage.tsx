import React from 'react'
import Header from '../components/Header'

interface LandingPageProps {
  tabs: Array<{ label: string }>
  buttons: Array<{ label: string }>
}

// function LandingPage (props: LandingPageProps) {
const LandingPage: React.FC<LandingPageProps> = ({ tabs, buttons }) => {
  return (
    <Header tabs={tabs} buttons={buttons}/>
  )
}

export default LandingPage
