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
  const response = await csrfFetch("/api/spots");
  const spots = await response.json();
  dispatch(loadSpots(spots));
};

export const fetchSpotDetails = (spotId) => async (dispatch) => {
  if (spotId) {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const spotDetails = await response.json();
    dispatch(loadSpotDetails(spotDetails));
  }
};



const initialState = { entries: [], isLoading: true };

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, entries: [...action.spots.Spots] };
    case LOAD_SPOT_DETAILS:
      return {...state, entries: action.spotDetails }
    default:
      return state;
  }
};

export default spotReducer;
