import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = 'reviews/getAllReviewsAction';
const SET_REVIEW = 'reviews/setReview';
const SET_IMAGE = 'spots/setReviewImage';

export const getAllReviewsAction = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews,
    };
};

export const getReviewsThunk = (spotId) => async (dispatch) => {
    console.log(spotId, 'SPOTID ON REVIEWS')
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response.json();
    dispatch(getAllReviewsAction(reviews));
};

export const createReview = (review) => async (dispatch) => {
    
}

const initialState = {allReviews: [], byIds: {}};

const reviewsReducer = (state = initialState, action) => {
    let newState = {};

    switch(action.type) {
        case GET_ALL_REVIEWS:
            newState = {...state};
            newState.allReviews = action.payload;
            for (let review of action.payload) {
                newState.byId[review.id] = review;
            }
            return newState;
    default:
        return newState;
    }
}

export default reviewsReducer;
