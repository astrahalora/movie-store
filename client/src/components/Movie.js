export default function Movie({
  movie,
  onClick,
  addOrRemove,
  checkFavorite,
  addToCart,
  deleteCart,
  quantity,
  checkCart,
  minusQuantity,
  plusQuantity
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
          <div className="cart-btns">
            <button onClick={quantity.some(item => item.Title === movie.Title ? item.Quantity - 1 : '') 
            ? minusQuantity : () => deleteCart()}
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
  );
}
