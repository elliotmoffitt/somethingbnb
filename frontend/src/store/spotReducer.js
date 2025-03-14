import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";

export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch("http://localhost:8000/api/spots");
  const spots = await response.json();
//   console.log(spots, '<-- SPOTSSSSSS')
  dispatch(loadSpots(spots));
};


const initialState = { entries: [], isLoading: true };

const spotReducer = (state = initialState, action) => {
    // console.log(action, '<-- THIS')
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, entries: [action.spots] };
    default:
      return state;
  }
};

export default spotReducer;
