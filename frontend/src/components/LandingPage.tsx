import React from 'react'
import Header from '../components/Header';

interface LandingPageProps {
    tabs: Array<{ label: string }>
    buttons: Array<{ label: string }>
}

function LandingPage(props: LandingPageProps) {

  return (
    <Header tabs={props.tabs} buttons={props.buttons}/>
  )
}

export default LandingPage;