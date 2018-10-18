import { ADD_FAVORITE } from "../constants/action-types";
import { REMOVE_FAVORITE } from "../constants/action-types";

const initialState = {
  favorites: []
};
const rootReducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case ADD_FAVORITE:    
    console.log(state);
  
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      return {...state, favorites: [...state.favorites.filter(favorite => favorite!== action.payload)]}
    default:
      return state;
  }
};
export default rootReducer;