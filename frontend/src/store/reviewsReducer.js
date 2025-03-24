import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = 'reviews/getAllReviewsAction';
const SET_REVIEW = 'reviews/setReview';
const SET_IMAGE = 'spots/setReviewImage';

export const setReview = (review) => {
    return {
        type: SET_REVIEW,
        payload: review
    }
}

export const createReview = (reviewForm, spotId) => async (dispatch) => {
    console.log({...reviewForm}, spotId)
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews/`, {
            method: "POST",
            body: JSON.stringify({...reviewForm})
        });
        const data = await response.json();
        return data;
    } catch (e) {

    }
}

export const deleteReview = (reviewId) => async () => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    return response;
  };

export const getReviewsCurrentUser = () => {

}

const initialState = {allReviews: [], byIds: {}};

const reviewsReducer = (state = initialState, action) => {
    let newState = {};

    switch(action.type) {
        // case GET_ALL_REVIEWS:
        //     newState = {...state};
        //     newState.allReviews = action.payload;
        //     for (let review of action.payload) {
        //         newState.byId[review.id] = review;
        //     }
        //     return newState;
        case SET_REVIEW:
            return {...state, review: action.payload};
    default:
        return newState;
    }
}

export default reviewsReducer;
