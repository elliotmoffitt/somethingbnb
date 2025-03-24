import { useEffect, useState, useRef } from 'react';
import './Reviews.css'
import { useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import CreateReviewModal from '../CreateReviewModal/CreateReviewModal';
import { useParams } from 'react-router-dom';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import DeleteReview from '../DeleteReview';


const Reviews = ({ spotId, reviews }) => {
    const params = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [userCreatedReview, setUserCreatedReview] = useState(false);
    const ulRef = useRef();



    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        for (let review of reviews) {
            if (review.userId === sessionUser.id) {
                setUserCreatedReview(true);
            }
        }
    })

    useEffect(() => {
        setIsLoaded(true)
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };


        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    console.log(sessionUser)
    if (isLoaded) {
        return (
            <div>
                {!userCreatedReview ?
                    <button id='review-button' onClick={toggleMenu}>
                        <OpenModalMenuItem
                            itemText="Post Your Review"
                            onItemClick={closeMenu}
                            modalComponent={<CreateReviewModal spotId={spotId} />}
                        />
                    </button>
                    : ""}
                {reviews && reviews.length ? reviews.map((review, i) => {
                    return (
                        <>
                            <div key={`${review.id}-${i}`} id='reviews'>
                                <h3 className='review-details'>{review.User.firstName} {review.User.lastName}</h3>
                                <h4 className='review-details'>Created: {(review.createdAt).split(' ').slice(0, 5).join(' ')}</h4>
                                <p>{review.review}</p>
                            </div>
                            {sessionUser.id === review.userId ?
                                <DeleteReview reviewId={review.id} /> : ""}
                            <hr></hr>
                        </>
                    )
                }) : "Be the first to post a review!"
                }
            </div >
        )
    }
    else return <h1>Loading...</h1>
}

export default Reviews;
