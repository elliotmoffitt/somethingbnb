import { useState, useEffect } from 'react';
import './SpotDetails.css'
import { fetchSpotDetails } from '../../store/spotReducer';
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
                <div id='spot-details'>
                    <div id='details'>
                        <h1>{spotDetails.name}</h1>
                        <h3>{spotDetails.city}, {spotDetails.state}, {spotDetails.country}</h3>
                        <div id='all-images-container'>
                        {spotDetails.SpotImages ? spotDetails.SpotImages.map((image, i) => (
                                <div key={`${i}-${image.id}`} className={i === 0 ? 'first-image-container' : 'images-container'}>
                                    <img src={image.url} className={i === 0 ? 'first-image' : 'images'} />
                                </div>
                        )) : ''}
                        </div>

                        <div id='name-description-reserve'>
                            <div id='name-description'>
                                <h3>Hosted by {`${spotDetails.Owner && spotDetails.Owner.firstName} ${spotDetails.Owner && spotDetails.Owner.lastName}`}</h3>
                                <p>{spotDetails.description}</p>
                            </div>

                            <div id='reserve'>
                                <div id='reserve-top'>
                                    <h2>${spotDetails.price} night</h2>
                                    <h4>★{spotDetails.avgStarRating}</h4>
                                    <h4>{spotDetails.numReviews} review(s)</h4>
                                </div>
                                <button id='reserve-button' onClick={() => window.alert('Feature Coming Soon...')}>
                                    Reserve
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id='reviews'>
                        <h2>★{spotDetails.avgStarRating}</h2>
                        •
                        <h2>{spotDetails.numReviews} review(s)</h2>
                    </div>
                    <br></br>
                </div>
            }
        </>
    );
}

export default SpotDetails;
