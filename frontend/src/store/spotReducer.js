import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";
const LOAD_SPOT_DETAILS = "spots/loadSpotDetails";
const SET_SPOT = "spots/setSpot";

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

export const setSpot = (spot) => {
  return {
    type: SET_SPOT,
    payload: spot,
  };
};

export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/");
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

export const addImages = (spotImages, spotId) => async (dispatch) => {
  console.log(spotImages, "SPOTIMAGESSSSSS");
  const response = await csrfFetch(`/api/spots/${spotId}/images/`, {
    method: 'POST',
    body: JSON.stringify({
      
    })
  });
};

export const createSpot = (spot) => async (dispatch) => {
  const {
    spotImages,
    address,
    city,
    country,
    description,
    name,
    price,
    state,
    lat,
    lng,
  } = spot;
  const response = await csrfFetch("/api/spots/", {
    method: "POST",
    body: JSON.stringify({
      address,
      city,
      country,
      description,
      name,
      price,
      state,
      lat,
      lng,
    }),
  });
  const data = await response.json();
  dispatch(setSpot(data.spot));
  dispatch(addImages(spotImages, data.id));
  return response;
};

const initialState = { entries: [], isLoading: true };

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, entries: [...action.spots.Spots] };
    case LOAD_SPOT_DETAILS:
      return { ...state, entries: action.spotDetails };
    case SET_SPOT:
      return { ...state, spot: action.payload };
    default:
      return state;
  }
};

export default spotReducer;
