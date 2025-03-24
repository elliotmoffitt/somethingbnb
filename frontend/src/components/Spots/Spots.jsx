import { useEffect, useState } from 'react';
import './Spots.css'
import { useSelector, useDispatch } from 'react-redux';
import { getSpotsThunk } from '../../store/spotsReducer';
import Spot from '../Spot';
import UpdateSpotButton from './UpdateSpotButton';
import DeleteSpot from './DeleteSpot';

const Spots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots);

    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const getSpots = async () => {
            await dispatch(getSpotsThunk());
            setIsLoaded(true)
        }
        if (!isLoaded) {
            getSpots()
        }
    }, [dispatch, isLoaded, spots]);


    if (isLoaded) {
        return (
            <div id='landing-page'>
                <div id='spots'>
                    {spots && spots.length ? spots.map((spot, i) => {
                        return (
                            <div key={`${i}-${spot.name}`}>
                                <Spot spot={spot} />
                                {sessionUser ? sessionUser.id === spot.ownerId && <UpdateSpotButton spot={spot} /> : ""}
                                {sessionUser ? sessionUser.id === spot.ownerId && <DeleteSpot spot={spot} /> : ""}
                            </div>
                        )
                    }) : ""}
                </div>
            </div>
        )
    }
    else return <h1>Loading...</h1>
}

export default Spots;
