import { useState, useEffect } from 'react';
import './SpotDetails.css'
import { fetchSpotDetails} from '../../store/spotReducer';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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
        <>
            {isLoaded &&
                <div id="spot-details">
                    <div id="spot-details-details">
                        <h1>{spotDetails.name}</h1>
                        <h3>{spotDetails.city}, {spotDetails.state}, {spotDetails.country}</h3>
                        {spotDetails.SpotImages ? spotDetails.SpotImages.map((image, i) => (
                            <div key={`${i}-${image.id}`}>
                                <img src={image.url} />
                            </div>
                        )) : ""}

                        <div id="spot-details-name-description">
                            <h3>Hosted by {`${spotDetails.Owner && spotDetails.Owner.firstName} ${spotDetails.Owner && spotDetails.Owner.lastName}`}</h3>
                            <p>{spotDetails.description}</p>
                        </div>
                    </div>

                    <div id="spot-details-reviews">
                        asdf
                    </div>
                </div>
            }
        </>
    );
}

export default SpotDetails;
