import { useState } from 'react';

export default function Movies({movies}) {

  const [moviesToDisplay, setMoviesToDisplay] = useState(movies);  
  return (
    <div className='movies'>
        {moviesToDisplay && moviesToDisplay.map((movie, i) => (
            <div className='movie' key={i}>
                <img src={movie.Poster} alt={movie.Title}/>
                <h3>{movie.Title}</h3>
                <p>$14.99</p>
                <button className='add-remove-favorites'>+</button>
                <button className='add-remove-cart'>Add to Cart</button>
            </div>
        ))}
    </div>
  )
}
