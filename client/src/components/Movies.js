import { useState } from 'react';
import Movie from './Movie';

export default function Movies({movies}) {

  const [moviesToDisplay, setMoviesToDisplay] = useState(movies);
  
  const sorter = (e) => {
    if (e.target.innerText === "Sort by Title" || e.target.innerText === "Sorted Z-A | Sort A-Z") {
      setMoviesToDisplay((previous) => [...previous].sort((a, b) => a.Title.localeCompare(b.Title)))
      e.target.innerText = "Sorted A-Z | Sort Z-A";
    } else if (e.target.innerText === "Sorted A-Z | Sort Z-A") {
        setMoviesToDisplay((previous) => [...previous].sort((a, b) => b.Title.localeCompare(a.Title)))
        e.target.innerText = "Sorted Z-A | Sort A-Z";
    } 
  }

  return (
    <div className='movies'>
      <div className='sort-btns'>
        <button className='sort' onClick={sorter}>Sort by Title</button>
      </div>
      <div className='all-movies'>
        {moviesToDisplay && moviesToDisplay.map((movie, i) => (
            <Movie 
            movie={movie} 
            key={i} 
            />
        ))}
      </div>
    </div>
  )
}
