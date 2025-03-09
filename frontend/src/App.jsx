import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [spots, setSpots] = useState([]);

  const getSpots = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/spots');
      const spotData = await res.json();
      setSpots(spotData.Spots);
    }
    catch (e) {
      console.log(e);
      return [];
    }
  }

  useEffect(() => {
    getSpots();
  }, [])

  console.log(spots)
  return (
    <>
      {spots.length ? spots.map(spot => {
        // console.log(spot.name)
        return <h1>{spot.name}</h1>
      }): ''}
    </>
  )
}

export default App
