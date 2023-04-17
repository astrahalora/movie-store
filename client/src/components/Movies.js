import { useState, useEffect, useRef } from "react";
import Movie from "./Movie";
import MovieDetails from "./MovieDetails";

export default function Movies({ movies }) {
  let [moviesToDisplay, setMoviesToDisplay] = useState(movies);
  let [copyMovies, setCopyMovies] = useState(movies);
  const [searchPhraze, setSearchPhraze] = useState("");
  const [renderOne, setRenderOne] = useState(null);
  const [favorites, setFavorites] = useState(null);
  const [cart, setCart] = useState(null);
  const [favoriteToSave, setFavoriteToSave] = useState([]);
  const [itemToSave, setItemToSave] = useState([]);
  const genres = [...new Set(movies.map((movie) => movie.Genre).join(",").replace(/\s/g,'').split(","))];
  const btnRef = useRef();

  const getFavorites = async (abort) => {
    try {
      const response = await fetch("http://localhost:5000/favorites", {signal: abort.signal});
      const data = await response.json();
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
  }, [favoriteToSave]);

  const getCart = async (abort) => {
    try {
      const response = await fetch("http://localhost:5000/cart", {signal: abort.signal});
      const data = await response.json();
      setCart(data);
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
  getCart(abortCont);
  return () => abortCont.abort();
}, [itemToSave]);

const zaaz = "Sorted Z-A | Sort A-Z";
const azza = "Sorted A-Z | Sort Z-A";
const sbt = "Sort by Title";

const sortingFunction = (array, reverse = false) =>
[...array].sort((a, b) =>
    reverse
        ? b.Title.localeCompare(a.Title)
        : a.Title.localeCompare(b.Title)
);

const sorter = (e) => {
  if (e.target.innerText === sbt || e.target.innerText === zaaz) {
      setMoviesToDisplay((previous) => sortingFunction(previous));
      e.target.innerText = azza;
  } else if (e.target.innerText === azza) {
      setMoviesToDisplay((previous) => sortingFunction(previous, true));
      e.target.innerText = zaaz;
  }
};

const search = (e) => {
  moviesToDisplay = copyMovies;
  const filterByPhraze = moviesToDisplay.filter(
    (movie) => movie.Title.toLowerCase().includes(e.target.value.toLowerCase())
  );
  setMoviesToDisplay(filterByPhraze);
  setSearchPhraze(e.target.value);
  btnRef.current.innerText = sbt;
};

const filterByGenre = (e) => {
  const filteredByGenre = movies.filter(movie =>movie.Genre.includes(e.target.value))
  setMoviesToDisplay(filteredByGenre);
  setCopyMovies(filteredByGenre);
  btnRef.current.innerText = sbt;
}

const isFavorite = (movie) => {
  if (favorites.length) {
      const has = (element) => element.Title === movie.Title;
      return favorites.some(has) ? "-" : "+";
  }
  return "+";
};

const addOrRem = (item) =>
  isFavorite(item) === "+"
    ? addToFavorites(item)
    : deleteFromFavorites(item);

const isInCart = (movie) => {
  if(cart.length) {
    const has = (element) => element.Title === movie.Title;
    return cart.some(has) ? "Item In Cart" : "Add to Cart" 
  }
  return "Add to Cart";
}

const addToCart = async (movie) => {
  const request = await fetch("http://localhost:5000/cart",{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({...movie})
  })
  const response = await request.json();
  console.log(response);
  setItemToSave(previous => [...previous, movie]);
}

const addToFavorites = async (movie) => {
  const request = await fetch("http://localhost:5000/favorites", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ...movie }),
  });
  const response = await request.json();
  console.log(response);
  setFavoriteToSave((previous) => [...previous, movie]);
};

const deleteFromCart = async(movie) => {
  const movieToDelete = JSON.parse(JSON.stringify(movie));
  const request = await fetch("http://localhost:5000/cart", {
    method: "DELETE",
    headers: {
      "Content-type":"application/json"
    },
    body: JSON.stringify({title: movieToDelete.Title})
  })
  const response = await request.json();
  console.log(response);
  setItemToSave(previous => [...previous, movie]);
}

const updateQuanitity = async (movie, e) => {
  const currentMovie = cart.find(item => item.Title === movie.Title);

  let movieCopy;
  if (e.target.innerText === "+"){
    movieCopy = {Title: movie.Title, Quantity: currentMovie.Quantity + 1}
  } else {
    movieCopy = {Title: movie.Title, Quantity: currentMovie.Quantity - 1}
  }

  const request = await fetch("http://localhost:5000/cart",{
    method:"PATCH",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify(movieCopy)
  })
  const response = await request.json();
  console.log(response);
  setItemToSave(previous => [...previous, movie]);
}


const deleteFromFavorites = async (movie) => {
  const request = await fetch("http://localhost:5000/favorites", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title: movie.Title }),
  });
  const response = await request.json();
  console.log(response);
  setFavoriteToSave((previous) => [...previous, movie]);
};

return (
  <>
  {favorites && renderOne ? (
    <MovieDetails
     movie={renderOne}
     onClick={() => setRenderOne(null)}
     addOrRemove={() => addOrRem(renderOne)}
     checkFavorite={isFavorite(renderOne)}
     addToCart={() => addToCart(renderOne)}
     deleteCart={() => deleteFromCart(renderOne)}
     quantity={cart}
     checkCart={isInCart(renderOne)}
     plusQuantity={(e) => updateQuanitity(renderOne, e)}
     minusQuantity={(e) => updateQuanitity(renderOne, e)}
    />
  ) : (
     <div className="movies">
      <div className="sort-btns">
        <select onChange={filterByGenre}>
          <option disabled selected>Genres</option>
          {genres && genres.map((genre, i) => <option key={i}>{genre}</option>)}
        </select>
        <button className="sort" onClick={sorter} ref={btnRef}>
          {sbt}
        </button>
        <input
          type="text"
          placeholder="-- Search Movie --"
          value={searchPhraze}
          onChange={search}
        />
      </div>
      <div className="all-movies">
        {favorites && moviesToDisplay && cart &&
          moviesToDisplay.map((movie, i) =>
          <Movie
           movie={movie}
           key={i}
           onClick={() => setRenderOne(movie)}
           addOrRemove={() => addOrRem(movie)}
           checkFavorite={isFavorite(movie)}
           addToCart={() => addToCart(movie)}
           deleteCart={() => deleteFromCart(movie)}
           quantity={cart}
           checkCart={isInCart(movie)}
           plusQuantity={(e) => updateQuanitity(movie, e)}
           minusQuantity={(e) => updateQuanitity(movie, e)}
          />
        )}
      </div>
   </div>
  ) }
  </>
);
}

