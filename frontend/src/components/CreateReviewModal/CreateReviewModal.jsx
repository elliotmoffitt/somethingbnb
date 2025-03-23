import { useEffect, useState } from 'react';
import './CreateReviewModal.css';
import { FaStar } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CreateReviewModal = () => {
    const [stars, setStars] = useState(1);
    const [review, setReview] = useState('');
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        review.length && review.length > 10 ? setDisabled(false) : setDisabled(true);
    })

    return (
        <div id="review-modal">
            <h1>How was your stay?</h1>
            <textarea placeholder='Leave your review here...' id='review-box' onChange={(e) => setReview(e.target.value)}></textarea>
            <h4 style={{ margin: "0" }}>{stars} stars</h4>
            <div id="stars-group">
                <FontAwesomeIcon icon="fa-regular fa-star" />
                {/* <div className='star' onClick={() => setStars(1)}><faStar /></div>
                <div className='star' onClick={() => setStars(2)}><FaStar /></div>
                <div className='star' onClick={() => setStars(3)}><FaStar /></div>
                <div className='star' onClick={() => setStars(4)}><FaStar /></div>
                <div className='star' onClick={() => setStars(5)}><FaStar /></div> */}
            </div>
            <button id={disabled ? 'submit-disabled' : 'submit-button'} disabled={disabled}>Submit Your Review</button>
        </div>
    )
}
export default CreateReviewModal;
