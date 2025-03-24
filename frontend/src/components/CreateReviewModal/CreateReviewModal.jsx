import { useEffect, useState } from 'react';
import './CreateReviewModal.css';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { createReview } from '../../store/reviewsReducer';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

const CreateReviewModal = ({ spotId }) => {
    const [stars, setStars] = useState(1);
    const [review, setReview] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [isHoveringOne, setIsHoveringOne] = useState(false);
    const [isHoveringTwo, setIsHoveringTwo] = useState(false);
    const [isHoveringThree, setIsHoveringThree] = useState(false);
    const [isHoveringFour, setIsHoveringFour] = useState(false);
    const [isHoveringFive, setIsHoveringFive] = useState(false);
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    useEffect(() => {
        review.length && review.length > 10 ? setDisabled(false) : setDisabled(true);
    }, [review.length])

    const handleStarClick = (num) => {
        if (num === 1) setStars(1)
        else if (num === 2) setStars(2)
        else if (num === 3) setStars(3)
        else if (num === 4) setStars(4)
        else setStars(5)
    }

    const handleSubmit = () => {
        dispatch(createReview({ stars, review }, spotId))
            .then(closeModal)
    }

    return (

        <div id="review-modal">
            <h1>How was your stay?</h1>
            <textarea placeholder='Leave your review here...' id='review-box' onChange={(e) => setReview(e.target.value)}></textarea>
            <h4 style={{ margin: "0" }}>{stars} stars</h4>
            <div id="stars-group">
                <div className='star' onClick={() => handleStarClick(1)}
                    onMouseEnter={() => setIsHoveringOne(true)}
                    onMouseLeave={() => setIsHoveringOne(false)}>
                    {(isHoveringOne || stars === 1 || stars === 2 || stars === 3 || stars === 4 || stars === 5) ? <FaStar /> : <FaRegStar />}
                </div>
                <div className='star' onClick={() => handleStarClick(2)}
                    onMouseEnter={() => {
                        setIsHoveringOne(true)
                        setIsHoveringTwo(true)
                    }} onMouseLeave={() => {
                        setIsHoveringOne(false)
                        setIsHoveringTwo(false)
                    }
                    }> {(isHoveringTwo || stars === 2 || stars === 3 || stars === 4 || stars === 5) ? <FaStar /> : <FaRegStar />}
                </div>
                <div className='star' onClick={() => handleStarClick(3)}
                    onMouseEnter={() => {
                        setIsHoveringOne(true)
                        setIsHoveringTwo(true)
                        setIsHoveringThree(true)
                    }} onMouseLeave={() => {
                        setIsHoveringOne(false)
                        setIsHoveringTwo(false)
                        setIsHoveringThree(false)
                    }
                    }>{(isHoveringThree || stars === 3 || stars === 4 || stars === 5) ? <FaStar /> : <FaRegStar />}
                </div>
                <div className='star' onClick={() => handleStarClick(4)}
                    onMouseEnter={() => {
                        setIsHoveringOne(true)
                        setIsHoveringTwo(true)
                        setIsHoveringThree(true)
                        setIsHoveringFour(true)
                    }} onMouseLeave={() => {
                        setIsHoveringOne(false)
                        setIsHoveringTwo(false)
                        setIsHoveringThree(false)
                        setIsHoveringFour(false)
                    }
                    }>{(isHoveringFour || stars === 4 || stars === 5) ? <FaStar /> : <FaRegStar />}
                </div>
                <div className='star' onClick={() => handleStarClick(5)}
                    onMouseEnter={() => {
                        setIsHoveringOne(true)
                        setIsHoveringTwo(true)
                        setIsHoveringThree(true)
                        setIsHoveringFour(true)
                        setIsHoveringFive(true)
                    }} onMouseLeave={() => {
                        setIsHoveringOne(false)
                        setIsHoveringTwo(false)
                        setIsHoveringThree(false)
                        setIsHoveringFour(false)
                        setIsHoveringFive(false)
                    }
                    }>{(isHoveringFive || stars === 5) ? <FaStar /> : <FaRegStar />}
                </div>
            </div>
            <button id={disabled ? 'submit-disabled' : 'submit-button'} disabled={disabled} onClick={() => handleSubmit()}>Submit Your Review</button>
        </div>
    )
}
export default CreateReviewModal;
