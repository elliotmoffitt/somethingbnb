import { useState, useEffect } from 'react';
import './SpotDetails.css'
import { fetchSpotDetails, loadSpots } from '../../store/spotReducer';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpots } from '../../store/spotReducer';
import Spot from '../Spot';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const spotDetails = useSelector(state => state.spotState.entries)
    const [isLoaded, setIsLoaded] = useState(false);

    const params = useParams()

    useEffect(() => {
        dispatch(fetchSpotDetails(params.spotId))
        setIsLoaded(true)
    }, [dispatch]);
    // console.log(spot.previewImage, spot.name)
    console.log(spotDetails)
    return (
        <div id="spot-details">
            <h1>{spotDetails.name}</h1>
            <h3>{spotDetails.city}, {spotDetails.state}, {spotDetails.country}</h3>
            {spotDetails.SpotImages ? spotDetails.SpotImages.map((image, i) => (
                <div>
                <img src={image.url}/>
                </div>
            )) : ""}
        </div>
    );
}

export default SpotDetails;
