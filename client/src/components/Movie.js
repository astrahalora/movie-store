export default function Movie({movie, onClick, addOrRemove, checkFavorite}) {

  return (
    <div className='movie'>
        <img src={movie.Poster} alt={movie.Title} onClick={onClick}/>
      <div>
        <h3>{movie.Title}</h3>
        <p>$14.99</p>
      </div>
      <div>
        <button className='add-remove-favorites' 
        onClick={addOrRemove}>{checkFavorite}</button>
        <button className='add-remove-cart'>Add to Cart</button>
      </div>
    </div>
  )
}
