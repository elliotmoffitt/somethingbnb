import { useEffect, useState } from 'react';
import './Spots.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpots } from '../../store/spotReducer';
import Spot from '../Spot';
import UpdateSpot from '../UpdateSpot';
import DeleteSpot from '../DeleteSpot';

const Spots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spotState.entries)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchSpots())
        setIsLoaded(true)
    }, [dispatch]);

    if (isLoaded) {
        return (
            <div id='landing-page'>
                <div id='spots'>
                    {spots.length ? spots.map((spot, i) => {
                        return (
                            <div key={`${i}-${spot.name}`}>
                                <Spot spot={spot} />
                                <UpdateSpot spot={spot}/>
                                <DeleteSpot spot={spot}/>
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
