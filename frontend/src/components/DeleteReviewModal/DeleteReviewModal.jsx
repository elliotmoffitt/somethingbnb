import './DeleteReviewModal.css';
import { useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../store/reviewsReducer';

const DeleteReviewModal = ({ closeModal, reviewId, spotId }) => {
    const dispatch = useDispatch();

    const onDeleteSpot = async () => {
        await dispatch(deleteReviewThunk(reviewId, spotId))
        closeModal()
    }
    return (
        <div id="delete-review-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <button className='confirmation-buttons' onClick={() => onDeleteSpot()}>Yes (Delete Review)</button>
            <button className='confirmation-buttons' onClick={() => closeModal()}>No (Keep Review)</button>
        </div>
    )
}

export default DeleteReviewModal;
