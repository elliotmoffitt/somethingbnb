import { useState, useEffect } from 'react';
import './SpotDetails.css'
import { fetchSpotDetails } from '../../store/spotReducer';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchSpots } from '../../store/spotReducer';
// import Spot from '../Spot';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const spotDetails = useSelector(state => state.spotState.entries)
    const [isLoaded, setIsLoaded] = useState(false);

    const params = useParams()

    useEffect(() => {
        dispatch(fetchSpotDetails(params.spotId))
        setIsLoaded(true)
    }, [dispatch, params.spotId]);
    // console.log(spot.previewImage, spot.name)
    console.log(spotDetails)
    return (
        <h1>{isLoaded && spotDetails.name}</h1>
    );
}

export default SpotDetails;
