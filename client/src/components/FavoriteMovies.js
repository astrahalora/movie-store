import {useEffect, useState} from 'react';
import LoadingPage from './LoadingPage';

export default function FavoriteMovies() {

  const [favorites, setFavorites] = useState(null);
  const [loading, setLoading] = useState(false);

  const getFavorites = async (abort) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/favorites", {signal: abort.signal});
      const data = await response.json();
      setLoading(false);
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
}, []);

  const sortByLongestRuntime = () => {
    setFavorites(previous => [...previous].sort((a,b) => parseInt(b.Runtime) - parseInt(a.Runtime)))
  }

  const sortByShortestRuntime = () => {
    setFavorites(previous => [...previous].sort((a,b) => parseInt(a.Runtime) - parseInt(b.Runtime)))
  }

  const sortByRating = () => {
    setFavorites(previous => [...previous].sort((a,b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating)))
  }

    return (
      <>
      {loading? (
        <LoadingPage />
      ) : (
        <div className='wraper'>
        <div className='fav-btns'>
          <button onClick={sortByLongestRuntime}>Longest Runtime</button>
          <button onClick={sortByShortestRuntime}>Shortest Runtime</button>
          <button onClick={sortByRating}>Best Rated</button>
        </div>
        <div className='favorites'>
        {favorites && favorites.map((favorite, i)=> (
          <div className='favorite' key={i}>
            <img src={favorite.Poster} alt={favorite.Title}/>
            <div>
              <h3>{favorite.Title}</h3>
              <p><b>Release Date:</b> {favorite.Released}</p>
              <p><b>IMDb Rating:</b> {favorite.imdbRating}</p>
              <p><b>Runtime:</b> {favorite.Runtime}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
      )}
      </>
    )
  }
