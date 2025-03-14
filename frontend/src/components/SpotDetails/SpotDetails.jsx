import { useState, useEffect } from 'react';
import './SpotDetails.css'
import { fetchSpotDetails, loadSpots } from '../../store/spotReducer';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpots } from '../../store/spotReducer';
import Spot from '../Spot';

const SpotDetails = ({ spot }) => {
    const dispatch = useDispatch();
    const spotDetails = useSelector(state => state.spotState.entries)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchSpotDetails())
        setIsLoaded(true)
    }, [dispatch]);
    // console.log(spot.previewImage, spot.name)
    console.log(spot)
    return (
        <h1>spot detail</h1>
    );
}

export default SpotDetails;
