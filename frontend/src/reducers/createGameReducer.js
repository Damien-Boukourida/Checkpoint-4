const initialState = {
  name: "",
  plateform: "",
};

const createGameReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_NAME":
      return { ...state, name: action.payload };
    case "UPDATE_PLATEFORM":
      return { ...state, plateform: action.payload };
    default:
      return state;
  }
};

export default createGameReducer;
export { initialState };
