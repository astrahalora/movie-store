export default function Movie({movie}) {
  return (
    <div className='movie'>
      <img src={movie.Poster} alt={movie.Title}/>
      <h3>{movie.Title}</h3>
      <p>$14.99</p>
      <button className='add-remove-favorites'>+</button>
      <button className='add-remove-cart'>Add to Cart</button>
    </div>
  )
}
