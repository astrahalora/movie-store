import { NavLink, Outlet } from "react-router-dom";
import cinemagic from './img/cinemagic.png'

export default function RootLayout() {

  return (
    <div className="root-layout">
        <header>
            <nav>
                <img src={cinemagic} alt="Logo"/>
                <div>
                  <NavLink to="/" id="home">Movies</NavLink>
                  <NavLink to="/favorites">Favorite Movies</NavLink>
                </div>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}
