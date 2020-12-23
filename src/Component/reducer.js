export const initialState = {
  location: localStorage.location || "All",
  category: "All",
  user: localStorage.user || null,
  registered: {
    firstName: "",
    lastName: "",
    username: "Guest",
  },
  godMode: "Off",
};

// Selector

const reducer = (state, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case "CHANGE_LOCATION":
      return {
        ...state,
        location: action.payload,
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "REGISTER_USER":
      return {
        ...state,
        registered: action.payload,
      };

    case "SET_GODMODE":
      return {
        ...state,
        godMode: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
