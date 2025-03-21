import { useEffect, useState } from 'react';
import './Spots.css'
import { useSelector, useDispatch } from 'react-redux';
import {  getSpotsThunk } from '../../store/spotsReducer';
import Spot from '../Spot';
import UpdateSpotButton from './UpdateSpotButton';
import DeleteSpot from './DeleteSpot';

const Spots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spotsStore.entries)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {

        const getSpots = async () => {
            await dispatch(getSpotsThunk());
            setIsLoaded(true)
        }
        // dispatch(getSpotsThunk())
        // setIsLoaded(true)
        if (!isLoaded) {
            getSpots()
        }
    }, [dispatch, isLoaded]);

    // useEffect(() => {
    //     const getSpots = async () => {
    //         dispatch(getSpotsThunk())
    //     }
    //     if (!isLoaded) {
    //         getSpots();
    //     }
    // }, [isLoaded])

    if (isLoaded) {
        return (
            <div id='landing-page'>
                <div id='spots'>
                    {spots && spots.length ? spots.map((spot, i) => {
                        return (
                            <div key={`${i}-${spot.name}`}>
                                <Spot spot={spot} />
                                <UpdateSpotButton spot={spot}/>
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
