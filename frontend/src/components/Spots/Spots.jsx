import { useState, useEffect } from 'react';
import './Spots.css'
import { loadSpots } from '../../store/spotReducer';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpots } from '../../store/spotReducer';

const Spots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state)
    const [isLoaded, setIsLoaded] = useState(false);
    const [testSpots, setTestSpots] = useState([]);

    useEffect(() => {
        dispatch(fetchSpots()).then(() => {
            setTestSpots(true)
        });
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
        <>
        {/* {spots.map(spot => {
            return spot.name
        })} */}
        </>
    )
}

export default Spots;
