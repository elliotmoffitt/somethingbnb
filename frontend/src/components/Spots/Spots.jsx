import { useState, useEffect } from 'react';
import './Spots.css'
import { loadSpots } from '../../store/spotReducer';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpots } from '../../store/spotReducer';
import Spot from '../Spot';

const Spots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spotState.entries)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchSpots())
        setIsLoaded(true)
    }, [dispatch]);
    // console.log(spots,)
    // const [spots, setSpots] = useState([]);

    // const getSpots = async () => {
    //   try {
    //     const res = await fetch('http://localhost:8000/api/spots');
    //     const spotData = await res.json();
    //     setSpots(spotData.Spots);
    //   }
    //   catch (e) {
    //     console.log(e);
    //     return [];
    //   }
    // }

    // useEffect(() => {
    //   getSpots();
    // }, [])

    return (
        <div className='spots'>
        {spots.length ? spots.map((spot, i) => {
            return (
            <div key={`${i}-${spot.name}`}>
                <Spot spot={spot}/>
            </div>
            )
        }) : ""}
        </div>
    )
}

export default Spots;
