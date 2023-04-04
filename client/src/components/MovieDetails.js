export default function MovieDetails({movie, onClick}) {
  return (
    <div className="one-movie">
      <div className="details-1">
        <div class="item-1">
          <img src={movie.Poster} alt={movie.Title}/>
        </div>
        <div className="item-2">
          <h2>{movie.Title}</h2>
          <p><b>Release Date:</b> {movie.Released}</p>
          <p><b>Runtime:</b> {movie.Runtime}</p>
          <p><b>Genres:</b> {movie.Genre}</p>
          <p><b>Directors:</b> {movie.Director}</p>
          <p><b>Writers:</b> {movie.Writer}</p>
          <p><b>Actors:</b> {movie.Actors}</p>
          <p><b>Plot:</b> {movie.Plot}</p>
          <p><b>IMDb Rating:</b> {movie.imdbRating}</p>
          <p><b>Awards:</b> {movie.Awards}</p>
        </div>
      </div>
      <div className="details-2">
        <button className="back-btn" onClick={onClick}>Back</button>
      </div>
    </div>
  )
}
  