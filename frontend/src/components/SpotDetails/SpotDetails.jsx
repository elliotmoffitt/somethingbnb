import { useState, useEffect } from 'react';
import './SpotDetails.css'
import { fetchSpotDetails } from '../../store/spotsReducer';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Reviews from '../Reviews/Reviews';
import { FaStar } from 'react-icons/fa';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const spotDetails = useSelector(state => state.spots.byId[params.spotId]);


    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        console.log(spotDetails)
        const getSpotDetails = async () => {
            await dispatch(fetchSpotDetails(params.spotId))
            setIsLoaded(true)
        }
        if (!isLoaded) {
            getSpotDetails();
        }

    }, [dispatch, params.spotId, isLoaded, spotDetails]);

    if (isLoaded && spotDetails) {
        return (
            <>
                <div id='spot-details'>
                    <div id='details'>
                        <h1>{spotDetails.name}</h1>
                        <h3>{spotDetails.city}, {spotDetails.state}, {spotDetails.country}</h3>
                        <div id='all-images-container'>
                            <div id='first-image-container'>
                                <img src={spotDetails.SpotImages ? spotDetails.SpotImages[0].url : ''} id='first-image' />
                            </div>
                            <div>
                                <div id='images-container'>
                                    {spotDetails.SpotImages ? spotDetails.SpotImages.map((image, i) => (
                                        <div key={`${i}-${image.id}`}>
                                            {i !== 0 && <img src={image.url} className='images' />}
                                        </div>
                                    )) : ''}
                                </div>
                            </div>
                        </div>

                        <div id='name-description-reserve'>
                            <div id='name-description'>
                                <h3>Hosted by {`${spotDetails.Owner && spotDetails.Owner.firstName} ${spotDetails.Owner && spotDetails.Owner.lastName}`}</h3>
                                <p>{spotDetails.description}</p>
                            </div>

                            <div id='reserve'>
                                <div id='reserve-top'>
                                    <h2>${spotDetails.price} night</h2>
                                    <h3>{spotDetails.numReviews ? <><FaStar/>{spotDetails.avgStarRating}</> : ""}</h3>
                                    <h3>{spotDetails.numReviews === 1 ? <>1 review</>: <>{spotDetails.numReviews} reviews</>}</h3>
                                </div>
                                <button id='reserve-button' onClick={() => window.alert('Feature Coming Soon...')}>
                                    Reserve
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div id='reviews-title'>
                        <h2>{spotDetails.numReviews ? <><FaStar/>{spotDetails.avgStarRating}</> : ""} </h2>
                        •
                        <h2>{spotDetails.numReviews === 1 ? <>1 review</>: <>{spotDetails.numReviews} reviews</>}</h2>
                    </div>
                    <Reviews spotId={spotDetails.id} reviews={spotDetails.reviews}/>
                    <br></br>
                </div>
            </>
        );
    }
    else return <h1>Loading...</h1>
}

export default SpotDetails;
