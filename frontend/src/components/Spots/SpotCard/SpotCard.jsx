import { NavLink } from 'react-router-dom';
import './SpotCard.css'
import { FaStar } from 'react-icons/fa';

const SpotCard = ({ spot }) => {
    return (
        <NavLink to={`/spots/${spot.id}`}>
            {/* <button id='spot' onClick={() => dispatch(fetchSpotDetails(spot.id))}> */}

            <div>
                {spot.previewImage ?
                    <img src={spot.previewImage} alt={spot.name} id="spot-img" /> :
                    <h4>No Preview Image</h4>}
            </div>
            <div id='spot-info'>
                <span>{spot.city}, {spot.state}</span>
                {spot.avgRating ?
                    <span><FaStar />{spot.avgRating}</span>
                    : ""}
            </div>
            <span id='spot-price'>${spot.price} night</span>


            {/* </button> */}
        </NavLink>
    );
}

export default SpotCard;
