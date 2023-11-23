export default function MovieDetails({
  movie,
  addOrRemove,
  checkFavorite,
  addToCart,
  deleteCart,
  quantity,
  checkCart,
  minusQuantity,
  plusQuantity
}) {

const getUrlId = (url) => {
  return url.split("/")[url.split("/").length-1]
}

  return (
    <div className="one-movie">
      <div className="details-0">
        <iframe src={`https://www.youtube.com/embed/${getUrlId(movie.Url)}`} 
            title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; 
            encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
        </iframe>
      </div>
      <div className="details-1">
        <div className="item-1">
          <img src={movie.Poster} alt={movie.Title}/>
        </div>
        <div className="item-2">
          <div className="main-details">
            <h2>{movie.Title}</h2>
            <p><strong>Release Date:</strong> {movie.Released}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>Genres:</strong> {movie.Genre}</p>
            <p><strong>Directors:</strong> {movie.Director}</p>
            <p><strong>Writers:</strong> {movie.Writer}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
            <p><strong>Awards:</strong> {movie.Awards}</p>
          </div>
          <div className="add-remove">
            <button className="add-remove-favs" onClick={addOrRemove}>{checkFavorite}</button>

        {checkCart === "Item In Cart" ? (
          <div className="cart-btns">
            <button onClick={quantity.some(item => item.Title === movie.Title ? item.Quantity - 1 : '') 
            ? minusQuantity :  () => deleteCart()}
            className="first-cart-btn" 
            style={{borderRadius:'5px', padding: '0.5em 1em'}}>-</button>
            <p>{quantity.map(item => item.Title === movie.Title ? item.Quantity : '')}</p>
            <button onClick={plusQuantity}>+</button>
          </div>
        ) : (
          <button className="add-remove-cart" onClick={addToCart}>
            {checkCart}
          </button>
        )}
          </div>
        </div>
      </div>
    </div>
  )
}
  
  