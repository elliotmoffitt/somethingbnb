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
                    <div>
                        {/* <h3>{review.User.firstName} {review.User.firstName}</h3> */}
                        <p>{review.review}</p>
                    </div>
                )
            }) : ""}
        </div>
        )
    }
    else return <h1>Loading...</h1>
}

export default Reviews;
