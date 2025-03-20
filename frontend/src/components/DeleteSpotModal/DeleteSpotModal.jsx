import './DeleteSpotModal.css';
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spotsReducer';

const DeleteSpotModal = ({closeModal, spot}) => {
const dispatch = useDispatch();
console.log(spot.id)
    return (
        <div id="delete-spot-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot from the listings?</p>
        <button className='confirmation-buttons' onClick={() => dispatch(deleteSpot(spot.id))}>Yes (Delete Spot)</button>
        <button className='confirmation-buttons' onClick={() => closeModal()}>No (Keep Spot)</button>
        </div>
    )
}

export default DeleteSpotModal;
