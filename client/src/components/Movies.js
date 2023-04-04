import { useState } from 'react';
import Movie from './Movie';

export default function Movies({movies}) {

  const [moviesToDisplay, setMoviesToDisplay] = useState(movies); 
   
  return (
    <div className='movies'>
        {moviesToDisplay && moviesToDisplay.map((movie, i) => (
            <Movie 
            movie={movie} 
            key={i} 
            />
        ))}
    </div>
  )
}
