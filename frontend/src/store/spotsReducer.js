import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_ALL_SPOTS_CURRENT = "spots/getAllSpotsCurrent";
const GET_SPOT_DETAILS = "spots/getSpotDetails";
const CREATE_SPOT = "spots/createSpot";
const UPDATE_SPOT = "spots/updateSpot";
const ADD_IMAGE = "spots/addSpotImage";
const DELETE_SPOT = "spots/deleteSpot";

export const getAllSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  payload: spots,
});

export const getAllSpotsCurrent = (spots) => ({
  type: GET_ALL_SPOTS_CURRENT,
  spots,
});

export const loadSpotDetails = (spotDetails) => ({
  type: GET_SPOT_DETAILS,
  payload: spotDetails,
});

export const setSpot = (spot) => ({
  type: CREATE_SPOT,
  payload: spot,
});

export const setSpotImage = (images) => ({
  type: ADD_IMAGE,
  payload: images,
});

export const getSpotsThunk = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/spots/");
    const spots = await response.json();
    dispatch(getAllSpots(spots));
  } catch (e) {
    console.log(e);
  }
};

export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
  if (spotId) {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const spotDetails = await response.json();
    dispatch(loadSpotDetails(spotDetails));
    return spotDetails;
  }
};

export const getSpotsCurrent = (userId) => async (dispatch) => {
  if (userId) {
    const response = await csrfFetch(`/api/spots/${userId}`);
    dispatch(loadSpotDetails(response));
    return response;
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
  for (let spotImage of spotImages) {
    await dispatch(addImage(spotImage, data.id));
  }
  return data;
};

export const updateSpot = (spot) => async (dispatch) => {
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
    id,
  } = spot;
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "PUT",
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
  // switch (action.type) {
  //   case GET_ALL_SPOTS: {
  //     const spotsArr = action.spots.Spots;
  //     newState = { ...state };
  //     newState.allSpots = spotsArr;
  //     for (let spot of spotsArr) {
  //       newByIdGetAllSpots[spot.id] = spot;
  //     }
  //     newState.byId = newByIdGetAllSpots;
  //     return newState;
  //   }
  //   case GET_SPOT_DETAILS: {
  //     newState = { ...state };
  //     newState.byId[action.spotDetails.id] = action.spotDetails;
  //     return newState;
  //   }

  //   case CREATE_SPOT:
  //     return { ...state, spot: action.payload };
  //   case ADD_IMAGE:
  //     return { ...state, spotImage: action.payload };
  //   default:
  //     return state;
  // }
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const spotsArr = action.payload.Spots;
      newState = { ...state };
      newState.allSpots = spotsArr;
      let newByIdGetAllSpots = {};
      for (let spot of spotsArr) {
        newByIdGetAllSpots[spot.id] = spot;
      }
      newState.byId = newByIdGetAllSpots;
      return newState;
    }
    case GET_SPOT_DETAILS: {
      newState = { ...state };
      newState.allSpots = [action.payload];
      newState.byId[action.payload.id] = action.payload;
      return newState;
    }
    // case CREATE_SPOT: {
    //   return;
    // }
    // case ADD_IMAGE: {
    //   return;
    // }
    // case UPDATE_SPOT: {
    //   return;
    // }
    // case DELETE_SPOT: {
    //   return;
    // }
    default:
      return state;
  }
};

export default spotsReducer;
