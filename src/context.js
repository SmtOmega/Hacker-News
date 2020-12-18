import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORIES,
  HANDLE_SEARCH,
  HANDLE_PAGE
} from "./actions";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";
const initialState = {
  isLoading: false,
  hits: [],
  query: "react",
  page: 0,
  nbPages: null,
};
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchNews = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNews(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);

  const removeStory = (id) => {
    console.log(id);
    dispatch({ type: REMOVE_STORIES, payload: id });
  };
  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
    console.log(query);
  };
  const handlePage = (value) => {
     dispatch({type: HANDLE_PAGE, payload: value})
  }
  return (
    <AppContext.Provider value={{ ...state, removeStory, handleSearch, handlePage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
