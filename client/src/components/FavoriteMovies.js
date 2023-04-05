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

    return (
      <>
      {loading? (
        <LoadingPage />
      ) : (
        <div className='favorites'>
        {favorites && favorites.map(favorite=> (
          <div className='favorite'>
            <img src={favorite.Poster} alt={favorite.Title}/>
            <div>
              <h3>{favorite.Title}</h3>
              <p><b>Release Date:</b> {favorite.Released}</p>
              <p><b>IMDb Rating:</b> {favorite.imdbRating}</p>
            </div>
          </div>
        ))}
      </div>
      )}
      </>
    )
  }
