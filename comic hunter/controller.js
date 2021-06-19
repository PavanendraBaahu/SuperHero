import {
  addBookmark,
  deleteBookmark,
  loadMovieRight,
  loadMovieSuggestions,
  loadSearchResults,
  state,
} from "./model.js";
import bookMarkView from "./view/bookMarkView.js";
import movieRightView from "./view/movieRightView.js";
import searchResultsView from "./view/searchResultsView.js";
import searchSuggestionView from "./view/searchSuggestionView.js";

const controlSearchSuggestions = async function () {
  try {
    // Get the query
    const query = searchSuggestionView.getQuery();

    // Load the resutls related to query
    await loadMovieSuggestions(query);
    // Render it out on UI
    searchSuggestionView.clearAutoParent();
    searchSuggestionView.generateMarkup(state.suggestions.slice(0, 5));
  } catch (err) {
    console.error(`${err}`);
    searchSuggestionView.renderError();
  }
};
searchSuggestionView.addHandlerSuggestion(controlSearchSuggestions);

// For selecting the suggestion
searchSuggestionView.selectSuggestion();

// Clearing autoBox window
searchSuggestionView.clearWindow();

const controlMovieRight = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    movieRightView.renderSpinner();
    // Render bookmarks local storage data
    bookMarkView.clearParentBookmark();
    bookMarkView._generateMarkup(state.bookmark);
    bookMarkView._showInitialMessage(state.bookmark);

    // load the data
    await loadMovieRight(id);

    const data = state.movieRight;
    // render the data
    movieRightView._generateMarkup(data);
  } catch (err) {
    console.error(`${err}`);
    movieRightView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    searchResultsView.renderSpinner();
    const query = searchResultsView.getQuery();
    if (!query) return;

    // load the searchresults
    await loadSearchResults(query);
    // render the results
    console.log(state.search.searchResults);
    searchResultsView.clear();
    searchResultsView._generateMarkUp(state.search.searchResults);
  } catch (err) {
    console.error(`${err}`);
    searchResultsView.renderError();
  }
};

const controlAddBookmark = function () {
  // Add or remove bookmark
  if (!state.movieRight.bookmarked) addBookmark(state.movieRight);
  else deleteBookmark(state.movieRight.id);

  // movieRightView.update(state.movieRight);
  movieRightView._generateMarkup(state.movieRight);
  // render on UI
  bookMarkView.clearParentBookmark();
  bookMarkView._generateMarkup(state.bookmark);
  // For showing the initial message of bookmark if there is no bookmarks
  bookMarkView._showInitialMessage(state.bookmark);
  console.log(state);
  console.log(state.bookmark);
};

const int = function () {
  movieRightView.addHandler(controlMovieRight);
  movieRightView.addHandlerAddBookmark(controlAddBookmark);
  movieRightView.addHandlerClickOnHeart();
  searchResultsView.addHandlerClick(controlSearchResults);
  searchResultsView.addHandlerClickOnIcon(controlSearchResults);
};
int();
