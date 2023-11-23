import { NavLink, Outlet, useNavigate } from "react-router-dom";
import cinemagic from './img/cinemagic.png'
import cart from './img/cart.png';

export default function RootLayout() {
  const navigate = useNavigate();

  const navigateToRoot = () => {
    navigate("/");
    window.location.reload();
  }

  return (
    <div className="root-layout">
        <header>
            <nav>
                <NavLink to="/">
                  <img src={cinemagic} alt="Logo" onClick={navigateToRoot}/>
                </NavLink>
                <div>
                  <NavLink to="/" id="home" onClick={navigateToRoot}>Movies</NavLink>
                  <NavLink to="/favorites">Favorite Movies</NavLink>
                  <NavLink to="/checkout">
                    <img src={cart} id="cart-img"alt="Cart"/>
                  </NavLink>
                </div>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}
