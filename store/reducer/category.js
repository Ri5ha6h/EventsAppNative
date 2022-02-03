import {
  ALL_CATEGORY,
  FETCH_CATEGORIES,
  GET_CATEGORY,
  TOGGLE_FAVORITE,
} from '../action/category';

const initialState = {
  categories: [],
  category: [],
  all: [],
  count: 0,
  favoriteEvents: [],
};

export default categoryReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.categoryData.category,
        count: action.categoryData.count,
      };
    case ALL_CATEGORY:
      return {
        ...state,
        all: action.categoryData.category,
        count: action.categoryData.count,
      };
    case TOGGLE_FAVORITE:
      const existingIndex =
        state.favoriteEvents.findIndex(
          (event) =>
            event.event_id === action.eventId
        );
      if (existingIndex >= 0) {
        const updatedFavEvents = [
          ...state.favoriteEvents,
        ];
        updatedFavEvents.splice(existingIndex, 1);
        return {
          ...state,
          favoriteEvents: updatedFavEvents,
        };
      } else {
        const cat = state.category.find(
          (event) =>
            event.event_id === action.eventId
        );
        return {
          ...state,
          favoriteEvents:
            state.favoriteEvents.concat(cat),
        };
      }
    default:
      return state;
  }
};
