import { useState } from "react";
import Movie from "./Movie";
import MovieDetails from "./MovieDetails";

export default function Movies({ movies }) {
  const [moviesToDisplay, setMoviesToDisplay] = useState(movies);
  const [searchPhraze, setSearchPhraze] = useState("");
  const [renderOne, setRenderOne] = useState(null);
  const genres = [...new Set(movies.map((movie) => movie.Genre).join(",").replace(/\s/g,'').split(","))];

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
    const filterByPhraze = movies.filter(
      (movie) => movie.Title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setMoviesToDisplay(filterByPhraze);
    setSearchPhraze(e.target.value);
    document.querySelector(".sort").innerText = "Sort by Title";

  };

  const filterByGenre = (e) => {
    const filtered = movies.filter(movie =>movie.Genre.includes(e.target.value))
    setMoviesToDisplay(filtered);
    document.querySelector(".sort").innerText = "Sort by Title";
  }
   
  return (
    <>
    {renderOne ? (
      <MovieDetails
       movie={renderOne}
       onClick={() => setRenderOne(null)}
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
          {moviesToDisplay &&
            moviesToDisplay.map((movie, i) => 
            <Movie
             movie={movie}
             key={i}
             onClick={() => setRenderOne(movie)}
            />
          )}
        </div>
     </div>
    ) }
    </>
  );
}
