import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_ALL_SPOTS_CURRENT = "spots/getAllSpotsCurrent";
const GET_SPOT_DETAILS = "spots/getSpotDetails";
const CREATE_SPOT = "spots/createSpot";
const UPDATE_SPOT = "spots/updateSpot";
const ADD_IMAGE = "spots/addSpotImage";
const DELETE_SPOT = "spots/deleteSpot";

export const getAllSpotsAction = (spots) => ({
  type: GET_ALL_SPOTS,
  payload: spots,
});

export const getAllSpotsCurrentAction = (spots) => ({
  type: GET_ALL_SPOTS_CURRENT,
  payload: spots,
});

export const getSpotDetailsAction = (spotDetails) => ({
  type: GET_SPOT_DETAILS,
  payload: spotDetails,
});

export const createSpotAction = (spot) => ({
  type: CREATE_SPOT,
  payload: spot,
});

export const updateSpotAction = (spot) => ({
  type: UPDATE_SPOT,
  payload: spot,
});

export const addImageAction = (images) => ({
  type: ADD_IMAGE,
  payload: images,
});

export const getSpotsThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/spots/");
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllSpotsAction(data));
    } else {
      throw res;
    }
  } catch (e) {
    console.log(e);
  }
};

export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
  try {
    if (spotId) {
      const res = await csrfFetch(`/api/spots/${spotId}`);
      if (res.ok) {
        const data = await res.json();
        dispatch(getSpotDetailsAction(data));
        return data;
      } else {
        throw res;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const getSpotsCurrent = (userId) => async (dispatch) => {
  try {
    if (userId) {
      const res = await csrfFetch(`/api/spots/${userId}`);
      if (res.ok) {
        dispatch(getSpotDetailsAction(res));
        return res;
      } else {
        throw res;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const addImage = (spotImage, spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/images/`, {
      method: "POST",
      body: JSON.stringify({ ...spotImage }),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(addImageAction(data));
      return res;
    } else {
      throw res;
    }
  } catch (e) {
    console.log(e);
  }
};

export const createSpotThunk = (spot) => async (dispatch) => {
  try {
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
    const res = await csrfFetch("/api/spots/", {
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
    if (res.ok) {
      const data = await res.json();
      dispatch(createSpotAction(data));
      for (let spotImage of spotImages) {
        await dispatch(addImage(spotImage, data.id));
      }
      return data;
    } else {
      throw res;
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateSpot = (spot) => async (dispatch) => {
  try {

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
    const res = await csrfFetch(`/api/spots/${id}`, {
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
    if (res.ok) {
      const data = await res.json();
      dispatch(updateSpot(data.spot));
      for (let spotImage of spotImages) {
        await dispatch(addImage(spotImage, data.id));
      }
      return res;
    } else {
      throw res;
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteSpot = (spotId) => async () => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: "DELETE",
    });
    console.log(res)
    if (res.ok) {
      await dispatch(getSpotsThunk());
      return res;
    } else {
      throw res
    };
  } catch (e) {
    console.log(e);
  }
};

const initialState = { allSpots: [], byId: {} };

const spotsReducer = (state = initialState, action) => {
  let newState;
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
    case CREATE_SPOT: {
      newState = { ...state };
      newState.allSpots = [action.payload];
      newState.byId[action.payload.id] = action.payload;
      return newState;
    }
    case UPDATE_SPOT: {
      newState = { ...state };
      newState.allSpots = [action.payload];
      newState.byId[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_SPOT: {
      return;
    }
    default:
      return state;
  }
};

export default spotsReducer;
