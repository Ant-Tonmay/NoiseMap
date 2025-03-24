import { useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import './App.css'

import Map from './components/Map'
import { mapOptions } from './components/MapConfiguration'


function App() {
 

  return (
    <>
      <Map/>
    </>
  )
}

export default App
