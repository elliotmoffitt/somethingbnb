import { NavLink } from 'react-router-dom';
import './Spot.css'
import { useDispatch } from 'react-redux';
import { fetchSpotDetails } from '../../store/spotReducer';

const Spot = ({ spot }) => {
    const dispatch = useDispatch();
    // console.log(spot.previewImage, spot.name)
    console.log(spot)
    return (
        <NavLink to={`/spots/${spot.id}`}>
            <button id='spot' onClick={() => dispatch(fetchSpotDetails(spot.id))}>
                <div id='spot-img'>
                    {spot.previewImage ? <img src={spot.previewImage} alt={spot.name} /> :
                        <img src="https://i1.wp.com/cornellsun.com/wp-content/uploads/2020/06/1591119073-screen_shot_2020-06-02_at_10.30.13_am.png?fit=700%2C652&ssl=1" alt={spot.name} />}
                </div>

                <div id='spot-info'>
                    <div id='spot-name-desc-price'>
                        <h2>{spot.name}</h2>
                        <h4>{spot.description}</h4>
                        <h4>${spot.price}</h4>
                    </div>
                    <h4>★{spot.avgRating}</h4>
                </div>

            </button>
        </NavLink>
    );
}

export default Spot;
