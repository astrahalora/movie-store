import { NavLink, Outlet } from "react-router-dom";
import cinemagic from './img/cinemagic.png'

export default function RootLayout() {

  return (
    <div className="root-layout">
        <header>
            <nav>
                <img src={cinemagic} alt="Logo"/>
                <NavLink to="/">Movies</NavLink>
                <NavLink to="/favorites">Favorite Movies</NavLink>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}
