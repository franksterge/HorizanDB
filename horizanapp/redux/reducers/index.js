import { ADD_FAVORITE } from "../constants/action-types";
import { REMOVE_FAVORITE } from "../constants/action-types";


const initialState = {
  favorites: [],
  auth:{
    logged_in:"no",
    form_complete:"no",
    userid:Math.random().toString(36).substr(2, 9),
    school_list:[],
  }
};
const rootReducer = (state = initialState, action) => {
  // console.log(action.type)
  switch (action.type) {
    case "SET_INCOME":
      return {...state, auth:{...state.auth,income_bracket:action.payload}}
    case "ADD_SCHOOLS":
      return { ...state, school_list: Object.values(action.payload) };
    case "LOG_OUT":
      return  {...state,
      auth: {
        ...state.auth,
        logged_in: "no",
        userid:Math.random().toString(36).substr(2, 9),
      }
    }
    case "FORM_COMPLETE":
     return {...state,
      auth: {
        ...state.auth,
        form_complete:"yes"
      }
    }
    case "LOG_IN":

      return {
        ...state,
        auth: {
          ...state.auth,
          logged_in: "yes",
          userid:action.payload
        }
      }

    case ADD_FAVORITE:    
    // console.log(state);
  
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      return {...state, favorites: [...state.favorites.filter(favorite => favorite!== action.payload)]}
    default:
      return state;
  }
};
export default rootReducer;