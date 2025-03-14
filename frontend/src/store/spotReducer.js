import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";
const LOAD_SPOT_DETAILS = "spots/loadSpotDetails";

export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

export const loadSpotDetails = (spotDetails) => {
  return {
    type: LOAD_SPOT_DETAILS,
    spotDetails,
  };
};

export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch("http://localhost:8000/api/spots");
  const spots = await response.json();
  console.log(spots, "<-- SPOTSSSSSS");
  dispatch(loadSpots(spots));
};

export const fetchSpotDetails = () => async (dispatch) => {
  const response = await csrfFetch("http://localhost:8000/api/spots");
  const spots = await response.json();
  console.log(spots, "<-- SPOTSSSSSS");
  dispatch(loadSpots(spots));
};



const initialState = { entries: [], isLoading: true };

const spotReducer = (state = initialState, action) => {
  console.log(action, "<-- THIS");
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, entries: [...action.spots.Spots] };
    default:
      return state;
  }
};

export default spotReducer;
