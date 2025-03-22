import './CreateReviewModal.css';
import {FaStar} from 'react-icons/fa';

const CreateReviewModal = () => {
    return (
        <div id="review-modal">
            <h1>How was your stay?</h1>
            <textarea placeholder='Leave your review here...' id='review-box'></textarea>
            <FaStar/>
        </div>
    )
}
export default CreateReviewModal;
