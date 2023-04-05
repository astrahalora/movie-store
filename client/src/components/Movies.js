import { useState, useEffect } from "react";
import Movie from "./Movie";
import MovieDetails from "./MovieDetails";

export default function Movies({ movies }) {
  let [moviesToDisplay, setMoviesToDisplay] = useState(movies);
  const [searchPhraze, setSearchPhraze] = useState("");
  const [renderOne, setRenderOne] = useState(null);
  let [copyMovies, setCopyMovies] = useState(movies);
  const [favorites, setFavorites] = useState(null);
  const [favoritesToSave, setFavoritesToSave] = useState([]);
  const genres = [...new Set(movies.map((movie) => movie.Genre).join(",").replace(/\s/g,'').split(","))];

  const getFavorites = async (abort) => {
    try {
      const response = await fetch("http://localhost:5000/favorites", {signal: abort.signal});
      const data = await response.json();
      console.log(data);
      setFavorites(data);
    } catch (error) {
      if(error.name === "AbortError") {
        console.log('Fetch aborted');
      } else {
      console.log(error.message);
      }
    };
  };

  useEffect(() => {
  const abortCont = new AbortController();
  getFavorites(abortCont);
  return () => abortCont.abort();
}, [favoritesToSave]);

const sorter = (e) => {
  if (
    e.target.innerText === "Sort by Title" ||
    e.target.innerText === "Sorted Z-A | Sort A-Z"
  ) {
    setMoviesToDisplay((previous) =>
      [...previous].sort((a, b) => a.Title.localeCompare(b.Title))
    );
    e.target.innerText = "Sorted A-Z | Sort Z-A";
  } else if (e.target.innerText === "Sorted A-Z | Sort Z-A") {
    setMoviesToDisplay((previous) =>
      [...previous].sort((a, b) => b.Title.localeCompare(a.Title))
    );
    e.target.innerText = "Sorted Z-A | Sort A-Z";
  } 
};

const search = (e) => {
  moviesToDisplay = copyMovies;
  const filterByPhraze = moviesToDisplay.filter(
    (movie) => movie.Title.toLowerCase().includes(e.target.value.toLowerCase())
  );
  setMoviesToDisplay(filterByPhraze);
  setSearchPhraze(e.target.value);
  document.querySelector(".sort").innerText = "Sort by Title";
};

const filterByGenre = (e) => {
  const filteredByGenre = movies.filter(movie =>movie.Genre.includes(e.target.value))
  setMoviesToDisplay(filteredByGenre);
  setCopyMovies(filteredByGenre);
  document.querySelector(".sort").innerText = "Sort by Title";
}

const isFavorite = (movie) => {
  if (favorites.length) {
    const exists = (element) => element.Title === movie.Title;
    return favorites.some(exists) ? "-" : "+" 
  }
  return "+"
}

const addToFavorites = async (movie) => {
  const movieCopy = JSON.parse(JSON.stringify(movie)); //deep copy
  const response = await fetch("http://localhost:5000/favorites",{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify(movieCopy)
  })
  .then(res => res.text())
  .then(res => console.log(res))

  setFavoritesToSave(previous => [...previous, movie]);
}

const deleteFromFavorites = async(movie) => {
  const movieToDelete = JSON.parse(JSON.stringify(movie));
  const response = await fetch("http://localhost:5000/favorites", {
    method: "DELETE",
    headers: {
      "Content-type":"application/json"
    },
    body: JSON.stringify({title: movieToDelete.Title})
  })
  .then(res => res.text())
  .then(res => console.log(res))

  setFavoritesToSave(previous => [...previous, movie]);
}
 
return (
  <>
  {favorites && renderOne ? (
    <MovieDetails
     movie={renderOne}
     onClick={() => setRenderOne(null)}
     addOrRemove={() => isFavorite(renderOne) === "+" ? addToFavorites(renderOne) : deleteFromFavorites(renderOne)}
     checkFavorite={isFavorite(renderOne)}
    />
  ) : (
     <div className="movies">
      <div className="sort-btns">
        <select onChange={filterByGenre}>
          <option disabled selected>Genres</option>
          {genres && genres.map((genre, i) => <option key={i}>{genre}</option>)}
        </select>
        <button className="sort" onClick={sorter}>
          Sort by Title
        </button>
        <input
          type="text"
          placeholder="--Search Movie--"
          value={searchPhraze}
          onChange={search}
        />
      </div>
      <div className="all-movies">
        {favorites && moviesToDisplay &&
          moviesToDisplay.map((movie, i) => 
          <Movie
           movie={movie}
           key={i}
           onClick={() => setRenderOne(movie)}
           addOrRemove={() => isFavorite(movie) === "+" ? addToFavorites(movie) : deleteFromFavorites(movie)}
           checkFavorite={isFavorite(movie)}
          />
        )}
      </div>
   </div>
  ) }
  </>
);
}
