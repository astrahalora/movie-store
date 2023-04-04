import {useState, useEffect} from 'react';

export default function Movie({movie, onClick}) {
  const [favorites, setFavorites] = useState(null);
  const [favoritesToSave, setFavoritesToSave] = useState([]);

//   useEffect(() => {
//    const abortCont = new AbortController();
//    const getFavoriteMovies = async() => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/favorites", { signal: abortCont.signal} );
//       const data = await response.json();
//       console.log(data);
//       setFavorites(data);
//     } catch (error) {
//       if(error.name === "AbortError") {
//         console.log('Fetch aborted');
//       } else {
//       console.log(error.message);
//       }
//     };
//   }
//  // getFavoriteMovies();
//     return () => abortCont.abort();
//   }, [])

// useEffect(() => {
//   const abortCont = new AbortController();
//   const getFavorites = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/favorites", {signal: abortCont.signal});
//       const data = await response.json();
//       console.log(data);
//       setFavorites(data);
//     } catch (error) {
//       if(error.name === "AbortError") {
//         console.log('Fetch aborted');
//       } else {
//       console.log(error.message);
//       }
//     };
//   };
//   getFavorites();
//   return () => abortCont.abort();
// }, [favoritesToSave]);

  const addToFavorites = async () => {
    const movieCopy = JSON.parse(JSON.stringify(movie));//deep copy
    const response = await fetch("http://localhost:5000/favorites",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(movieCopy)
    })
    .then(res => res.text())
    .then(res => console.log(res))
  }

  return (
    <div className='movie'>
        <img src={movie.Poster} alt={movie.Title} onClick={onClick}/>
      <div>
        <h3>{movie.Title}</h3>
        <p>$14.99</p>
      </div>
      <div>
        <button className='add-remove-favorites' onClick={addToFavorites}>+</button>
        <button className='add-remove-cart'>Add to Cart</button>
      </div>
    </div>
  )
}
