import './DeleteSpotModal.css';
import { useDispatch } from 'react-redux';
import { deleteSpot, getSpotsThunk } from '../../../store/spotsReducer';

const DeleteSpotModal = ({closeModal, spot}) => {
const dispatch = useDispatch();

const onDeleteSpot = async () => {
    await dispatch(deleteSpot(spot.id))
    await dispatch(getSpotsThunk())
    closeModal()
}
return (
        <div id="delete-spot-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot from the listings?</p>
        <button className='confirmation-buttons' onClick={() => onDeleteSpot()}>Yes (Delete Spot)</button>
        <button className='confirmation-buttons' onClick={() => closeModal()}>No (Keep Spot)</button>
        </div>
    )
}

export default DeleteSpotModal;
