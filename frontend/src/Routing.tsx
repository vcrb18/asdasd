import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/Header'
import CustomizedTables from './components/Tables'

function Routing () {
  const landingPageTabs = [
    { label: 'Sobre Nosotros' },
    { label: 'Contactanos' }
  ]

  const landingPageButtons = [
    { label: 'Iniciar Sesión' },
    { label: 'Registrarse' }
  ]

  return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage tabs={landingPageTabs} buttons={landingPageButtons}/>}/>
                <Route path="/examenes" element={<CustomizedTables/>}/>
            </Routes>
        </BrowserRouter>
  )
}

export default Routing
