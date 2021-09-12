import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEMS_LOADING } from './types';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
  .get('/api/items')
  .then(response => 
    dispatch({
      type: GET_ITEMS,
      payload: response.data
    })
  )
};

export const addItem = (item) => dispatch => {
  axios
  .post('/api/items', item)
  .then(response =>
    dispatch({
      type: ADD_ITEM,
      payload: response.data
    })
  );
};

export const deleteItem = (id) => dispatch => {
  axios
  .delete(`/api/items/${id}`)
  .then(response => 
    dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  );
};

export const updateItem = (id, item) => dispatch => {
  axios
  .put(`/api/items/${id}`, item)
  .then(response => 
    dispatch({
      type: UPDATE_ITEM,
      payload: response.data
    })
  );
  return true;
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};