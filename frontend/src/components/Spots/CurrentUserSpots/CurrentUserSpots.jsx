import { useEffect, useState } from 'react';
import './CurrentUserSpots.css'
import { useSelector, useDispatch } from 'react-redux';
import { getSpotsCurrent } from '../../../store/spotsReducer';
import SpotCard from '../SpotCard';
import UpdateSpotButton from '../UpdateSpot/UpdateSpotButton';
import DeleteSpot from '../DeleteSpot/DeleteSpotButton';

const CurrentUserSpots = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const spotsCurrent = useSelector(state => state.spots.allSpots)
    // const spots = useSelector(state => state.spots.allSpots.filter(spot => spot.ownerId === sessionUser.id));

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const getSpots = async () => {
            await dispatch(getSpotsCurrent(sessionUser.id));
            setIsLoaded(true)
        }
        if (!isLoaded) {
            getSpots()
        }
    }, [dispatch, isLoaded, spotsCurrent]);


    if (isLoaded) {
        return (
            <div id='landing-page'>
                <div id='spots'>
                    {spotsCurrent && spotsCurrent.length ? spotsCurrent.map((spot, i) => {
                        return (
                            <div key={`${i}-${spot.name}`}>
                                <div id='tooltip'>
                                    <SpotCard spot={spot} />
                                    <span id='tooltip-text'>{spot.name}</span>
                                </div>
                                {sessionUser ? sessionUser.id === spot.ownerId && <UpdateSpotButton spot={spot} /> : ""}
                                {sessionUser ? sessionUser.id === spot.ownerId && <DeleteSpot spot={spot} /> : ""}
                            </div>
                        )
                    }) : <h1>No Spots Found</h1>}
                </div>
            </div>
        )
    }
    else return <h1>Loading...</h1>
}

export default CurrentUserSpots;
