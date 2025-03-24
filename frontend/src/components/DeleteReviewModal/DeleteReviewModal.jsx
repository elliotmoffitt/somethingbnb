import './DeleteReviewModal.css';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviewsReducer';

const DeleteReviewModal = ({ closeModal, reviewId }) => {
    const dispatch = useDispatch();

    const onDeleteSpot = async () => {
        await dispatch(deleteReview(reviewId))
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
