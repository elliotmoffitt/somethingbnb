import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpotsAction";
const LOAD_SPOT_DETAILS = "spots/loadSpotDetails";
const SET_SPOT = "spots/setSpot";
const SET_IMAGE = "spots/setSpotImage";

export const getAllSpotsAction = (spots) => ({
  type: GET_ALL_SPOTS,
  spots,
});

export const loadSpotDetails = (spotDetails) => ({
  type: LOAD_SPOT_DETAILS,
  spotDetails,
});

export const setSpot = (spot) => ({
  type: SET_SPOT,
  payload: spot,
});

export const setSpotImage = (images) => ({
  type: SET_IMAGE,
  payload: images,
});

export const getSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/");
  const spots = await response.json();
  dispatch(getAllSpotsAction(spots));
};

export const fetchSpotDetails = (spotId) => async (dispatch) => {
  if (spotId) {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const spotDetails = await response.json();
    dispatch(loadSpotDetails(spotDetails));
    return spotDetails;
  }
};

export const addImage = (spotImage, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images/`, {
    method: "POST",
    body: JSON.stringify({ ...spotImage }),
  });
  const data = await response.json();
  dispatch(setSpotImage(data));
  return response;
};

export const createSpot = (spot) => async (dispatch) => {
  const { spotImages, address, city, country, description, name, price, state, lat, lng } = spot;
  const response = await csrfFetch("/api/spots/", {
    method: "POST",
    body: JSON.stringify({ address, city, country, description, name, price, state, lat, lng }),
  });
  const data = await response.json();
  dispatch(setSpot(data.spot));
  for (let spotImage of spotImages) {
    await dispatch(addImage(spotImage, data.id));
  }
  return data;
};

export const updateSpot = (spot) => async (dispatch) => {
  const { spotImages, address, city, country, description, name, price, state, lat, lng, id } = spot;
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "PUT",
    body: JSON.stringify({ address, city, country, description, name, price, state, lat, lng }),
  });
  const data = await response.json();
  dispatch(setSpot(data.spot));
  for (let spotImage of spotImages) {
    await dispatch(addImage(spotImage, data.id));
  }
  return response;
};

export const deleteSpot = (spotId) => async () => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  return response;
};

const initialState = { allSpots: [], byId: {} };

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = { ...state };
      newState.allSpots = action.spots.Spots;
      let newByIdGetAllSpots = {};
      for (let spot of action.spots.Spots) {
        newByIdGetAllSpots[spot.id] = spot;
      }
      newState.byId = newByIdGetAllSpots;
      return newState;
      case LOAD_SPOT_DETAILS:
        return {
          ...state,
          byId: {
            ...state.byId,
            [action.spotDetails.id]: action.spotDetails
          }
        };

    case SET_SPOT:
      return { ...state, spot: action.payload };
    case SET_IMAGE:
      return { ...state, spotImage: action.payload };
    default:
      return state;
  }
};

export default spotsReducer;
