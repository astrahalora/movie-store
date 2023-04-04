export default function MovieDetails({movie, onClick}) {
    return (
      <div className="movie">
        <img src={movie.Poster} alt={movie.Title}/>
        <h3>{movie.Title}</h3>
        <p><b>Release Date:</b> {movie.Released}</p>
        <p><b>Runtime:</b> {movie.Runtime}</p>
        <p><b>Genres:</b> {movie.Genre}</p>
        <p><b>Directors:</b> {movie.Director}</p>
        <p><b>Writers:</b> {movie.Writer}</p>
        <p><b>Actors:</b> {movie.Actors}</p>
        <p><b>Plot:</b> {movie.Plot}</p>
        <p><b>IMDb Rating:</b> {movie.imdbRating}</p>
        <p><b>Awards:</b> {movie.Awards}</p>
        <button className="back-btn" onClick={onClick}>Back</button>
      </div>
    )
  }
  