// src/js/actions/index.js
import { ADD_FAVORITE } from "../constants/action-types";
export const addFavorite = favorite => ({ type: ADD_FAVORITE, payload: favorite });