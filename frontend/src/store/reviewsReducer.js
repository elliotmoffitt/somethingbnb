import { csrfFetch } from "./csrf";
import { getSpotDetailsThunk } from "./spotsReducer";

const SET_REVIEW = 'reviews/setReview';
const DELETE_REVIEW = 'reviews/deleteReview';

export const setReview = (review) => ({
  type: SET_REVIEW,
  payload: review
});

export const createReview = (reviewForm, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews/`, {
    method: "POST",
    body: JSON.stringify({ ...reviewForm })
  });
  const data = await response.json();
  dispatch(getSpotDetailsThunk(spotId))
  return data;
};

export const deleteReview = (reviewId, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch({ type: DELETE_REVIEW, reviewId });
  }
  dispatch(getSpotDetailsThunk(spotId))
  return response;
};

const initialState = { allReviews: [], byId: {} };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_REVIEW:
      return { ...state, allReviews: state.allReviews.filter(review => review.id !== action.reviewId) };
    case SET_REVIEW:
      return { ...state, review: action.payload };
    default:
      return state;
  }
};

export default reviewsReducer;
