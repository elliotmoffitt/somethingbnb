import { csrfFetch } from "./csrf";
import { getSpotDetailsThunk } from "./spotsReducer";

const CREATE_REVIEW = 'reviews/createReview';
const DELETE_REVIEW = 'reviews/deleteReview';

export const createReviewAction = (review) => ({
  type: CREATE_REVIEW,
  payload: review
});

export const deleteReviewAction = (review) => ({
  type: CREATE_REVIEW,
  payload: review
});

export const createReviewThunk = (reviewForm, spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews/`, {
      method: "POST",
      body: JSON.stringify({ ...reviewForm })
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(getSpotDetailsThunk(spotId))
      return data;
    } else {
      throw res;
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteReviewThunk = (reviewId, spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      dispatch({ type: DELETE_REVIEW, reviewId });
      dispatch(getSpotDetailsThunk(spotId))
      return res;
    } else {
      throw res;
    }
  } catch (e) {
    console.log(e);
  }
};

const initialState = { allReviews: [], byId: {} };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_REVIEW:
      return { ...state, allReviews: state.allReviews.filter(review => review.id !== action.reviewId) };
    case CREATE_REVIEW:
      return { ...state, review: action.payload };
    default:
      return state;
  }
};

export default reviewsReducer;
