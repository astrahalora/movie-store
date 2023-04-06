import { useState } from "react";

export default function Movie({
  movie,
  onClick,
  addOrRemove,
  checkFavorite,
  addToCart,
  deleteCart,
  quantity,
  checkCart,
  minusQuanitity,
  plusQuanitity
}) {

  return (
    <div className="movie">
      <img src={movie.Poster} alt={movie.Title} onClick={onClick} />
      <div>
        <h3>{movie.Title}</h3>
        <p>$14.99</p>
      </div>
      <div>
        <button className="add-remove-favorites" onClick={addOrRemove}>
          {checkFavorite}
        </button>
        {checkCart === "Item In Cart" ? (
          <div>
            <button onClick={quantity.some(item => item.Title === movie.Title ? item.Quantity - 1 : '') ? minusQuanitity :  () => {deleteCart()}}>-</button>
            <p>{quantity.map(item => item.Title === movie.Title ? item.Quantity : '')}</p>
            <button onClick={plusQuanitity}>+</button>
          </div>
        ) : (
          <button className="add-remove-cart" onClick={() => {addToCart()}}>
            {checkCart}
          </button>
        )}
      </div>
    </div>
  );
}
