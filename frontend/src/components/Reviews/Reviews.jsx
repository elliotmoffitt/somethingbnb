import { useEffect, useState } from 'react';
import './Reviews.css'
import { useSelector } from 'react-redux';

const Reviews = () => {
    const reviews = useSelector(state => state.spotsStore.entries.reviews)
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setIsLoaded(true)
    })
    if (isLoaded) {
        return (
        <div>
            {reviews && reviews.length ? reviews.map((review, i) => {
                return (
                    <>
                    <div key={`${review.id}-${i}`} id='reviews'>
                        <h3 className='review-details'>{review.User.firstName} {review.User.firstName}</h3>
                        <h4 className='review-details'>Created: {Date(review.createdAt).split(' ').slice(0, 5).join(' ')}</h4>
                        <p>{review.review}</p>
                    </div>
                    <hr></hr>
                    </>
                )
            }) : "Be the first to post a review!"}
        </div>
        )
    }
    else return <h1>Loading...</h1>
}

export default Reviews;
