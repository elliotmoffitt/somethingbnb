import './Reviews.css'
import { useSelector } from 'react-redux';

const Reviews = () => {
    const reviews = useSelector(state => state)
    console.log(reviews)
    return;
}

export default Reviews;
