import { getJSON } from "./helper.js";

export const state = {
  movieRight: {},
  search: {
    query: "",
    searchResults: [],
  },
  bookmark: [],
  suggestions: [],
};

export const loadMovieRight = async function (id) {
  try {
    const data = await getJSON(
      `https://superheroapi.com/api.php/313991500354337/${id}`
    );

    console.log(data);

    if (data.response === "failed") throw new Error(`${data.error}`);

    state.movieRight = {
      id: data.id,
      name: data.name,
      image: data.image,
      intelligence: data.powerstats.intelligence,
      combat: data.powerstats.combat,
      durability: data.powerstats.durability,
      power: data.powerstats.power,
      speed: data.powerstats.speed,
      strength: data.powerstats.strength,
      occupation: data.work.occupation,
      base: data.work.base,
      group: data["connections"]["group-affiliation"],
      relatives: data.connections.relatives,
      gender: data.appearance.gender,
      race: data.appearance.race,
      height: data.appearance.height,
      weight: data.appearance.weight,
      eyeColor: data["appearance"]["eye-color"],
      fullname: data["biography"]["full-name"],
      egos: data["biography"]["alter-egos"],
      placeOfBirth: data["biography"]["place-of-birth"],
      aliases: data.biography.aliases,
      publisher: data.biography.publisher,
      hairColor: data["appearance"]["hair-color"],
    };

    if (state.bookmark.some((bookmark) => bookmark.id === id))
      state.movieRight.bookmarked = true;
    else state.movieRight.bookmarked = false;
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(
      `https://superheroapi.com/api.php/313991500354337/search/${query}`
    );
    console.log(data);

    // console.log(matches);

    if (data.response === "error") throw new Error(`${data.error}`);
    state.search.searchResults = data.results.map((char) => {
      return {
        id: char.id,
        name: char.name,
        image: char.image,
        intelligence: char.powerstats.intelligence,
        combat: char.powerstats.combat,
        durability: char.powerstats.durability,
        power: char.powerstats.power,
        speed: char.powerstats.speed,
        strength: char.powerstats.strength,
        occupation: char.work.occupation,
        base: char.work.base,
        group: char.connections.groupAffiliation,
        relatives: char.connections.relatives,
        gender: char.appearance.gender,
        race: char.appearance.race,
        height: char.appearance.height,
        weight: char.appearance.weight,
        eyeColor: char.appearance.eyeColor,
        fullname: char.biography.fullName,
        egos: char.biography.alterEgos,
        aliases: char.biography.aliases,
        // birthPlace: char.biography.obj["place-of-birth"],
        publisher: char.biography.publisher,
      };
    });
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const loadMovieSuggestions = async function (query) {
  try {
    const data = await getJSON(
      `https://superheroapi.com/api.php/313991500354337/search/${query}`
    );

    console.log(data);
    console.log(data.results);

    if (data.response === "error") throw new Error(`${data.err}`);

    state.suggestions = data.results.filter((data) => {
      const test = data.name.toLowerCase().startsWith(query);
      return test;
    });
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

console.log(state);

const persistBookmark = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmark));
};

export const addBookmark = function (movie) {
  // Add bookmark
  state.bookmark.push(movie);
  //   Mark current recipe as bookmarked
  if (movie.id === state.movieRight.id) state.movieRight.bookmarked = true;
  persistBookmark();
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmark.findIndex((el) => el.id === id);
  console.log(index);
  state.bookmark.splice(index, 1);

  // Mark current movieRight as NOT bookmark
  if (id === state.movieRight.id) state.movieRight.bookmarked = false;
  persistBookmark();
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmark = JSON.parse(storage);
};
init();
