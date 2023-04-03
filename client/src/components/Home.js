import { useState, useEffect } from 'react';
import LoadingPage from './LoadingPage';
import Movies from './Movies';

export default function Home() {

  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMovies = async(abort) => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/api/movies", { signal: abort.signal} );
      const data = await response.json();
      setLoading(false);
      setMovies(data);
      console.log(data)
    } catch (error) {
      if(error.name === "AbortError") {
        console.log('Fetch aborted');
      } else {
      console.log(error.message);
      }
    };
  }

  useEffect(() => {
    const abortCont = new AbortController();
    getMovies(abortCont);
    return () => abortCont.abort();
  }, [])

  return (
    <>
    {loading? (
      <LoadingPage />
    ) : (
      <>
        {movies && <Movies movies={movies}/>}
      </>
    )}
    </>
  )
}
